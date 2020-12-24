/******************************************************************************
 * Warcraft III Hotkey Editor                                                 *
 *                                                                            *
 * Copyright (C) 2018 J.C. Fields (jcfields@gmail.com).                       *
 *                                                                            *
 * Permission is hereby granted, free of charge, to any person obtaining a    *
 * copy of this software and associated documentation files (the "Software"), *
 * to deal in the Software without restriction, including without limitation  *
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,   *
 * and/or sell copies of the Software, and to permit persons to whom the      *
 * Software is furnished to do so, subject to the following conditions:       *
 *                                                                            *
 * The above copyright notice and this permission notice shall be included in *
 * all copies or substantial portions of the Software.                        *
 *                                                                            *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR *
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,   *
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL    *
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER *
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING    *
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER        *
 * DEALINGS IN THE SOFTWARE.                                                  *
 ******************************************************************************/

"use strict";

/*
 * constants
 */

// dimensions of command cards
const CARDS = 3;
const ROWS = 3;
const COLS = 4;

// initial unit on load
const DEFAULT_UNIT = "hpea";

// file names and locations
const DEFAULT_HOTKEY_FILE = "default.txt";
const DEFAULT_SAVE_NAME = "CustomKeys.txt";
const DEFAULT_ICON = "btnsheep";
const DEFAULT_ICON_SET = "classic";
const ICON_DIR = "icons";
const HOTKEY_DIR = "hotkeys";
const DIR_LIST = "hotkeys/index.json";
const HELP_PAGE = "help.html";
const ANNOYED_CLICKS = 10;
const ANNOYED_SOUND = "annoyed.wav";
const MIME_TYPE = "text/plain";

// delimiter for multi-level tips, multi-tier hotkeys, and button positions
const DELIMITER = ",";
// pattern for splitting multi-line tips
const PATTERN = /,(?=(?:[^"]|"[^"]*")*$)/;

// command cards
const STANDARD = 0, RESEARCH = 1, BUILD = 2;
// commands
const CANCEL = "cmdcancel", RALLY = "cmdrally";
// tooltip positions
const START = "start", END = "end";

// storage and options
const STORAGE_NAME = "wc3hk";
const OPTIONS_SECTION = "hotkeyeditorpreferences";
const DEFAULT_OPTIONS = {
	icons:      DEFAULT_ICON_SET,
	spiritlink: true,
	tooltips:   false,
	end:        END
};

/*
 * initialization
 */

window.addEventListener("load", function() {
	const options = new Options();
	const store = new Storage(STORAGE_NAME);
	const overlays = {
		load: new Overlay("load"),
		save: new Overlay("save")
	};
	const commands = new Commands();
	const editor = new Editor(commands, options);

	options.reset(); // sets elements to default states

	// loads default commands
	load(DEFAULT_HOTKEY_FILE, function(text) {
		commands.parse(text);

		let mem = store.load();

		if (mem != null) {
			options.load(mem);
			commands.load(mem);
		}

		editor.load();
	});

	// populates list of sample files on load overlay
	getList(function(text) {
		overlays.load.setText(text);
	});

	window.addEventListener("beforeunload", function() {
		commands.list = options.save(commands.list);
		store.save(commands.list);
	});
	window.addEventListener("hashchange", function() {
		// changes on link or browser back/forward
		editor.load();
	});
	window.addEventListener("keyup", function(event) {
		let keyCode = event.keyCode;

		if (keyCode == 27) { // Esc
			for (let overlay of Object.values(overlays)) {
				overlay.hide();
			}
		}
	});

	document.addEventListener("click", function(event) {
		let element = event.target;

		if (element.closest("#open")) {
			let file = overlays.load.getText();

			if (file != "") {
				commands.parse(file);
				options.load(commands.list);
				editor.open();
				overlays.load.hide();
			}
		}

		if (element.closest("#reset")) {
			commands.reset();
			options.reset();
			store.reset();
			editor.open();

			$("#files").selectedIndex = 0;
			overlays.load.setText("");
			overlays.load.hide();
		}

		if (element.closest("#copy")) {
			overlays.save.select();
			document.execCommand("copy");
		}

		if (element.matches("#help")) {
			window.location = HELP_PAGE;
		}

		if (element.closest("#load")) {
			overlays.load.show();
		}

		if (element.closest("#save")) {
			commands.list = options.save(commands.list);
			store.save(commands.list);

			overlays.save.setText(commands.convert());
			overlays.save.show();
		}

		if (element.matches("#download")) {
			let file = new Blob([overlays.save.getText()], {type: MIME_TYPE});

			let a = $("#link");
			a.download = DEFAULT_SAVE_NAME;
			a.href = window.URL.createObjectURL(file);
			a.click();
			window.URL.revokeObjectURL(file);
		}

		if (element.matches("#show")) {
			editor.findUnitsWith(editor.command);
		}

		if (element.matches("#edit")) {
			editor.commandEditor();
		}

		if (element.matches("#defaults")) {
			editor.resetDefaults();
		}

		if (element.matches("#unit img")) {
			editor.clicks++;

			if (editor.clicks >= ANNOYED_CLICKS) {
				editor.clicks = 0;

				let audio = new Audio(ICON_DIR + "/" + ANNOYED_SOUND);
				audio.play();
			}
		}

		if (element.matches(".hotkey input")) {
			event.preventDefault(); // prevents click from activating label
		}

		if (element.matches(".clear")) {
			editor.clearSearch(true);
		}

		if (element.matches(".filter")) {
			editor.filter(element.value);
		}

		if (element.closest(".close")) {
			overlays[element.closest(".close").value].hide();
		}

		if (element.matches(".option")) {
			options.reload(commands.list);
		}

		if (element.matches(".icons")) {
			editor.clearButtons();
			editor.clearSearch();
			editor.unitEditor();
		}

		if (element.matches(".esc")) {
			editor.setHotkey(element.value, "512");
			editor.formatHotkey(element.value, "512");
			editor.setVisibleHotkeys();
			editor.checkAllConflicts();
		}
	});
	document.addEventListener("input", function(event) {
		let element = event.target;

		if (element.matches("#query")) {
			editor.findUnitsNamed(element.value);
		}
	});
	document.addEventListener("keydown", function(event) {
		let element = event.target;

		if (element.matches(".hotkey input")) {
			// ignores input if modifier key held
			if (!event.ctrlKey && !event.altKey && !event.metaKey) {
				event.preventDefault();

				let type = element.closest(".hotkey").id;
				editor.editHotkey(element, type, event);
			}
		}

		if (element.matches("#query")) {
			let keyCode = event.keyCode;

			if (keyCode == 13) { // return/enter
				editor.openResult();
			}

			if (keyCode == 27) { // Esc
				editor.clearSearch(true);
			}

			if (keyCode == 38) { // up arrow
				editor.selectResult(true);
			}

			if (keyCode == 40) { // down arrow
				editor.selectResult(false);
			}
		}
	});
	document.addEventListener("mouseover", function(event) {
		let element = event.target;

		if (element.matches("#results li")) {
			editor.selected = $$("#results li").findIndex(function(item) {
				return item == element;
			});
			editor.highlightResult();
		}
	});

	$("#file").addEventListener("change", function(event) {
		let file = event.target.files[0];

		if (file != null) {
			let reader = new FileReader();
			reader.addEventListener("load", function(event) {
				$("#files").selectedIndex = 0;
				overlays.load.setText(event.target.result);
			});
			reader.readAsText(file);
		}
	});

	for (let element of $$(".tip")) {
		element.addEventListener("focus", function() {
			editor.focusTip(this.id);
		});
		element.addEventListener("blur", function() {
			editor.editTip(this.id);
		});
		element.addEventListener("drop", function(event) {
			// prevents dropping HTML-formatted objects (namely images)
			// onto tooltip text
			if (event.dataTransfer.getData("text/html") != "") {
				event.preventDefault();
			}
		});

		let contentEditable = "true";

		if (window.navigator.userAgent.includes("WebKit")) {
			contentEditable = "plaintext-only";
		}

		element.setAttribute("contenteditable", contentEditable);
	}

	for (let element of $$("#query, .tip, textarea")) {
		element.setAttribute("autocomplete", "off");
		element.setAttribute("autocorrect", "off");
		element.setAttribute("autocapitalize", "off");
		element.setAttribute("spellcheck", "false");
	}

	function load(file, callback) {
		// ignores explanatory "(Select a set...)" option
		if (file.startsWith("(")) {
			return;
		}

		let xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function() {
			if (this.readyState == 4 && this.status == 200) {
				callback(this.responseText);
			}
		});
		xhr.open("GET", HOTKEY_DIR + "/" + file, true);
		xhr.responseType = "text";
		xhr.send();
	}

	function getList(callback) {
		let xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function() {
			if (this.readyState != 4 || this.status != 200) {
				return;
			}

			let select = document.createElement("select");
			select.id = "files";
			select.addEventListener("change", function() {
				load(select.value, callback);
			});

			let option = document.createElement("option");
			option.appendChild(document.createTextNode("(Select a set...)"));
			select.appendChild(option);

			for (let file of this.response) {
				option = document.createElement("option");
				option.appendChild(document.createTextNode(file));
				select.appendChild(option);
			}

			$("#files").replaceWith(select);
		});
		xhr.open("GET", DIR_LIST, true);
		xhr.responseType = "json";
		xhr.send();
	}
});

