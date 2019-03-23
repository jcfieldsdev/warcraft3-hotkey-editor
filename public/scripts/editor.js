"use strict";

/*
 * constants
 */

// dimensions of command card
const ROWS=3;
const COLS=4;

// initial unit on load
const DEFAULT_UNIT="hpea";

// file names and locations
const DEFAULT_HOTKEY_FILE="default.txt";
const DEFAULT_SAVE_NAME="CustomKeys.txt";
const HOTKEY_DIR="hotkeys/";
const DIR_LIST="scripts/list.json";
const HELP_PAGE="help.html";

// pattern for splitting multi-line tips
const DELIMITER=/,(?=(?:[^"]|"[^"]*")*$)/;

// objects
const store=new Storage("wc3hk");
const files=new Files("files");
const overlays={
	load: new Overlay("load"),
	save: new Overlay("save")
};
const commands=new Commands();
const editor=new Editor();

/*
 * initialization
 */

window.addEventListener("load", function() {
	// loads default commands and calls init() once retrieved
	let text=files.load(DEFAULT_HOTKEY_FILE, init);
});

function init(text) {
	commands.parse(text);

	let saved=store.load();

	if (saved!=null) {
		commands.load(saved);
	}

	editor.load();

	// populates list of sample files on load overlay
	files.getList();

	// sets event listeners
	document.getElementById("open").addEventListener("click", function() {
		let file=overlays.load.getText();

		if (file!="") {
			commands.parse(file);
			editor.open();
			overlays.load.hide();
		}
	});
	document.getElementById("reset").addEventListener("click", function() {
		commands.reset();
		store.reset();
		editor.open();

		document.getElementById("files").selectedIndex=0;
		overlays.load.setText("");
		overlays.load.hide();
	});
	document.getElementById("copy").addEventListener("click", function() {
		overlays.save.select();
		document.execCommand("copy");
	});
	document.getElementById("save").addEventListener("click", function() {
		let contents=new Blob([overlays.save.getText()], {type: "text/plain"});

		let a=document.getElementById("download");
		a.download=DEFAULT_SAVE_NAME;
		a.href=window.URL.createObjectURL(contents);
		a.click();
	});
	document.getElementById("close_load").addEventListener("click", function() {
		overlays.load.hide();
	});
	document.getElementById("close_save").addEventListener("click", function() {
		overlays.save.hide();
	});
	document.getElementById("help").addEventListener("click", function() {
		window.location=HELP_PAGE;
	});
	document.getElementById("btn_load").addEventListener("click", function() {
		overlays.load.show();
	});
	document.getElementById("btn_save").addEventListener("click", function() {
		store.save(commands.list);

		overlays.save.setText(commands.convert());
		overlays.save.show();
	});
	disableAutocomplete(document.getElementById("text_load"));
	disableAutocomplete(document.getElementById("text_save"));

	window.addEventListener("beforeunload", function() {
		// saves on close
		store.save(commands.list);
	});
	window.addEventListener("hashchange", function() {
		// changes on link or browser back/forward
		editor.load();
	});
	window.addEventListener("keyup", function(event) {
		if (event.keyCode==27) { // Esc
			Object.values(overlays).forEach(function(overlay) {
				overlay.hide();
			});
		}
	});

	let query=document.getElementById("query");

	query.addEventListener("input", function() {
		editor.findUnitsNamed(this.value);
	});
	query.addEventListener("keydown", function(event) {
		if (event.keyCode==13) { // return/enter
			editor.openResult();
		}

		if (event.keyCode==27) { // Esc
			editor.clearSearch(true);
		}

		if (event.keyCode==38) { // up arrow
			editor.highlightResult(true);
		}

		if (event.keyCode==40) { // down arrow
			editor.highlightResult(false);
		}
	});
	disableAutocomplete(query);

	let filters=document.getElementsByClassName("filter");

	for (let i=0; i<filters.length; i++) {
		filters[i].addEventListener("click", function() {
			editor.filter(this.id);
		});
	}

	let tips=document.getElementsByClassName("tip");

	for (let i=0; i<tips.length; i++) {
		tips[i].addEventListener("focus", function() {
			editor.focusTip(this.id);
		});
		tips[i].addEventListener("blur", function() {
			editor.editTip(this.id);
		});
		tips[i].addEventListener("drop", function(event) {
			// prevents dropping HTML-formatted objects (namely images)
			// onto tooltip text
			if (event.dataTransfer.getData("text/html")!="") {
				event.preventDefault();
			}
		});
		tips[i].setAttribute("contenteditable", "true");
		disableAutocomplete(tips[i]);
	}

	function disableAutocomplete(input) {
		input.setAttribute("autocomplete", "off");
		input.setAttribute("autocorrect", "off");
		input.setAttribute("autocapitalize", "off");
		input.setAttribute("spellcheck", "false");
	}
}

/*
 * Editor prototype
 */

function Editor() {
	this.unit="";
	this.command="";
	this.name="";
	this.race="";
	this.card=Array(ROWS).fill().map(function() {
		return Array(COLS).fill();
	});
	this.selected=-1; // selected search result
};

Editor.prototype.load=function() {
	let unit="";

	// gets current unit from URL if specified
	if (window.location.hash!="") {
		unit=window.location.hash.replace("#", ""); // chops initial #
	} else {
		unit=DEFAULT_UNIT;
	}

	this.setUnit(unit);
};

Editor.prototype.open=function() {
	this.clearButtons();
	this.clearFields();
	this.unitEditor();
};

Editor.prototype.setUnit=function(unit) {
	this.unit=unit;

	if (units[this.unit]==undefined) {
		console.error("Undefined: "+this.unit+" (unit)");
	} else {
		this.race=units[this.unit].race;
		this.filter(this.race);
		console.log("Unit: "+units[this.unit].name+" ("+this.unit+")");
	}

	this.clearSearch(true);
	this.open();
};

Editor.prototype.setCommand=function(id, name) {
	this.command=id;
	this.name=name;

	console.log("Command: "+name+" ("+id+")");

	this.commandEditor();
};

Editor.prototype.unitEditor=function() {
	let unit=units[this.unit];

	if (unit==undefined) {
		return;
	}

	document.getElementById("editor").className=this.race;

	let h2=document.createElement("h2");
	h2.id="unit";
	h2.innerHTML=unit.name;
	h2.insertBefore(this.createButton(this.unit, unit.name), h2.firstChild);
	document.getElementById("unit").replaceWith(h2);

	if (unit.suffix!=undefined) {
		h2.innerHTML+=" ("+unit.suffix+")"
	}

	let h3=document.getElementById("command");
	h3.innerHTML="";
	h3.classList.add("hidden");

	let buttons=this.getCommands(unit);

	Object.entries(buttons).forEach(function([id, title]) {
		// special exception for build buttons, whose hotkeys and tooltips are
		// under cmdbuild* but whose buttonpos are under a?bu
		let idpos=this.convertBuildCommand(id);

		if (!commands.exists(idpos)) {
			console.error("Undefined: "+idpos+" (command)");
			return;
		}

		let conflict=false, x=0, y=0;
		let buttonpos=commands.get(idpos, "Buttonpos");

		if (buttonpos) {
			let pos=buttonpos.split(",");
			[x, y]=this.getPosition(pos[0], pos[1]);
			conflict=pos[0]!=x||pos[1]!=y;
		} else {
			console.error("Undefined: "+idpos+" (buttonpos)");

			[x, y]=this.getPosition(0, 2); // tries to place in bottom row
			conflict=true;
		}

		if (x==null&&y==null) {
			// could not find position for button;
			// theoretically should never happen since it would require a unit
			// have more commands than positions available (i.e., more than 12)
			return;
		}

		this.card[y][x]=id;

		// re-select command if selected on previously viewed unit
		if (this.command==id) {
			this.setCommand(id, title);
		}

		let button=this.createButton(id, title);
		button.id="Y"+y+"X"+x;
		button.classList.toggle("conflict", conflict);

		let pos=COLS*y+x;
		document.getElementById("card").children[pos].replaceWith(button);
	}, this);

	let divs=document.getElementById("card").getElementsByTagName("div");

	// adds listeners for drag-and-drop events
	for (let i=0; i<divs.length; i++) {
		divs[i].addEventListener("dragover", function(event) {
			event.preventDefault();
		});
		divs[i].addEventListener("dragenter", function(event) {
			event.preventDefault();
			this.classList.add("drag");
		});
		divs[i].addEventListener("dragleave", function() {
			this.classList.remove("drag");
		});
		divs[i].addEventListener("drop", function(event) {
			event.preventDefault();
			this.drop(event.dataTransfer.getData("text"), event.target.id);
			document.getElementById("card").classList.remove("grid");
		}.bind(this));
	}

	this.setVisibleHotkeys();
	this.checkAllConflicts();
};

Editor.prototype.getCommands=function(unit) {
	let buttons={};

	// adds common commands
	if (unit.type==UNIT||unit.type==SUMMON) {
		Object.assign(buttons, common.basic);
	} else if (unit.type==HERO) {
		Object.assign(buttons, common.basic, common.hero);
	} else if (unit.type==NOATTACK) {
		Object.assign(buttons, common.noattack);
	} else if (unit.type==TOWER) {
		Object.assign(buttons, common.tower);
	}

	// adds unit-specific commands
	if (unit.commands!=undefined) {
		Object.assign(buttons, unit.commands);
	}

	return buttons;
};

Editor.prototype.convertBuildCommand=function(id) {
	if (id=="cmdbuildhuman") {
		return "ahbu";
	}

	if (id=="cmdbuildorc") {
		return "aobu";
	}

	if (id=="cmdbuildnightelf") {
		return "aebu";
	}

	if (id=="cmdbuildundead") {
		return "aubu";
	}

	if (id=="cmdbuildnaga") {
		return "agbu";
	}

	return id;
};

Editor.prototype.createButton=function(id, name) {
	let div=document.createElement("div");
	let img=document.createElement("img");
	img.id="img_"+id;
	img.setAttribute("src", "icons/"+id+".png");
	img.setAttribute("alt", "["+name+"]");
	img.setAttribute("title", name);
	img.addEventListener("click", function() {
		this.setCommand(id, name);
	}.bind(this));
	div.appendChild(img);

	// distinguishes between buttons (in command card)
	// and unit icons (in heading)
	if (this.unit!=id) {
		let span=document.createElement("span");
		span.id="span_"+id;
		div.appendChild(span);

		img.setAttribute("draggable", "true");
		img.addEventListener("dragstart", function(event) {
			event.dataTransfer.setData("text/plain", event.target.id);
			document.getElementById("card").classList.add("grid");
		});
	}

	return div;
};

Editor.prototype.clear=function(element, removeListeners=true) {
	if (element==null) {
		return;
	}

	while (element.lastChild) { // removes all children
		element.removeChild(element.lastChild);
	}

	if (removeListeners) {
		// clones element to remove all event listeners
		element.parentNode.replaceChild(element.cloneNode(true), element);
	}
};

Editor.prototype.clearButtons=function() {
	let children=document.getElementById("card").children;

	for (let i=0; i<children.length; i++) {
		this.clear(children[i]);
	}

	for (let y=0; y<ROWS; y++) {
		for (let x=0; x<COLS; x++) {
			this.card[y][x]="";
		}
	}
};

Editor.prototype.clearFields=function() {
	let children=document.getElementById("fields").children;

	for (let i=0; i<children.length; i++) {
		// removes event listeners for hotkey inputs (which are removed and
		// recreated) but not tips (which are persistent)
		if (children[i].classList.contains("tip")) {
			this.clear(children[i], false);
		} else {
			this.clear(children[i], true);
		}

		// also hides element so it does not remain editable
		children[i].classList.add("hidden");
	}

	this.clear(document.getElementById("default"));
};

Editor.prototype.clearSearch=function(clearQuery=false) {
	if (clearQuery) {
		document.getElementById("query").value="";
	}

	this.selected=-1;
	this.clear(document.getElementById("results"));
	document.getElementById("results").classList.add("hidden");
};

Editor.prototype.getPosition=function(x, y) {
	let dir=true;

	x=parseInt(x);
	y=parseInt(y);

	do {
		if (this.card[y][x]=="") {
			return [x, y]; // available position found
		}
	} while (iterate());

	return [null, null]; // no position found

	function iterate() {
		if (dir) {
			dir=iterateForwards();
			return true;
		} else {
			// after iterating through all positions forwards unsuccessfully,
			// try to find position by iterating through all positions backwards
			return iterateBackwards();
		}
	}

	function iterateForwards() {
		x++;

		if (x>=COLS) { // wrap to next row
			y++;
			x=0;
		}

		if (y>=ROWS) { // overflow
			y=ROWS-1;
			x=COLS-1;

			return false;
		}

		return true;
	}

	function iterateBackwards() {
		x--;

		if (x<0) { // wrap to previous row
			y--;
			x=COLS-1;
		}

		if (y<0) { // underflow
			x=0;
			y=0;

			return false;
		}

		return true;
	}
};

Editor.prototype.getConflicts=function(id) {
	let hotkeys={}, researchhotkeys={};
	let unit=units[id];

	if (unit==undefined) {
		return;
	}

	let buttons=this.getCommands(unit);

	Object.keys(buttons).forEach(function(id) {
		if (!commands.exists(id)) {
			return;
		}

		let hotkey=commands.get(id, "Hotkey");
		let unhotkey=commands.get(id, "Unhotkey");
		let researchhotkey=commands.get(id, "Researchhotkey");

		// tracks research hotkeys separately
		recordHotkey(id, hotkey, hotkeys);
		recordHotkey(id, researchhotkey, researchhotkeys);

		// counts unhotkey as hotkey if different (for two-state commands)
		if (hotkey!=unhotkey) {
			recordHotkey(id, unhotkey, hotkeys);
		}
	});

	return {
		hotkeys: hotkeys,
		researchhotkeys: researchhotkeys
	};

	function recordHotkey(id, hotkey, keys) {
		let hotkeys=hotkey.split(",");

		hotkeys.forEach(function(hotkey) {
			if (hotkey=="") {
				return;
			}

			if (keys[hotkey]==undefined) {
				// using set to prevent duplicates so a hotkey cannot conflict
				// with itself
				keys[hotkey]=new Set();
			}

			keys[hotkey].add(id);
		});
	}
};

Editor.prototype.setVisibleHotkeys=function() {
	for (let y=0; y<ROWS; y++) {
		for (let x=0; x<COLS; x++) {
			let id=this.card[y][x];

			if (!commands.exists(id)) {
				continue;
			}

			let span=document.getElementById("span_"+id);

			let hotkey=commands.get(id, "Hotkey");
			let researchhotkey=commands.get(id, "Researchhotkey");

			// shows "Hotkey" if available, else shows "Researchhotkey"
			// (for passives)
			if (hotkey!="") {
				if (hotkey=="512") {
					span.innerHTML="Esc";
				} else { // only show first letter (even if multi-tiered)
					span.innerHTML=hotkey.slice(0, 1);
				}
			} else if (researchhotkey!="") {
				span.innerHTML=researchhotkey.slice(0, 1);
				span.classList.add("passive");
			}
		}
	}

	// tracks conflicts outside of flag functions so conflicts can be detected
	// in two-state commands and across different hotkey types,
	// else class will be toggled an unpredictable amount
	let conflicts=[];

	let keys=this.getConflicts(this.unit);
	flagHotkeys(keys.hotkeys);
	flagHotkeys(keys.researchhotkeys);

	function flagHotkeys(hotkeys) {
		Object.values(hotkeys).forEach(function(values) {
			values.forEach(function(value) {
				let conflict=values.size>1;
				let span=document.getElementById("span_"+value);

				if (!conflicts.includes(value)) {
					span.classList.toggle("conflict", conflict);
				}

				if (conflict) {
					conflicts.push(value);
				}
			});
		});
	}
};

Editor.prototype.checkConflicts=function(unit) {
	let keys=this.getConflicts(unit), conflict=false;

	Object.values(keys).forEach(function(hotkeys) {
		Object.values(hotkeys).forEach(function(values) {
			values.forEach(function() {
				if (values.size>1) {
					conflict=true;
					return;
				}
			});
		});
	});

	return conflict;
};

Editor.prototype.checkAllConflicts=function() {
	let sections=document.getElementsByTagName("section");

	for (let i=0; i<sections.length; i++) {
		let links=sections[i].getElementsByTagName("a");

		for (let j=0; j<links.length; j++) {
			let unit=links[j].hash.replace("#", "");
			links[j].classList.toggle("conflict", this.checkConflicts(unit));
		}
	}
};

Editor.prototype.drop=function(from, to) {
	if (from==to) {
		return;
	}

	let pattern=/Y(\d)X(\d)/;
	let oldpos="", newpos="", oldunpos="", newunpos="", swap=false;

	// trims "img_" prefix
	from=from.replace("img_", "");
	// special case for build buttons
	from=this.convertBuildCommand(from);

	// must also transfer "Unbuttonpos" for toggleable/two-state abilities
	oldunpos=commands.get(from, "Unbuttonpos");

	// checks if destination ID is div grid coord (for empty spot)
	// or command (for button swap)
	if (to.match(pattern)) {
		newpos=to.replace(pattern, "$2,$1");
	} else { // if destination is not empty, swap button positions
		// trims "img_" prefix
		to=to.replace("img_", "");
		// special case for build buttons
		to=this.convertBuildCommand(to);

		newpos=commands.get(to, "Buttonpos");
		newunpos=commands.get(to, "Unbuttonpos");

		oldpos=commands.get(from, "Buttonpos");

		// uses location of button in card if available (so that drag-and-drop
		// operations try to match how the button positions are displayed over
		// how they are stored), otherwise uses stored value
		for (let y=0; y<ROWS; y++) {
			for (let x=0; x<COLS; x++ ){
				if (from==this.card[y][x]) {
					oldpos=x+","+y;

					if (oldunpos!="") {
						oldunpos=oldpos;
					}
				}

				if (to==this.card[y][x]) {
					newpos=x+","+y;

					if (newunpos!="") {
						newunpos=newpos;
					}
				}
			}
		}

		// if both buttons have same position,
		// empty old button position to resolve conflict
		if (oldpos==newpos) {
			oldpos="";
		}

		commands.set(to, "Buttonpos", oldpos);

		if (newunpos!="") {
			commands.set(to, "Unbuttonpos", oldpos);
		}
	}

	commands.set(from, "Buttonpos", newpos);

	if (oldunpos!="") {
		commands.set(from, "Unbuttonpos", newpos);
	}

	this.clearButtons();
	this.unitEditor();
	this.commandEditor();
};

Editor.prototype.commandEditor=function() {
	if (!commands.exists(this.command)) {
		return;
	}

	let tip=commands.get(this.command, "Tip");
	let hotkey=commands.get(this.command, "Hotkey");
	let untip=commands.get(this.command, "Untip");
	let unhotkey=commands.get(this.command, "Unhotkey");
	let researchtip=commands.get(this.command, "Researchtip");
	let researchhotkey=commands.get(this.command, "Researchhotkey");
	let revivetip=commands.get(this.command, "Revivetip");
	let awakentip=commands.get(this.command, "Awakentip");

	this.formatTip("Tip", tip);
	this.formatTip("Untip", untip);
	this.formatTip("Researchtip", researchtip);
	this.formatTip("Revivetip", revivetip);
	this.formatTip("Awakentip", awakentip);

	this.formatHotkey("Hotkey", hotkey);
	this.formatHotkey("Unhotkey", unhotkey);
	this.formatHotkey("Researchhotkey", researchhotkey);

	// automatically selects first hotkey field
	if (hotkey||researchhotkey) {
		let id=hotkey?"Hotkey":"Researchhotkey";
		document.getElementById(id).getElementsByTagName("input")[0].select();
	}

	let h3=document.getElementById("command");
	h3.innerHTML=this.name;
	h3.classList.remove("hidden");

	let p=document.createElement("p");
	p.id="default";

	let button=document.createElement("button");
	button.setAttribute("type", "button");
	button.addEventListener("click", function() {
		this.resetDefaults();
	}.bind(this));
	button.innerHTML="Reset to Default Values";
	p.appendChild(button);

	if (!this.command.startsWith("cmd")) { // omits basic commands
		button=document.createElement("button");
		button.setAttribute("type", "button");
		button.addEventListener("click", function() {
			this.findUnitsWith(this.command);
		}.bind(this));
		button.innerHTML="Show Units with This Command";
		p.appendChild(button);
	}

	document.getElementById("default").replaceWith(p);
	this.clear(document.getElementById("other"));
};

Editor.prototype.formatTip=function(key, tip) {
	if (tip=="") { // hides empty element so it cannot be edited
		document.getElementById(key).classList.add("hidden");
		return;
	}

	// converts from hotkey file format to HTML
	tip=tip.replace(/&/g, "&amp;");
	tip=tip.replace(/</g, "&lt;");
	tip=tip.replace(/>/g, "&gt;");
	tip=tip.replace(/\|cffffcc00([^|]+)\|r/g, '<span class="hotkey">$1</span>');
	tip=tip.replace(/\|cffc3dbff([^|]+)\|r/g, '<span class="note">$1</span>');

	// splits string by comma unless comma is within quotes
	let tips=tip.split(DELIMITER);

	for (let i=0; i<tips.length; i++) {
		tips[i]=tips[i].replace(/"/g, ""); // removes quotes
	}

	tip=tips.join("<br>");

	document.getElementById(key).classList.remove("hidden");
	document.getElementById(key).innerHTML=tip;
};

Editor.prototype.focusTip=function(key) {
	let element=document.getElementById(key);
	let tip=element.innerHTML;

	// converts from HTML to editing format
	tip=tip.replace(/&amp;/g, "&");
	tip=tip.replace(/&lt;/g, "<");
	tip=tip.replace(/&gt;/g, ">");
	tip=tip.replace(/<span class="hotkey">([^<]+)<\/span>/g, "*$1*");
	tip=tip.replace(/<span class="note">([^<]+)<\/span>/g, "^$1^");
	element.innerHTML=tip;
};

Editor.prototype.editTip=function(key) {
	let element=document.getElementById(key);
	let tip=element.innerHTML;

	// converts from editing format to hotkey file format
	tip=tip.replace(/&amp;/g, "&");
	tip=tip.replace(/&lt;/g, "<");
	tip=tip.replace(/&gt;/g, ">");
	tip=tip.replace(/"/g, "");
	tip=tip.replace(/\*([^*]+)\*/g, "|cffffcc00$1|r");
	tip=tip.replace(/\^([^^]+)\^/g, "|cffc3dbff$1|r");

	let tips=tip.split("<br>");

	for (let i=0; i<tips.length; i++) {
		if (tips[i].match(",")) { // quotes strings containing a comma
			tips[i]="\""+tips[i]+"\"";
		}
	}

	tip=tips.join(",");

	if (tip.endsWith(",")) { // chops terminal ","
		tip=tip.slice(0, -1);
	}

	this.formatTip(key, tip);
	commands.set(this.command, key, tip);
};

Editor.prototype.autoSetTip=function(key, fields) {
	// converts hotkey key to equivalent tip key (if available)
	if (key=="Hotkey") {
		key="Tip";
	} else if (key=="Unhotkey") {
		key="Untip";
	} else if (key=="Researchhotkey") {
		key="Researchtip";
	}

	if (!commands.exists(this.command, key)) {
		return;
	}

	let tips=commands.get(this.command, key);
	// splits string by comma unless comma is within quotes
	tips=tips.split(DELIMITER);

	// handles patterns with hotkey at start (common with many user files)
	// or at end (Blizzard's convention), depending on user preference
	let start=document.getElementById("start").checked;
	let replace="", k=0;

	let startPattern=/^\(\|cffffcc00(ESC|\w)\|r\) /g;
	let endPattern=/ \(\|cffffcc00(ESC|\w)\|r\)$/g;
	let pattern=start?startPattern:endPattern;
	let otherPattern=start?endPattern:startPattern;

	for (let i=0; i<tips.length; i++ ) {
		tips[i]=tips[i].replace(/"/g, ""); // removes quotes

		// skips hint lines
		if (tips[i].startsWith("|cffc3dbff")) {
			continue;
		}

		// if there are multiple fields,
		// set each line to a different hotkey (e.g., weapon/armor upgrades),
		// otherwise set all lines to the same hotkey (e.g., hero abilities)
		k=fields.length>1?i:0;

		if (fields[k]=="512") {
			fields[k]="ESC";
		}

		replace="(|cffffcc00"+fields[k].toUpperCase()+"|r)";

		if (start) {
			replace+=" ";
		} else {
			replace=" "+replace;
		}

		// handles tips already in the desired format
		if (tips[i].match(pattern)) {
			tips[i]=tips[i].replace(pattern, replace);
		} else {
			// removes hotkey in opposite (start/end) pattern
			if (tips[i].match(otherPattern)) {
				tips[i]=tips[i].replace(otherPattern, "");
			}

			// removes existing highlighting (matches letters and numbers
			// but not whitespace to avoid matching "Level \d")
			tips[i]=tips[i].replace(/\|cffffcc00(\w+)\|r/g, "$1");

			if (start) {
				tips[i]=replace+tips[i];
			} else {
				tips[i]+=replace;
			}
		}

		if (tips[i].match(",")) { // quotes strings containing a comma
			tips[i]="\""+tips[i]+"\"";
		}
	}

	let tip=tips.join(",");

	commands.set(this.command, key, tip);
	this.formatTip(key, tip);
};

Editor.prototype.formatHotkey=function(key, hotkey) {
	let p=document.createElement("p");
	p.id=key;
	p.classList.add("hotkey");

	if (hotkey=="") { // hides field if empty
		document.getElementById(key).replaceWith(p);
		document.getElementById(key).classList.add("hidden");
		return;
	}

	if (hotkey=="512") {
		hotkey="\u238b"; // escape symbol (for display)
	}

	let label=document.createElement("label");
	label.innerHTML=key+": ";

	// handles multi-tier hotkeys (e.g., weapon/armor upgrades)
	let hotkeys=hotkey.split(","), inputs=Array(hotkeys.length).fill();
	let self=this;

	for (let i=0; i<hotkeys.length; i++) {
		inputs[i]=document.createElement("input");
		inputs[i].setAttribute("type", "text");
		inputs[i].setAttribute("value", hotkeys[i]);
		inputs[i].addEventListener("click", function() {
			this.select();
		});
		inputs[i].addEventListener("input", function() {
			self.editHotkey(this, key, this.value);
		});

		label.appendChild(inputs[i]);
	}

	p.appendChild(label);

	// appends "Set to Esc" button for cancel buttons
	if (this.command.startsWith("cmdcancel")) {
		let button=document.createElement("button");
		button.setAttribute("type", "button");
		button.addEventListener("click", function() {
			this.setHotkey(key, "512");
			this.formatHotkey(key, "512");
			this.setVisibleHotkeys();
			this.checkAllConflicts();
		}.bind(this));
		button.innerHTML="Set to Esc";
		p.appendChild(button);
	}

	document.getElementById(key).classList.remove("hidden");
	document.getElementById(key).replaceWith(p);
};

Editor.prototype.editHotkey=function(input, key, hotkey) {
	// removes non-letter characters
	if (hotkey.match(/[A-Z]/i)==null) {
		input.value="";
		return;
	}

	// limits input to one character
	if (hotkey.length>1) {
		hotkey=hotkey.slice(0, 1);
	}

	// sets all hotkeys together if "spirit link" option selected
	if (document.getElementById("link").checked) {
		this.setHotkey("Hotkey", hotkey);
		this.setHotkey("Unhotkey", hotkey);
		this.setHotkey("Researchhotkey", hotkey);
	} else {
		this.setHotkey(key);
	}

	input.select();
	this.setVisibleHotkeys();
	this.checkAllConflicts();
};

Editor.prototype.setHotkey=function(key, hotkey="") {
	if (!commands.exists(this.command, key)) {
		return;
	}

	let inputs=document.getElementById(key).getElementsByTagName("input");
	let fields=[], input=null;

	hotkey=hotkey.split(",");

	for (let i=0; i<inputs.length; i++) {
		input=inputs[i];

		// handles multi-tier hotkeys (e.g., weapons/armor upgrades)
		if (hotkey.length>1) {
			fields[i]=hotkey[i];
			input.value=hotkey[i];
		} else {
			if (hotkey!="") {
				// sets hotkeys to the optional function parameter value;
				// this is the case when "spirit linking" is used
				// and also when setting the "Esc" key
				fields[i]=hotkey[0];
				input.value=hotkey[0];
			} else {
				// uses input field value if optional parameter not specified
				fields[i]=input.value;
			}
		}
	}

	commands.set(this.command, key, fields.join(",").toUpperCase());

	if (document.getElementById("tooltips").checked) {
		this.autoSetTip(key, fields);
		this.autoSetTip("Awakentip", fields);
		this.autoSetTip("Revivetip", fields);
	}
};

Editor.prototype.resetDefaults=function() {
	commands.clear(this.command);

	this.clearButtons();
	this.clearFields();
	this.unitEditor();
	this.commandEditor();
};

Editor.prototype.filter=function(race) {
	if (race=="bloodelf") {
		race="human";
	} else if (race=="draenei") {
		race="orc";
	} else if (race=="demon") {
		race="undead";
	} else if (race=="naga") {
		race="nightelf";
	}

	let sections=document.getElementsByTagName("section");

	// hides unit lists for races other than selected
	for (let i=0; i<sections.length; i++) {
		sections[i].classList.toggle("hidden", sections[i].id!="units_"+race);
	}
};

Editor.prototype.findUnitsNamed=function(query) {
	// minimum three characters to search to prevent huge result lists
	if (query.length<3) {
		this.clearSearch();
		return;
	}

	let matches=[];

	query=query.toLowerCase();

	Object.entries(units).forEach(function([unit, properties]) {
		if (properties.name==undefined) {
			return;
		}

		if (properties.name.toLowerCase().indexOf(query)!=-1) {
			matches.push(unit);
		}
	});

	this.formatResults("results", matches);
};

Editor.prototype.findUnitsWith=function(command) {
	let matches=new Set();

	Object.entries(units).forEach(function([unit, properties]) {
		if (properties.commands==undefined) {
			return;
		}

		Object.entries(properties.commands).forEach(function([id, name]) {
			if (id==command) {
				matches.add(unit);
			}
		});
	});

	let h3=document.getElementById("command");
	h3.classList.remove("hidden");
	h3.innerHTML+=" ("+this.command+")";

	this.clearFields();
	this.formatResults("other", matches);

	let p=document.createElement("p");
	p.id="default";

	let button=document.createElement("button");
	button.setAttribute("type", "button");
	button.addEventListener("click", function() {
		this.commandEditor();
	}.bind(this));
	button.innerHTML="Edit This Command";
	p.appendChild(button);

	document.getElementById("default").replaceWith(p);
};

Editor.prototype.formatResults=function(id, matches) {
	let ul=document.createElement("ul");
	ul.id=id;

	matches.forEach(function(match) {
		let unit=units[match];

		let li=document.createElement("li");
		let img=document.createElement("img");
		img.setAttribute("src", "icons/"+match+".png");
		img.setAttribute("alt", "["+unit.name+"]");
		img.setAttribute("title", unit.name);

		let a=document.createElement("a");
		a.href="#"+match;
		a.innerHTML=unit.name;
		a.classList.toggle("conflict", this.checkConflicts(match));

		// special case for currently selected unit (which will not fire
		// hashchange event)
		if (this.unit==match) {
			a.addEventListener("click", function() {
				this.commandEditor();
				this.clearSearch(true);
			}.bind(this));
		}

		if (unit.suffix!=undefined) {
			a.innerHTML+=" ("+unit.suffix+")";
		}

		li.appendChild(img);
		li.appendChild(a);
		ul.appendChild(li);
	}, this);

	document.getElementById(id).replaceWith(ul);
};

Editor.prototype.highlightResult=function(dir) {
	let results=document.getElementById("results").children;

	if (dir) { // up arrow
		if (this.selected==-1) {
			// loops back around to bottom
			this.selected=results.length-1;
		} else {
			this.selected--;
		}
	} else { // down arrow
		if (this.selected>=results.length-1) {
			// loops back around to top
			this.selected=-1;
		} else {
			this.selected++;
		}
	}

	for (let i=0; i<results.length; i++) {
		if (this.selected==i) {
			results[i].classList.add("selected");
			results[i].scrollIntoView(); // for long lists with scrollbars
		} else {
			results[i].classList.remove("selected");
		}
	}
};

Editor.prototype.openResult=function() {
	let results=document.getElementById("results").children;

	// ignores invalid array indices
	if (this.selected<0||this.selected>=results.length) {
		return;
	}

	results[this.selected].getElementsByTagName("a")[0].click();
};

/*
 * Commands prototype
 */

function Commands() {
	this.list={};
	this.defaults=null;
}

Commands.prototype.load=function(list) {
	if (this.defaults==null) {
		this.defaults=list;
	} else {
		this.list=list;
	}
};

// converts from hotkey file format to object
Commands.prototype.parse=function(text) {
	let list={}, block={}, id="", key="", value="";

	let lines=text.split("\n");
	let pattern=/^(\w+)=(.+)$/; // pattern for key=value pairs, skips comments

	// ensures empty line at end of file so final command block is saved
	lines.push("");

	for (let i=0; i<lines.length; i++) {
		// adds command block to object whenever new command block is found
		// or at end of file (for the last command block)
		if (lines.length==i+1||lines[i].match(/^\[(\w+)\]$/)) {
			if (id!="") {
				id=id.toLowerCase();

				// if a command has multiple blocks, only first is used
				if (list[id]==undefined) {
					list[id]=block;
				}

				block={};
			}

			id=lines[i].slice(1, -1);
		}

		// matches key=value pairs
		if (lines[i].match(pattern)) {
			key=lines[i].replace(pattern, "$1");
			value=lines[i].replace(pattern, "$2");
			block[key]=value;
		}
	}

	this.load(list);
};

// converts from object to hotkey file format
Commands.prototype.convert=function() {
	let text=Object.keys(this.list).reduce(function(text, id) {
		text+="\n["+id+"]\n";

		text=Object.keys(this.list[id]).reduce(function(text, key) {
			return text+key+"="+this.list[id][key]+"\n";
		}.bind(this), text);

		return text;
	}.bind(this), "");

	return text.trim();
};

Commands.prototype.exists=function(id, key) {
	if (this.defaults[id]==undefined) {
		return;
	}

	if (key&&this.defaults[id][key]==undefined) {
		return;
	}

	return true;
};

Commands.prototype.get=function(id, key) {
	if (this.list[id]!=undefined&&this.list[id][key]!=undefined) {
		return this.list[id][key];
	}

	if (this.exists(id, key)) {
		return this.defaults[id][key];
	}

	return "";
};

Commands.prototype.set=function(id, key, value) {
	if (this.exists(id, key)&&this.defaults[id][key]==value) {
		// removes user hotkey if same as default (to avoid redundant entries)
		if (this.list[id]!=undefined&&this.list[id][key]!=undefined) {
			delete this.list[id][key];

			if (Object.keys(this.list[id]).length==0) {
				delete this.list[id];
			}
		}
	} else {
		if (this.list[id]==undefined&&id.match(/^\w+$/)) {
			this.list[id]={};
		}

		this.list[id][key]=value;
	}
};

Commands.prototype.clear=function(id) {
	delete this.list[id];
};

Commands.prototype.reset=function() {
	this.load({});
};

/*
 * Overlay prototype
 */

function Overlay(id) {
	this.id="overlay_"+id;
	this.textarea="text_"+id;
}

Overlay.prototype.show=function() {
	document.getElementById(this.id).classList.add("open");
	this.focus();
};

Overlay.prototype.hide=function() {
	document.getElementById(this.id).classList.remove("open");
};

Overlay.prototype.getText=function() {
	return document.getElementById(this.textarea).value;
};

Overlay.prototype.setText=function(text) {
	document.getElementById(this.textarea).value=text;
};

Overlay.prototype.focus=function() {
	document.getElementById(this.textarea).focus();
	document.getElementById(this.textarea).setSelectionRange(0, 0);
};

Overlay.prototype.select=function() {
	document.getElementById(this.textarea).select()
};

/*
 * Files prototype
 */

function Files(id) {
	this.id=id;
}

Files.prototype.getList=function() {
	let xhr=new XMLHttpRequest();
	let self=this;

	xhr.addEventListener("readystatechange", function() {
		if (this.readyState==4&&this.status==200) {
			let select=document.createElement("select");
			select.id=self.id;
			select.addEventListener("change", function() {
				self.load(
					select.value,
					overlays.load.setText.bind(overlays.load)
				);
			});

			let option=document.createElement("option");
			option.innerHTML="(Select a set...)";
			select.appendChild(option);

			for (let i=0; i<this.response.length; i++) {
				option=document.createElement("option");
				option.innerHTML=this.response[i];
				select.appendChild(option);
			}

			document.getElementById(self.id).replaceWith(select);
		}
	});
	xhr.open("GET", DIR_LIST, true);
	xhr.responseType="json";
	xhr.send();
};

Files.prototype.load=function(file, callback) {
	// ignores explanatory "(Select a set...)" option
	if (file.startsWith("(")) {
		return;
	}

	let xhr=new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function() {
		if (this.readyState==4&&this.status==200) {
			callback(this.responseText);
		}
	});
	xhr.open("GET", HOTKEY_DIR+file, true);
	xhr.responseType="text";
	xhr.send();
};

/*
 * Storage prototype
 */

function Storage(name) {
	this.name=name;
}

Storage.prototype.load=function() {
	try {
		let contents=localStorage.getItem(this.name);

		if (contents!=null) {
			return JSON.parse(contents);
		}
	} catch (err) {
		console.error(err);
	}
};

Storage.prototype.save=function(list) {
	try {
		if (Object.keys(list).length!=0) {
			localStorage.setItem(this.name, JSON.stringify(list));
		} else {
			this.reset();
		}
	} catch (err) {
		console.error(err);
	}
};

Storage.prototype.reset=function() {
	try {
		localStorage.removeItem(this.name);
	} catch (err) {
		console.error(err);
	}
};