function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return Array.from(document.querySelectorAll(selector));
}

/*
 * Editor prototype
 */

function Editor(commands, options) {
	this.commands = commands;
	this.options = options;

	this.unit = "";
	this.command = "";
	this.name = "";
	this.race = "";

	this.card = Array(CARDS).fill().map(function() {
		return Array(ROWS).fill().map(function() {
			return Array(COLS).fill();
		});
	});
	this.active = STANDARD; // active command card
	this.state = false; // button state (for two-state commands)

	this.matches = [];
	this.selected = -1; // selected search result
}

Editor.prototype.load = function() {
	let unit = "";

	// gets current unit from URL if specified
	if (window.location.hash != "") {
		unit = window.location.hash.replace("#", ""); // chops initial #
	} else {
		unit = DEFAULT_UNIT;
	}

	this.setUnit(unit);
};

Editor.prototype.open = function() {
	this.clearButtons();
	this.clearFields();
	this.unitEditor();
};

Editor.prototype.setUnit = function(unit) {
	this.unit = unit;

	if (data.units[this.unit] == undefined) {
		console.error(`Undefined: ${this.unit} (unit)`);
	} else {
		this.race = data.units[this.unit].race;
		this.filter(this.race);
	}

	this.clearSearch(true);
	this.open();
};

Editor.prototype.setCommand = function(id, name) {
	if (this.command != id) {
		this.command = id;
		this.name = name;
	}

	this.commandEditor();
};

Editor.prototype.unitEditor = function() {
	let unit = data.units[this.unit];

	if (unit == undefined) {
		return;
	}

	$("#editor").className = this.race;

	let h2 = document.createElement("h2");
	h2.id = "unit";
	h2.appendChild(document.createTextNode(unit.name));
	$("#unit").replaceWith(h2);

	if (unit.suffix != undefined) {
		h2.textContent += " (" + unit.suffix + ")";
	}

	const button = createButton.call(this, this.unit, unit.name);
	h2.insertBefore(button, h2.firstChild);
	this.clicks = 0;

	let h3 = $("#command");
	h3.textContent = "";
	h3.hidden = true;

	createCommandCard.call(this, STANDARD, unit);

	// shows research card for heroes
	let research = $("#card" + RESEARCH);
	research.hidden = unit.type != HERO;

	if (unit.type == HERO) { // adds cancel button to hero select skills card
		let buttonpos = this.commands.get(CANCEL, "Buttonpos");

		if (buttonpos != "") {
			placeButton.call(this, CANCEL, "Cancel", RESEARCH, buttonpos, true);
		}
	}

	// shows build card for workers
	let build = $("#card" + BUILD);
	build.hidden = unit.build == undefined;

	if (unit.build != undefined && data.units[unit.build] != undefined) {
		createCommandCard.call(this, BUILD, data.units[unit.build]);
	}

	for (let element of $$(".card div")) {
		let card = element.parentNode;

		// adds listeners for drag-and-drop events
		element.addEventListener("dragover", function(event) {
			event.preventDefault();
		});
		element.addEventListener("dragenter", function(event) {
			event.preventDefault();
			this.classList.add("drag");
		});
		element.addEventListener("dragleave", function() {
			this.classList.remove("drag");
		});
		element.addEventListener("drop", function(event) {
			event.preventDefault();

			let data = event.dataTransfer.getData("text");
			this.drop(data, event.target.id, event.shiftKey);
			card.classList.remove("grid");
		}.bind(this));
	}

	this.setVisibleHotkeys();
	this.checkAllConflicts();

	function createCommandCard(n, unit) {
		for (let [id, name] of this.getCommands(unit)) {
			// special exception for build buttons, whose hotkeys and tooltips
			// are under cmdbuild* but whose buttonpos are under a?bu
			let pos = this.convertBuildCommand(id);

			if (!this.commands.exists(pos)) {
				console.error(`Undefined: ${pos} (command)`);
				continue;
			}

			let buttonpos = this.commands.get(pos, "Buttonpos");
			let unbuttonpos = this.commands.get(pos, "Unbuttonpos");
			let researchbuttonpos = this.commands.get(pos, "Researchbuttonpos");

			if (buttonpos != "") {
				placeButton.call(this, id, name, n, buttonpos, true);

				// places separate button for unbutton if in different position
				if (unbuttonpos != "" && buttonpos != unbuttonpos) {
					const args = [id, name, STANDARD, unbuttonpos, false];
					placeButton.apply(this, args);
				}

				if (researchbuttonpos != "") { // for hero abilities
					const args = [id, name, RESEARCH, researchbuttonpos, true];
					placeButton.apply(this, args);
				}
			} else {
				console.error(`Undefined: ${pos} (buttonpos)`);
			}

			// re-selects command if selected on previously viewed unit
			if (this.command == id) {
				this.setCommand(id, name);
			}
		}
	}

	function placeButton(id, name, n, buttonpos, state=true) {
		let pos = buttonpos.split(DELIMITER).map(Number);
		let [y, x] = this.getPosition(n, pos[1], pos[0]);
		let conflict = pos[0] != x || pos[1] != y;

		if (x < 0 || y < 0 || x > COLS || y > ROWS) {
			return;
		}

		if (!state) {
			id += "_"; // unbutton denoted by underscore at end
		}

		this.card[n][y][x] = id;

		let element = createButton.call(this, id, name, n, state);
		element.id = "n" + n + "y" + y + "x" + x;
		element.classList.toggle("conflict", conflict);

		let index = COLS * y + x;
		$("#card" + n).children[index].replaceWith(element);
	}

	function createButton(id, name, n, state=true) {
		let div = document.createElement("div");
		let img = document.createElement("img");
		img.setAttribute("src", this.getIcon(id, n));
		img.setAttribute("alt", "[" + name + "]");
		img.setAttribute("title", name);
		img.addEventListener("click", function() {
			this.active = n;
			this.state = state;

			if (state) {
				this.setCommand(id, name);
			} else {
				this.setCommand(id.slice(0, -1), name);
			}
		}.bind(this));
		div.appendChild(img);

		if (n != undefined) {
			img.id = "img" + n + "_" + id;
		}

		// distinguishes between buttons (in command card)
		// and unit icons (in heading)
		if (this.unit != id) {
			let span = document.createElement("span");
			span.id = "span" + n + "_" + id;
			div.appendChild(span);

			img.setAttribute("draggable", "true");
			img.addEventListener("dragstart", function(event) {
				this.active = n;

				event.dataTransfer.setData("text/plain", event.target.id);
				$("#card" + n).classList.add("grid");
			}.bind(this));
		}

		return div;
	}
};

Editor.prototype.getCommands = function(unit) {
	let buttons = [];

	// adds common commands
	if (unit.type == UNIT || unit.type == SUMMON) {
		buttons = buttons.concat(data.common.basic);
	} else if (unit.type == HERO || unit.type == ITEM) {
		buttons = buttons.concat(data.common.hero);
	} else if (unit.type == NO_ATTACK) {
		buttons = buttons.concat(data.common.noAttack);
	} else if (unit.type == TOWER) {
		buttons = buttons.concat(data.common.tower);
	}

	// adds unit-specific commands
	if (unit.commands != undefined) {
		buttons = buttons.concat(unit.commands);
	}

	return new Map(buttons);
};

Editor.prototype.getIcon = function(id, n=STANDARD) {
	let dir = this.options.read("icons");
	let icon = "";

	// special case for race-specific rally point icons
	if (id == RALLY && data.units[this.unit] != undefined) {
		let race = data.units[this.unit].race || NEUTRAL;

		if (race == ORC) {
			icon = "btnorcrallypoint";
		} else if (race == UNDEAD) {
			icon = "btnrallypointundead";
		} else if (race == NIGHT_ELF) {
			icon = "btnrallypointnightelf";
		} else { // human is default
			icon = "btnrallypoint";
		}
	} else {
		icon = data.icons[dir].commands[id];

		if (icon == undefined) {
			// uses default icon name if not overridden,
			// otherwise uses filler art for missing icon
			icon = data.icons[DEFAULT_ICON_SET].commands[id] || DEFAULT_ICON;
		}
	}

	if (n == RESEARCH) { // uses different icons for research card
		if (icon.startsWith("pas")) { // passive icons
			icon = icon.slice(3);
		} else if (icon.endsWith("off")) { // auto-cast icons
			icon = icon.slice(0, -3);
		}
	}

	return ICON_DIR + "/" + dir + "/" + icon + data.icons[dir].extension;
};

Editor.prototype.getPosition = function(n, y, x) {
	let dir = true;

	do {
		if (this.card[n][y][x] == "") {
			return [y, x]; // available position found
		}
	} while (iterate());

	// could not find position for button;
	// theoretically should never happen since it would require a unit
	// have more commands than positions available (i.e., more than 12)
	return [-1, -1];

	function iterate() {
		if (dir) {
			dir = iterateForwards();
			return true;
		} else {
			// after iterating through all positions forwards unsuccessfully,
			// try to find position by iterating through all positions backwards
			return iterateBackwards();
		}
	}

	function iterateForwards() {
		x++;

		if (x >= COLS) { // wraps to next row
			y++;
			x = 0;
		}

		if (y >= ROWS) { // overflow
			y = ROWS - 1;
			x = COLS - 1;

			return false;
		}

		return true;
	}

	function iterateBackwards() {
		x--;

		if (x < 0) { // wraps to previous row
			y--;
			x = COLS - 1;
		}

		if (y < 0) { // underflow
			x = 0;
			y = 0;

			return false;
		}

		return true;
	}
};

Editor.prototype.drop = function(from, to, allowConflict=false) {
	if (from == to) {
		return;
	}

	let coordPattern = /n(\d)y(\d)x(\d)/;
	let imgPattern = /img(\d)_([\w_]+)/;

	let fromCard = from.replace(imgPattern, "$1");
	let toCardCoord = to.replace(coordPattern, "$1");
	let toCardImg = to.replace(imgPattern, "$1");

	if (fromCard != toCardCoord && fromCard != toCardImg) { // different cards
		return;
	}

	let oldpos = "", newpos = "", oldunpos = "", newunpos = "";

	// trims "img#_" prefix
	from = from.replace(imgPattern, "$2");
	// special case for build buttons
	from = this.convertBuildCommand(from);

	// must also transfer "Unbuttonpos" for toggleable/two-state abilities
	if (this.active != RESEARCH) {
		oldunpos = this.commands.get(from, "Unbuttonpos");
	}

	// checks if destination ID is div grid coord (for empty spot)
	// or command (for button swap)
	if (to.match(coordPattern)) {
		newpos = to.replace(coordPattern, "$3,$2");
		oldpos = this.commands.get(from, "Buttonpos");
	} else { // if destination is not empty, swap button positions
		// trims "img#_" prefix
		to = to.replace(imgPattern, "$2");
		// special case for build buttons
		to = this.convertBuildCommand(to);

		if (this.active != RESEARCH || to == CANCEL) {
			newpos = this.commands.get(to, "Buttonpos");
		} else {
			newpos = this.commands.get(to, "Researchbuttonpos");
		}

		// modifier key held during drop overrides swap behavior and allows
		// position conflict
		if (!allowConflict) {
			if (this.active != RESEARCH || from == CANCEL) {
				newunpos = this.commands.get(to, "Unbuttonpos");
				oldpos = this.commands.get(from, "Buttonpos");
			} else {
				oldpos = this.commands.get(from, "Researchbuttonpos");
			}

			// uses location of button in card if available, otherwise uses
			// stored value (so drag-and-drop operations try to match how the
			// button positions are displayed over how they are stored, which
			// is more consistent with user expectations)
			for (let y of this.card[this.active].keys()) {
				for (let x of this.card[this.active][y].keys()){
					if (from == this.card[this.active][y][x]) {
						oldpos = x + DELIMITER + y;

						if (oldunpos != "" && oldpos == oldunpos) {
							oldunpos = oldpos;
						}
					}

					if (to == this.card[this.active][y][x]) {
						newpos = x + DELIMITER + y;

						if (newunpos != "" && newpos == newunpos) {
							newunpos = newpos;
						}
					}
				}
			}

			// if both buttons have same position,
			// empty old button position to resolve conflict
			if (oldpos == newpos) {
				oldpos = "";
			}

			if (this.active != RESEARCH || to == CANCEL) {
				if (to.slice(-1) != "_") {
					this.commands.set(to, "Buttonpos", oldpos);

					if (newunpos != "" && newpos == newunpos) {
						this.commands.set(to, "Unbuttonpos", oldpos);
					}
				} else { // moving unbutton by itself
					this.commands.set(to.slice(0, -1), "Unbuttonpos", oldpos);
				}
			} else {
				this.commands.set(to, "Researchbuttonpos", oldpos);
			}
		}
	}

	if (this.active != RESEARCH || from == CANCEL) {
		if (from.slice(-1) != "_") {
			this.commands.set(from, "Buttonpos", newpos);

			if (oldunpos != "" && oldpos == oldunpos) {
				this.commands.set(from, "Unbuttonpos", newpos);
			}
		} else { // moving unbutton by itself
			this.commands.set(from.slice(0, -1), "Unbuttonpos", newpos);
		}
	} else {
		this.commands.set(from, "Researchbuttonpos", newpos);
	}

	this.clearButtons();
	this.unitEditor();
};

Editor.prototype.getConflicts = function(id) {
	let hotkeys = {}, researchhotkeys = {};
	let unit = data.units[id];

	if (unit == undefined) {
		return;
	}

	for (let id of this.getCommands(unit).keys()) {
		if (!this.commands.exists(id)) {
			continue;
		}

		let hotkey = this.commands.get(id, "Hotkey");
		let unhotkey = this.commands.get(id, "Unhotkey");
		let researchhotkey = this.commands.get(id, "Researchhotkey");

		// tracks research hotkeys separately
		recordHotkey(id, hotkey, hotkeys);
		recordHotkey(id, researchhotkey, researchhotkeys);

		if (unhotkey != "") {
			// counts unhotkey as hotkey if different (for two-state commands)
			if (hotkey != unhotkey) {
				recordHotkey(id, unhotkey, hotkeys);
			} else {
				let buttonpos = this.commands.get(id, "Buttonpos");
				let unbuttonpos = this.commands.get(id, "Unbuttonpos");

				// counts unhotkey separately if positions are different so
				// command can conflict with itself
				// (special case for "Call to Arms"/"Back to Work")
				if (unbuttonpos != "" && buttonpos != unbuttonpos) {
					recordHotkey(id + "_", unhotkey, hotkeys);
				}
			}
		}
	}

	// adds cancel button to hero select skills card for the purpose of
	// identifying conflicts with it
	if (Object.keys(researchhotkeys).length > 0) {
		let hotkey = this.commands.get(CANCEL, "Hotkey");
		recordHotkey(CANCEL, hotkey, researchhotkeys);
	}

	return {hotkeys, researchhotkeys};

	function recordHotkey(id, hotkey, keys) {
		for (let key of hotkey.split(DELIMITER)) {
			if (key == "") {
				continue;
			}

			if (keys[key] == undefined) {
				// using set to prevent duplicates so a hotkey cannot conflict
				// with itself
				keys[key] = new Set();
			}

			keys[key].add(id);
		}
	}
};

Editor.prototype.commandEditor = function() {
	if (!this.commands.exists(this.command)) {
		return;
	}

	let tip = this.commands.get(this.command, "Tip");
	let hotkey = this.commands.get(this.command, "Hotkey");
	let untip = this.commands.get(this.command, "Untip");
	let unhotkey = this.commands.get(this.command, "Unhotkey");
	let researchtip = this.commands.get(this.command, "Researchtip");
	let researchhotkey = this.commands.get(this.command, "Researchhotkey");
	let revivetip = this.commands.get(this.command, "Revivetip");
	let awakentip = this.commands.get(this.command, "Awakentip");

	this.formatTip("Tip", tip);
	this.formatTip("Untip", untip);
	this.formatTip("Researchtip", researchtip);
	this.formatTip("Revivetip", revivetip);
	this.formatTip("Awakentip", awakentip);

	this.formatHotkey("Hotkey", hotkey);
	this.formatHotkey("Unhotkey", unhotkey);
	this.formatHotkey("Researchhotkey", researchhotkey);

	if (hotkey != "" || researchhotkey != "") {
		// automatically selects first hotkey field
		let id = "Hotkey";

		if (this.active == STANDARD) {
			if (hotkey == "") { // passive abilities
				id = "Researchhotkey";
			} else if (!this.state && unhotkey != "") { // off state
				id = "Unhotkey";
			}
		} else {
			if (researchhotkey != "") { // research card except cancel button
				id = "Researchhotkey";
			}
		}

		$(`#${id} input`).focus();
	}

	let h3 = $("#command");
	h3.textContent = this.name + " (" + this.command + ")";
	h3.hidden = false;

	// omits basic commands
	$("#show").hidden = this.command.startsWith("cmd");

	$("#edit").hidden = true;
	$("#defaults").hidden = false;

	this.clear($("#other"));
};

Editor.prototype.formatTip = function(type, tip) {
	let element = $("#" + type);

	if (tip == "") { // hides empty element so it cannot be edited
		element.hidden = true;
		return;
	}

	// converts from hotkey file format to HTML
	tip = tip.replace(/&/g, "&amp;");
	tip = tip.replace(/</g, "&lt;");
	tip = tip.replace(/>/g, "&gt;");
	tip = tip.replace(/\|cffffcc00([^|]+)\|r/gi, '<span class="key">$1</span>');
	tip = tip.replace(/\|cffc3dbff([^|]+)\|r/gi, '<span class="sub">$1</span>');
	tip = tip.replace(
		/\|c([[0-9a-f]{2})([[0-9a-f]{6})([^|]+)\|r/gi,
		'<span style="color:#$2;">$3</span>'
	); // handles all other colors

	// splits string by comma unless comma is within quotes
	let tips = tip.split(PATTERN).map(function(tip) {
		return tip.replace(/"/g, ""); // removes quotes
	});

	tip = tips.join("<br>");

	element.hidden = false;
	element.innerHTML = tip;
};

Editor.prototype.focusTip = function(type) {
	let element = $("#" + type);
	let tip = element.innerHTML;

	// converts from HTML to editing format
	tip = tip.replace(/&amp;/g, "&");
	tip = tip.replace(/&lt;/g, "<");
	tip = tip.replace(/&gt;/g, ">");
	tip = tip.replace(/<span class="key">([^<]+)<\/span>/g, "*$1*");
	tip = tip.replace(/<span class="sub">([^<]+)<\/span>/g, "^$1^");
	tip = tip.replace(
		/<span style="color:#([[0-9a-f]{6});">([^<]+)<\/span>/gi,
		"|cff$1$2|r"
	); // opacity value is not used by game

	element.innerHTML = tip;
};

Editor.prototype.editTip = function(type) {
	let element = $("#" + type);

	let tips = element.innerHTML.split("<br>").map(function(tip) {
		// converts from editing format to hotkey file format
		tip = tip.replace(/&amp;/g, "&");
		tip = tip.replace(/&lt;/g, "<");
		tip = tip.replace(/&gt;/g, ">");
		tip = tip.replace(/"/g, ""); // removes quotes
		tip = tip.replace(/\*([^*]+)\*/g, "|cffffcc00$1|r");
		tip = tip.replace(/\^([^^]+)\^/g, "|cffc3dbff$1|r");

		// quotes strings containing a comma
		if (tip.includes(DELIMITER)) {
			tip = '"' + tip + '"';
		}

		return tip;
	});
	tips = tips.filter(function(tip) {
		return tip != ""; // removes blank lines
	});

	let tip = tips.join(DELIMITER);

	if (tip == "") { // restores blank tip to previous value
		tip = this.commands.get(this.command, type);
	}

	this.formatTip(type, tip);
	this.commands.set(this.command, type, tip);
};

Editor.prototype.autoSetTip = function(type, fields) {
	// converts hotkey key to equivalent tip key (if available)
	if (type == "Hotkey") {
		type = "Tip";
	} else if (type == "Unhotkey") {
		type = "Untip";
	} else if (type == "Researchhotkey") {
		type = "Researchtip";
	}

	if (!this.commands.exists(this.command, type)) {
		return;
	}

	// handles patterns with hotkey at start (common with many user files)
	// or at end (Blizzard's convention), depending on user preference
	let start = this.options.read("end") == START;
	let replace = "", k = 0;

	let startPattern = /^\(\|cffffcc00(ESC|\w)\|r\) /g;
	let endPattern = / \(\|cffffcc00(ESC|\w)\|r\)$/g;

	// the user-selected pattern
	let pattern = start ? startPattern : endPattern;
	// the non-selected pattern
	let otherPattern = start ? endPattern : startPattern;

	// splits string by comma unless comma is within quotes
	let tips = this.commands.get(this.command, type).split(PATTERN);
	tips = tips.map(function(tip, i) {
		tip = tip.replace(/"/g, ""); // removes quotes

		if (tip.startsWith("|cffc3dbff")) {
			return tip; // skips hint lines
		}

		// if there are multiple fields,
		// set each line to a different hotkey (e.g., weapon/armor upgrades),
		// otherwise set all lines to the same hotkey (e.g., hero abilities)
		k = fields.length > 1 ? i : 0;

		if (fields[k] == "512") {
			fields[k] = "ESC";
		}

		replace = "(|cffffcc00" + fields[k].toUpperCase() + "|r)";

		if (start) {
			replace += " ";
		} else {
			replace = " " + replace;
		}

		// handles tips already in the desired format
		if (tip.match(pattern)) {
			tip = tip.replace(pattern, replace);
		} else {
			// removes hotkey in opposite (start/end) pattern
			if (tip.match(otherPattern)) {
				tip = tip.replace(otherPattern, "");
			}

			// removes existing highlighting (matches letters and numbers
			// but not whitespace to avoid matching "Level \d")
			tip = tip.replace(/\|cffffcc00(\w+)\|r/gi, "$1");

			if (start) {
				tip = replace + tip;
			} else {
				tip += replace;
			}
		}

		if (tip.includes(DELIMITER)) { // quotes strings containing a comma
			tip = '"' + tip + '"';
		}

		return tip;
	});

	let tip = tips.join(DELIMITER);

	this.commands.set(this.command, type, tip);
	this.formatTip(type, tip);
};

Editor.prototype.formatHotkey = function(type, hotkey) {
	let p = document.createElement("p");
	p.id = type;
	p.classList.add("hotkey");

	let element = $("#" + type);

	if (hotkey == "") { // hides field if empty
		element.replaceWith(p);
		element.hidden = true;
		return;
	}

	if (hotkey == "512") {
		hotkey = "\u238b"; // escape symbol (for display)
	}

	let label = document.createElement("label");
	label.textContent = type + ": ";

	// handles multi-tier hotkeys (e.g., weapon/armor upgrades)
	for (let key of hotkey.split(DELIMITER)) {
		let input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("value", key);
		label.appendChild(input);
	}

	p.appendChild(label);

	// appends "Set to Esc" button for cancel buttons
	if (this.command.startsWith(CANCEL)) {
		let button = document.createElement("button");
		button.className = "esc";
		button.value = type;
		button.setAttribute("type", "button");
		button.appendChild(document.createTextNode("Set to Esc"));
		p.appendChild(button);
	}

	element.hidden = false;
	element.replaceWith(p);
};

Editor.prototype.editHotkey = function(input, type, event) {
	let keyCode = event.keyCode;

	// ignores non-letter characters
	if (keyCode < 65 || keyCode > 90) {
		return;
	}

	let key = String.fromCharCode(keyCode);
	input.value = key;

	let buttonpos = this.commands.get(this.command, "Buttonpos");
	let unbuttonpos = this.commands.get(this.command, "Unbuttonpos");
	let samePositions = unbuttonpos == "" || buttonpos == unbuttonpos;

	// sets all hotkeys together if "spirit link" option selected
	// unless button and unbutton are in different positions (prevents conflict)
	if (samePositions && this.options.read("spiritlink")) {
		this.setHotkey("Hotkey", key);
		this.setHotkey("Unhotkey", key);
		this.setHotkey("Researchhotkey", key);
	} else {
		// does not send input value in this case in order to properly handle
		// commands with multiple inputs (e.g., weapon/armor upgrades)
		this.setHotkey(type);
	}

	this.setVisibleHotkeys();
	this.checkAllConflicts();
};

Editor.prototype.setHotkey = function(type, hotkey="") {
	if (!this.commands.exists(this.command, type)) {
		return;
	}

	let fields = [];

	for (let element of $$(`#${type} input`)) {
		if (hotkey != "") {
			// sets hotkey to the optional function parameter value;
			// (spirit-linking is on or setting the "Esc" key)
			fields.push(hotkey);
			element.value = hotkey;
		} else {
			// uses input field value (spirit-linking is off)
			fields.push(element.value);
		}
	}

	this.commands.set(this.command, type, fields.join(DELIMITER).toUpperCase());

	if (this.options.read("tooltips")) {
		this.autoSetTip(type, fields);
		this.autoSetTip("Awakentip", fields);
		this.autoSetTip("Revivetip", fields);
	}
};

Editor.prototype.resetDefaults = function() {
	this.commands.clear(this.command);

	let build = this.convertBuildCommand(this.command);

	if (this.command != build) { // resets button position for build icons
		this.commands.clear(build);
	}

	this.clearButtons();
	this.clearFields();
	this.unitEditor();
};

Editor.prototype.setVisibleHotkeys = function() {
	for (let n of this.card.keys()) {
		for (let y of this.card[n].keys()) {
			for (let x of this.card[n][y].keys()) {
				let id = this.card[n][y][x];

				// identifies separate unbuttonpos
				let state = id.slice(-1) != "_";

				if (!state) {
					id = id.slice(0, -1);
				}

				if (!this.commands.exists(id)) {
					continue;
				}

				let span = null, hotkey = "";

				if (state) {
					span = $("#span" + n + "_" + id);
					hotkey = this.commands.get(id, "Hotkey");
				} else {
					span = $("#span" + n + "_" + id + "_");
					hotkey = this.commands.get(id, "Unhotkey");
				}

				let researchhotkey = this.commands.get(id, "Researchhotkey");

				// shows "Hotkey" if available and standard card selected,
				// else shows "Researchhotkey" (for passives or research card)
				if (hotkey != "" && (n != RESEARCH || id == CANCEL)) {
					if (hotkey == "512") {
						span.textContent = "Esc";
					} else { // only show first letter (even if multi-tiered)
						span.textContent = hotkey.slice(0, 1);
					}
				} else if (researchhotkey != "") {
					let state = n != RESEARCH && hotkey == "";
					span.textContent = researchhotkey.slice(0, 1);
					span.classList.toggle("passive", state);
				}
			}
		}
	}

	// tracks conflicts outside of flag functions so conflicts can be detected
	// in two-state commands and across different hotkey types,
	// else class will be toggled an unpredictable amount
	let conflicts = Array(CARDS).fill().map(function() {
		return [];
	});

	let keys = this.getConflicts(this.unit);
	flagHotkeys(STANDARD, keys.hotkeys);
	flagHotkeys(STANDARD, keys.researchhotkeys);

	if (data.units[this.unit] != undefined) { // handles secondary command cards
		if (data.units[this.unit].type == HERO) {
			flagHotkeys(RESEARCH, keys.hotkeys);
			flagHotkeys(RESEARCH, keys.researchhotkeys);
		}

		if (data.units[this.unit].build != undefined) {
			let keys = this.getConflicts(data.units[this.unit].build);
			flagHotkeys(BUILD, keys.hotkeys);
		}
	}

	function flagHotkeys(n, hotkeys) {
		for (let values of Object.values(hotkeys)) {
			for (let value of values) {
				let conflict = values.size > 1;
				let span = $("#span" + n + "_" + value);

				if (span != null && !conflicts[n].includes(value)) {
					span.classList.toggle("conflict", conflict);

					let unspan = $("#span" + n + "_" + value + "_");

					if (unspan != null) {
						unspan.classList.toggle("conflict", conflict);
					}
				}

				if (conflict) {
					conflicts[n].push(value);
				}
			}
		}
	}
};

Editor.prototype.checkConflicts = function(unit) {
	if (data.units[unit] != undefined) {
		for (let hotkeys of Object.values(this.getConflicts(unit))) {
			for (let values of Object.values(hotkeys)) {
				if (values.size > 1) {
					return true;
				}
			}
		}

		if (data.units[unit].build != undefined) {
			return this.checkConflicts(data.units[unit].build);
		}
	}

	return false;
};

Editor.prototype.checkAllConflicts = function() {
	for (let element of $$("section a")) {
		if (element.hash == "") {
			continue;
		}

		let unit = element.hash.replace("#", "");
		element.classList.toggle("conflict", this.checkConflicts(unit));
	}
};

Editor.prototype.filter = function(race) {
	race = this.convertRace(race);

	// hides unit lists for races other than selected
	for (let element of $$("section")) {
		element.hidden = element.id != "units_" + race;
	}
};

Editor.prototype.convertBuildCommand = function(id) {
	if (id == "cmdbuildhuman") {
		id = "ahbu";
	} else if (id == "cmdbuildorc") {
		id = "aobu";
	} else if (id == "cmdbuildnightelf") {
		id = "aebu";
	} else if (id == "cmdbuildundead") {
		id = "aubu";
	} else if (id == "cmdbuildnaga") {
		id = "agbu";
	}

	return id;
};

Editor.prototype.convertRace = function(race) {
	// converts campaign races to multiplayer equivalents
	if (race == BLOOD_ELF) {
		race = HUMAN;
	} else if (race == DRAENEI) {
		race = ORC;
	} else if (race == DEMON) {
		race = UNDEAD;
	} else if (race == NAGA) {
		race = NIGHT_ELF;
	}

	return race;
};

Editor.prototype.findUnitsNamed = function(query) {
	query = query.toLowerCase().trim();

	// minimum three characters to search to prevent huge result lists
	if (query.length < 3) {
		this.clearSearch();
		return;
	}

	let matches = new Set(), filters = new Set();

	query = query.toLowerCase();

	for (let [unit, properties] of Object.entries(data.units)) {
		if (properties.type == OTHER || properties.name == undefined) {
			continue;
		}

		let name = properties.name.toLowerCase();
		// replaces curly quotes
		name = name.replace(/[‘’]/g, "'");
		name = name.replace(/[“”]/g, "\"");

		if (name.indexOf(query) != -1) {
			matches.add(unit);
			filters.add(properties.race);
		}
	}

	if (matches.size > 0) {
		this.matches = Array.from(matches);

		this.formatResults("results", matches);
		this.dimFilters(filters);
	} else {
		this.clearSearch();
	}
};

Editor.prototype.findUnitsWith = function(command) {
	let matches = new Set();

	for (let [unit, properties] of Object.entries(data.units)) {
		if (properties.commands == undefined) {
			continue;
		}

		let commands = new Map(properties.commands);

		if (commands.has(command)) {
			matches.add(unit);
		}
	}

	$("#command").hidden = false;

	this.clearFields();
	this.formatResults("other", matches);

	$("#show").hidden = true;
	$("#edit").hidden = false;
	$("#defaults").hidden = true;
};

Editor.prototype.formatResults = function(id, matches) {
	let ul = document.createElement("ul");
	ul.id = id;

	for (let match of matches) {
		let unit = data.units[match];

		let li = document.createElement("li");
		let img = document.createElement("img");
		img.setAttribute("src", this.getIcon(match));
		img.setAttribute("alt", "[" + unit.name + "]");
		img.setAttribute("title", unit.name);

		let a = document.createElement("a");
		a.href = "#" + match;
		a.appendChild(document.createTextNode(unit.name));
		a.classList.toggle("conflict", this.checkConflicts(match));

		// special case for currently selected unit (which will not fire
		// hashchange event)
		if (this.unit == match) {
			a.classList.add("clear");
		}

		if (unit.suffix != undefined) {
			a.textContent += " (" + unit.suffix + ")";
		}

		li.appendChild(img);
		li.appendChild(a);
		ul.appendChild(li);
	}

	$("#" + id).replaceWith(ul);
};

Editor.prototype.selectResult = function(dir) {
	let results = $$("#results li");

	if (dir) { // up arrow
		if (this.selected < 0) {
			// loops back around to bottom
			this.selected = results.length - 1;
		} else {
			this.selected--;
		}
	} else { // down arrow
		if (this.selected >= results.length - 1) {
			// loops back around to top
			this.selected = -1;
		} else {
			this.selected++;
		}
	}

	this.highlightResult();
};

Editor.prototype.highlightResult = function() {
	for (let [i, result] of $$("#results li").entries()) {
		if (this.selected == i) {
			result.classList.add("selected");
			result.scrollIntoView(); // for long lists with scrollbars
			this.highlightFilter(i);
		} else {
			if (this.selected < 0) {
				for (let element of $$(".filter")) {
					element.classList.remove("highlight");
				}
			}

			result.classList.remove("selected");
		}
	}
};

Editor.prototype.openResult = function() {
	let results = $$("#results a");

	// ignores invalid array indices
	if (this.selected < 0 || this.selected >= results.length) {
		return;
	}

	results[this.selected].click();
};

Editor.prototype.dimFilters = function(filters) {
	filters = Array.from(filters).map(this.convertRace);

	for (let element of $$(".filter")) {
		element.classList.toggle("exclude", !filters.includes(element.value));
	}
};

Editor.prototype.highlightFilter = function(n) {
	let unit = this.matches[n];
	let race = this.convertRace(data.units[unit].race);

	for (let element of $$(".filter")) {
		element.classList.toggle("highlight", element.value == race);
	}
};

Editor.prototype.clear = function(element, removeListeners=true) {
	if (element == null) {
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

Editor.prototype.clearButtons = function() {
	for (let element of $$(".card div")) {
		this.clear(element);
	}

	for (let n of this.card.keys()) {
		for (let y of this.card[n].keys()) {
			for (let x of this.card[n][y].keys()) {
				this.card[n][y][x] = "";
			}
		}
	}
};

Editor.prototype.clearFields = function() {
	for (let element of $$("#fields p, #fields ul")) {
		// hides element so it does not remain editable
		element.hidden = true;

		// removes event listeners for hotkey inputs (which are removed and
		// recreated) but not tips (which are persistent)
		this.clear(element, !element.classList.contains("tip"));
	}

	$("#show").hidden = true;
	$("#edit").hidden = true;
	$("#defaults").hidden = true;
};

Editor.prototype.clearSearch = function(clearQuery=false) {
	if (clearQuery) {
		$("#query").value = "";
	}

	this.matches = [];
	this.selected = -1;

	this.clear($("#results"));
	$("#results").hidden = true;

	for (let element of $$(".filter")) {
		element.classList.remove("exclude", "highlight");
	}
};

/*
 * Commands prototype
 */

function Commands() {
	this.list = {};
	this.defaults = null;
}

Commands.prototype.load = function(list) {
	if (this.defaults == null) {
		this.defaults = list;
	} else {
		this.list = list;
	}
};

// converts from hotkey file format to object
Commands.prototype.parse = function(text) {
	let list = {}, block = {}, id = "", key = "", value = "";

	let lines = text.split("\n");
	let pattern = /^(\w+)=(.+)$/; // pattern for key=value pairs, skips comments

	// ensures empty line at end of file so final command block is saved
	lines.push("");

	for (let [i, line] of lines.entries()) {
		// adds command block to object whenever new command block is found
		// or at end of file (for the last command block)
		if (lines.length == i + 1 || line.match(/^\[(\w+)\]$/)) {
			if (id != "") {
				id = id.toLowerCase();

				// if a command has multiple blocks, only first is used
				// (same behavior as game)
				if (list[id] == undefined) {
					list[id] = block;
				} else {
					console.warn(`Duplicate: ${id}`);
				}

				block = {};
			}

			id = line.slice(1, -1);
		}

		// matches key=value pairs
		if (line.match(pattern)) {
			key = line.replace(pattern, "$1");
			value = line.replace(pattern, "$2");
			block[key] = value;
		}
	}

	this.load(list);
};

// converts from object to hotkey file format
Commands.prototype.convert = function() {
	let text = Object.keys(this.list).reduce(function(text, id) {
		text += "\n[" + id + "]\n";

		text = Object.keys(this.list[id]).reduce(function(text, key) {
			return text + key + "=" + this.list[id][key] + "\n";
		}.bind(this), text);

		return text;
	}.bind(this), "");

	return text.trim();
};

Commands.prototype.exists = function(id, key) {
	if (this.defaults == null || this.defaults[id] == undefined) {
		return;
	}

	if (key != undefined && this.defaults[id][key] == undefined) {
		return;
	}

	return true;
};

Commands.prototype.get = function(id, key) {
	if (this.list[id] != undefined && this.list[id][key] != undefined) {
		return this.list[id][key];
	}

	if (this.exists(id, key)) {
		return this.defaults[id][key];
	}

	return "";
};

Commands.prototype.set = function(id, key, value) {
	if (this.exists(id, key) && this.defaults[id][key] == value) {
		// removes user hotkey if same as default (to avoid redundant entries)
		if (this.list[id] != undefined && this.list[id][key] != undefined) {
			delete this.list[id][key];

			if (Object.keys(this.list[id]).length == 0) {
				delete this.list[id];
			}
		}
	} else {
		if (this.list[id] == undefined && id.match(/^\w+$/)) {
			this.list[id] = {};
		}

		this.list[id][key] = value;
	}
};

Commands.prototype.clear = function(id) {
	delete this.list[id];
};

Commands.prototype.reset = function() {
	this.load({});
};

/*
 * Overlay prototype
 */

function Overlay(id) {
	this.element = $("#overlay_" + id);
	this.textarea = $("#text_" + id);
}

Overlay.prototype.show = function() {
	this.element.classList.add("open");
	this.focus();
};

Overlay.prototype.hide = function() {
	this.element.classList.remove("open");
};

Overlay.prototype.getText = function() {
	return this.textarea.value;
};

Overlay.prototype.setText = function(text) {
	this.textarea.value = text;
};

Overlay.prototype.focus = function() {
	this.textarea.focus();
	this.textarea.setSelectionRange(0, 0);
};

Overlay.prototype.select = function() {
	this.textarea.select();
};

/*
 * Options prototype
 */

function Options() {
	this.values = {};
	this.defaults = DEFAULT_OPTIONS;
}

Options.prototype.load = function(list) {
	let options = list[OPTIONS_SECTION] || {};

	for (let [key, value] of Object.entries(options)) {
		let lowercase = key.toLowerCase();
		options[lowercase] = value;
		delete options[key];
	}

	this.values = options;
	this.setElements();
};

Options.prototype.save = function(list) {
	let options = this.getValues();

	for (let [key, value] of Object.entries(options)) {
		// saves options only if different from default values
		if (this.defaults[key] != value) {
			let capitalized = key.charAt(0).toUpperCase() + key.slice(1);
			options[capitalized] = value;
		}

		delete options[key];
	}

	if (Object.keys(options).length > 0) {
		list[OPTIONS_SECTION] = options;
	} else { // deletes section if empty
		delete list[OPTIONS_SECTION];
	}

	return list;
};

Options.prototype.getValues = function() {
	let options = {};

	for (let element of $$(".option")) {
		if (element.type == "checkbox") { // checkboxes
			options[element.id] = element.checked;
		} else if (element.type == "radio") { // radio buttons
			if (element.checked) {
				options[element.name] = element.value;
			}
		}
	}

	return options;
};

Options.prototype.setElements = function() {
	for (let [key, value] of Object.entries(this.defaults)) {
		if (value == undefined) {
			continue;
		}

		if (typeof value == "boolean") { // checkboxes
			let element = $("#" + key);

			if (element != undefined) {
				element.checked = Boolean(this.read(key));
			}
		} else if (typeof value == "string") { // radio buttons
			for (let element of document.getElementsByName(key)) {
				element.checked = element.value == this.read(key);
			}
		}
	}
};

Options.prototype.read = function(key) {
	if (this.values[key] != undefined) {
		return this.values[key];
	}

	return this.defaults[key];
};

Options.prototype.reload = function(list) {
	this.load(this.save(list));
};

Options.prototype.reset = function() {
	this.values = Object.assign({}, this.defaults); // copies default values
	this.setElements();
};

/*
 * Storage prototype
 */

function Storage(name) {
	this.name = name;
}

Storage.prototype.load = function() {
	try {
		let contents = localStorage.getItem(this.name);

		if (contents != null) {
			return JSON.parse(contents);
		}
	} catch (err) {
		console.error(err);
		this.reset();
		return null;
	}
};

Storage.prototype.save = function(list) {
	try {
		if (Object.keys(list).length != 0) {
			localStorage.setItem(this.name, JSON.stringify(list));
		} else {
			this.reset();
		}
	} catch (err) {
		console.error(err);
	}
};

Storage.prototype.reset = function() {
	try {
		localStorage.removeItem(this.name);
	} catch (err) {
		console.error(err);
	}
};