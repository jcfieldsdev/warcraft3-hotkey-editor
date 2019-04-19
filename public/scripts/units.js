"use strict";

const NEUTRAL="neutral";
const HUMAN="human";
const ORC="orc";
const UNDEAD="undead";
const NIGHTELF="nightelf";
const BLOODELF="bloodelf";
const DRAENEI="draenei";
const DEMON="demon";
const NAGA="naga";

const OTHER=0;
const UNIT=1;
const HERO=2;
const NOATTACK=3;
const BUILDING=4;
const SUMMON=5;
const TOWER=6;

const common={
	basic: {
		cmdmove: "Move",
		cmdstop: "Stop",
		cmdholdpos: "Hold Position",
		cmdattack: "Attack",
		cmdpatrol: "Patrol"
	},
	hero: {
		cmdselectskill: "Hero Abilities"
	},
	noattack: {
		cmdmove: "Move",
		cmdstop: "Stop",
		cmdholdpos: "Hold Position",
		cmdpatrol: "Patrol"
	},
	tower: {
		cmdstop: "Stop",
		cmdattack: "Attack"
	}
};

const units={
	hpal: {
		name: "Paladin",
		race: HUMAN,
		type: HERO,
		commands: {
			ahhb: "Holy Light",
			ahds: "Divine Shield",
			ahre: "Resurrection",
			ahad: "Devotion Aura"
		}
	},
	hamg: {
		name: "Archmage",
		race: HUMAN,
		type: HERO,
		commands: {
			ahbz: "Blizzard",
			ahab: "Brilliance Aura",
			ahwe: "Summon Water Elemental",
			ahmt: "Mass Teleport"
		}
	},
	hmkg: {
		name: "Mountain King",
		race: HUMAN,
		type: HERO,
		commands: {
			ahtc: "Thunder Clap",
			ahtb: "Storm Bolt",
			ahbh: "Bash",
			ahav: "Avatar"
		}
	},
	hblm: {
		name: "Blood Mage",
		race: HUMAN,
		type: HERO,
		commands: {
			ahfs: "Flame Strike",
			ahbn: "Banish",
			ahdr: "Siphon Mana",
			ahpx: "Phoenix"
		}
	},
	hpea: {
		name: "Peasant",
		race: HUMAN,
		type: UNIT,
		commands: {
			ahar: "Gather",
			ahrp: "Repair",
			amil: "Call to Arms",
			cmdbuildhuman: "Build Structure",
			cmdcancelbuild: "Cancel"
		}
	},
	cmdbuildhuman: {
		name: "Build Structure",
		race: HUMAN,
		type: OTHER,
		commands: {
			htow: "Build Town Hall",
			hbar: "Build Barracks",
			hlum: "Build Lumber Mill",
			hbla: "Build Blacksmith",
			hhou: "Build Farm",
			halt: "Build Altar of Kings",
			hars: "Build Arcane Sanctum",
			harm: "Build Workshop",
			hwtw: "Build Scout Tower",
			hgra: "Build Gryphon Aviary",
			hvlt: "Build Arcane Vault",
			cmdcancel: "Cancel"
		}
	},
	hmil: {
		name: "Militia",
		race: HUMAN,
		type: UNIT,
		commands: {
			amil: "Back to Work"
		}
	},
	hfoo: {
		name: "Footman",
		race: HUMAN,
		type: UNIT,
		commands: {
			adef: "Defend"
		}
	},
	hrif: {
		name: "Rifleman",
		race: HUMAN,
		type: UNIT
	},
	hkni: {
		name: "Knight",
		race: HUMAN,
		type: UNIT
	},
	hmpr: {
		name: "Priest",
		race: HUMAN,
		type: UNIT,
		commands: {
			ahea: "Heal",
			ainf: "Inner Fire",
			adis: "Dispel Magic"
		}
	},
	hsor: {
		name: "Sorceress",
		race: HUMAN,
		type: UNIT,
		commands: {
			aivs: "Invisibility",
			aply: "Polymorph",
			aslo: "Slow"
		}
	},
	hspt: {
		name: "Spell Breaker",
		race: HUMAN,
		type: UNIT,
		commands: {
			asps: "Spell Steal",
			acmg: "Control Magic",
			amim: "Spell Immunity",
			afbk: "Feedback"
		}
	},
	hgyr: {
		name: "Flying Machine",
		race: HUMAN,
		type: UNIT,
		commands: {
			agyb: "Flying Machine Bombs",
			agyv: "True Sight",
			aflk: "Flak Cannons"
		}
	},
	hmtm: {
		name: "Mortar Team",
		race: HUMAN,
		type: UNIT,
		commands: {
			cmdattackground: "Attack Ground",
			afla: "Flare",
			afsh: "Fragmentation Shards"
		}
	},
	hmtt: {
		name: "Siege Engine",
		race: HUMAN,
		type: UNIT,
		commands: {
			aroc: "Barrage"
		}
	},
	hrtt: {
		name: "Siege Engine",
		suffix: "with Barrage",
		race: HUMAN,
		type: UNIT,
		commands: {
			aroc: "Barrage"
		}
	},
	hgry: {
		name: "Gryphon Rider",
		race: HUMAN,
		type: UNIT,
		commands: {
			asth: "Storm Hammers"
		}
	},
	hdhw: {
		name: "Dragonhawk Rider",
		race: HUMAN,
		type: UNIT,
		commands: {
			aclf: "Cloud",
			amls: "Aerial Shackles"
		}
	},
	htow: {
		name: "Town Hall",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hpea: "Train Peasant",
			rhpm: "Research Backpack",
			cmdrally: "Set Rally Point",
			hkee: "Upgrade to Keep",
			amic: "Call to Arms",
			cmdcancelbuild: "Cancel"
		}
	},
	hkee: {
		name: "Keep",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hpea: "Train Peasant",
			rhpm: "Research Backpack",
			cmdrally: "Set Rally Point",
			hcas: "Upgrade to Keep",
			amic: "Call to Arms",
			cmdcancelbuild: "Cancel"
		}
	},
	hcas: {
		name: "Castle",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hpea: "Train Peasant",
			rhpm: "Research Backpack",
			cmdrally: "Set Rally Point",
			amic: "Call to Arms",
			cmdcancelbuild: "Cancel"
		}
	},
	hbar: {
		name: "Barracks",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hfoo: "Train Footman",
			hrif: "Train Rifleman",
			hkni: "Train Knight",
			cmdrally: "Set Rally Point",
			rhde: "Research Defend",
			rhri: "Research Long Rifles",
			rhan: "Research Animal War Training",
			cmdcancelbuild: "Cancel"
		}
	},
	hlum: {
		name: "Lumber Mill",
		race: HUMAN,
		type: BUILDING,
		commands: {
			rhac: "Upgrade Masonry",
			rhlh: "Upgrade Lumber Harvesting",
			cmdcancelbuild: "Cancel"
		}
	},
	hbla: {
		name: "Blacksmith",
		race: HUMAN,
		type: BUILDING,
		commands: {
			rhme: "Upgrade Forged Swords",
			rhar: "Upgrade Plating",
			rhla: "Upgrade Leather Armor",
			rhra: "Upgrade Gunpowder",
			cmdcancelbuild: "Cancel"
		}
	},
	hhou: {
		name: "Farm",
		race: HUMAN,
		type: BUILDING
	},
	halt: {
		name: "Altar of Kings",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hamg: "Summon Archmage",
			hmkg: "Summon Mountain King",
			hpal: "Summon Paladin",
			hblm: "Summon Blood Mage",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	halt2: {
		name: "Altar of Kings",
		suffix: "Campaign",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hart: "Arthas",
			harf: "Arthas (wielding Frostmourne)",
			hjai: "Jaina",
			hmbr: "Muradin Bronzebeard",
			hkal: "Kael",
			hlgr: "Lord Garithos",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	hars: {
		name: "Arcane Sanctum",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hmpr: "Train Priest",
			hsor: "Train Sorceress",
			hspt: "Train Spell Breaker",
			rhpt: "Priest Training",
			rhst: "Sorceress Training",
			rhse: "Research Magic Sentry",
			rhss: "Research Control Magic",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	harm: {
		name: "Workshop",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hgyr: "Train Flying Machine",
			hmtm: "Train Mortar Team",
			hmtt: "Train Siege Engine",
			rhgb: "Research Flying Machine Bombs",
			rhfl: "Research Flare",
			rhrt: "Research Barrage",
			rhfc: "Research Flak Cannons",
			rhfs: "Research Fragmentation Shards",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	harm2: {
		name: "Workshop",
		suffix: "with Barrage Tank",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hgyr: "Train Flying Machine",
			hmtm: "Train Mortar Team",
			hrtt: "Train Siege Engine (with Barrage)",
			rhgb: "Research Flying Machine Bombs",
			rhfs: "Research Fragmentation Shards",
			rhfc: "Research Flak Cannons",
			rhfl: "Research Flare",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	hwtw: {
		name: "Scout Tower",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hgtw: "Upgrade to Guard Tower",
			hctw: "Upgrade to Cannon Tower",
			hatw: "Upgrade to Arcane Tower",
			adts: "Magic Sentry",
			cmdcancelbuild: "Cancel"
		}
	},
	hgtw: {
		name: "Guard Tower",
		race: HUMAN,
		type: TOWER,
		commands: {
			adts: "Magic Sentry"
		}
	},
	hctw: {
		name: "Cannon Tower",
		race: HUMAN,
		type: TOWER,
		commands: {
			cmdattackground: "Attack Ground",
			adts: "Magic Sentry",
			afsh: "Fragmentation Shards"
		}
	},
	hatw: {
		name: "Arcane Tower",
		race: HUMAN,
		type: TOWER,
		commands: {
			adts: "Magic Sentry",
			ahta: "Reveal",
			afbt: "Feedback"
		}
	},
	hgra: {
		name: "Gryphon Aviary",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hgry: "Train Gryphon Rider",
			hdhw: "Train Dragonhawk Rider",
			rhhb: "Research Storm Hammers",
			rhcd: "Research Cloud",
			cmdcancelbuild: "Cancel"
		}
	},
	hvlt: {
		name: "Arcane Vault",
		race: HUMAN,
		type: BUILDING,
		commands: {
			sreg: "Purchase Scroll of Regeneration",
			mcri: "Purchase Mechanical Critter",
			plcl: "Purchase Lesser Clarity Potion",
			phea: "Purchase Potion of Healing",
			pman: "Purchase Potion of Mana",
			stwp: "Purchase Scroll of Town Portal",
			tsct: "Purchase Ivory Tower",
			ofir: "Purchase Orb of Fire",
			ssan: "Purchase Staff of Sanctuary",
			anei: "Select User"
		}
	},
	hshy: {
		name: "Human Shipyard",
		race: HUMAN,
		type: BUILDING,
		commands: {
			hbot: "Hire Transport Ship",
			hdes: "Hire Frigate",
			hbsh: "Hire Battleship",
			ane2: "Select User"
		}
	},
	hbot: {
		name: "Human Transport Ship",
		race: HUMAN,
		type: NOATTACK,
		commands: {
			slo3: "Load",
			sdro: "Unload"
		}
	},
	hdes: {
		name: "Human Frigate",
		race: HUMAN,
		type: UNIT
	},
	hbsh: {
		name: "Human Battleship",
		race: HUMAN,
		type: UNIT
	},
	hwat: {
		name: "Water Elemental",
		suffix: "Level 1",
		race: HUMAN,
		type: SUMMON
	},
	hwt2: {
		name: "Water Elemental",
		suffix: "Level 2",
		race: HUMAN,
		type: SUMMON
	},
	hwt3: {
		name: "Water Elemental",
		suffix: "Level 3",
		race: HUMAN,
		type: SUMMON
	},
	hphx: {
		name: "Phoenix",
		race: HUMAN,
		type: SUMMON,
		commands: {
			acmi: "Spell Immunity",
			acrk: "Resistant Skin"
		}
	},
	hcth: {
		name: "Captain",
		race: HUMAN,
		type: UNIT,
		commands: {
			adef: "Defend"
		}
	},
	nmed: {
		name: "Medivh",
		race: HUMAN,
		type: UNIT,
		commands: {
			amrf: "Raven Form"
		}
	},
	nmdm: {
		name: "Medivh",
		suffix: "Raven Form",
		race: HUMAN,
		type: UNIT,
		commands: {
			amrf: "Raven Form"
		}
	},
	nemi: {
		name: "Emissary",
		race: HUMAN,
		type: UNIT,
		commands: {
			ahea: "Heal",
			ainf: "Inner Fire",
			adis: "Dispel Magic"
		}
	},
	nchp: {
		name: "Chaplain",
		race: HUMAN,
		type: UNIT,
		commands: {
			anh2: "Heal",
			acif: "Inner Fire",
			adsm: "Dispel Magic"
		}
	},
	nhym: {
		name: "Hydromancer",
		race: HUMAN,
		type: UNIT,
		commands: {
			acsw: "Slow",
			acpy: "Polymorph",
			acc3: "Crushing Wave"
		}
	},
	hart: {
		name: "Arthas",
		race: HUMAN,
		type: HERO,
		commands: {
			ahhb: "Holy Light",
			ahds: "Divine Shield",
			ahre: "Resurrection",
			ahad: "Devotion Aura"
		}
	},
	harf: {
		name: "Arthas",
		suffix: "wielding Frostmourne",
		race: HUMAN,
		type: HERO,
		commands: {
			ahhb: "Holy Light",
			ahds: "Divine Shield",
			ahre: "Resurrection",
			ahad: "Devotion Aura"
		}
	},
	hjai: {
		name: "Jaina",
		race: HUMAN,
		type: HERO,
		commands: {
			ahbz: "Blizzard",
			ahab: "Brilliance Aura",
			ahwe: "Summon Water Elemental",
			ahmt: "Mass Teleport"
		}
	},
	hmbr: {
		name: "Muradin Bronzebeard",
		race: HUMAN,
		type: HERO,
		commands: {
			ahtc: "Thunder Clap",
			ahtb: "Storm Bolt",
			ahbh: "Bash",
			ahav: "Avatar"
		}
	},
	hkal: {
		name: "Kael",
		race: HUMAN,
		type: HERO,
		commands: {
			ahfs: "Flame Strike",
			ahbn: "Banish",
			ahdr: "Siphon Mana",
			ahpx: "Phoenix"
		}
	},
	hvwd: {
		name: "Sylvanas Windrunner",
		race: HUMAN,
		type: HERO,
		commands: {
			ahca: "Cold Arrows",
			aest: "Scout",
			aear: "Trueshot Aura",
			aesf: "Starfall"
		}
	},
	hlgr: {
		name: "Lord Garithos",
		race: HUMAN,
		type: HERO,
		commands: {
			ansh: "Shockwave",
			ahhb: "Holy Light",
			ahad: "Devotion Aura",
			anav: "Avatar"
		}
	},
	huth: {
		name: "Uther",
		race: HUMAN,
		type: HERO,
		commands: {
			ahhb: "Holy Light",
			ahds: "Divine Shield",
			ahre: "Resurrection",
			ahad: "Devotion Aura"
		}
	},
	hapm: {
		name: "Admiral Proudmoore",
		race: HUMAN,
		type: HERO
	},
	hant: {
		name: "Antonidas",
		race: HUMAN,
		type: HERO,
		commands: {
			ahbz: "Blizzard",
			ahab: "Brilliance Aura",
			ahwe: "Summon Water Elemental",
			ahmt: "Mass Teleport"
		}
	},
	bloodelftownhall: {
		name: "Town Hall",
		suffix: "Blood Elf",
		race: BLOODELF,
		type: BUILDING,
		commands: {
			nhew: "Train Worker",
			cmdrally: "Set Rally Point",
			hkee: "Upgrade to Keep",
			cmdcancelbuild: "Cancel"
		}
	},
	bloodelfbarracks: {
		name: "Barracks",
		suffix: "Blood Elf",
		race: BLOODELF,
		type: BUILDING,
		commands: {
			hhes: "Train Swordsman",
			nhea: "Train Archer",
			cmdrally: "Set Rally Point",
			rhde: "Research Defend",
			reib: "Research Improved Bows",
			remk: "Research Marksmanship",
			cmdcancelbuild: "Cancel"
		}
	},
	cmdbuildbloodelf: {
		name: "Build Structure",
		race: BLOODELF,
		type: OTHER,
		commands: {
			net1: "Build Energy Tower",
			nbt1: "Build Boulder Tower",
			nft1: "Build Flame Tower",
			ndt1: "Build Cold Tower",
			ntt1: "Build Death Tower",
			cmdcancel: "Cancel"
		}
	},
	hhes: {
		name: "Swordsman",
		race: BLOODELF,
		type: UNIT,
		commands: {
			adef: "Defend"
		}
	},
	nhea: {
		name: "Archer",
		race: BLOODELF,
		type: UNIT
	},
	nhew: {
		name: "Worker",
		race: BLOODELF,
		type: UNIT,
		commands: {
			ahar: "Gather",
			ahrp: "Repair",
			cmdbuildhuman: "Build Structure",
			cmdcancelbuild: "Cancel"
		}
	},
	nbee: {
		name: "Blood Elf Engineer",
		race: BLOODELF,
		type: UNIT,
		commands: {
			ahar: "Gather",
			ahrp: "Repair",
			cmdbuildhuman: "Build Structure",
			cmdcancelbuild: "Cancel"
		}
	},
	nbel: {
		name: "Blood Elf Lieutenant",
		race: BLOODELF,
		type: UNIT,
		commands: {
			asps: "Spell Steal",
			amim: "Spell Immunity"
		}
	},
	net1: {
		name: "Energy Tower",
		race: BLOODELF,
		type: TOWER,
		commands: {
			net2: "Upgrade to Advanced Energy Tower"
		}
	},
	nbt1: {
		name: "Boulder Tower",
		race: BLOODELF,
		type: TOWER,
		commands: {
			cmdattackground: "Attack Ground",
			nbt2: "Upgrade to Advanced Boulder Tower"
		}
	},
	nft1: {
		name: "Flame Tower",
		race: BLOODELF,
		type: TOWER,
		commands: {
			nft2: "Upgrade to Advanced Flame Tower"
		}
	},
	ndt1: {
		name: "Cold Tower",
		race: BLOODELF,
		type: TOWER,
		commands: {
			ndt2: "Upgrade to Advanced Cold Tower"
		}
	},
	ntt1: {
		name: "Death Tower",
		race: BLOODELF,
		type: TOWER,
		commands: {
			ntx2: "Upgrade to Advanced Death Tower"
		}
	},
	obla: {
		name: "Blademaster",
		race: ORC,
		type: HERO,
		commands: {
			aowk: "Wind Walk",
			aocr: "Critical Strike",
			aomi: "Mirror Image",
			aoww: "Bladestorm"
		}
	},
	ofar: {
		name: "Far Seer",
		race: ORC,
		type: HERO,
		commands: {
			aofs: "Far Sight",
			aosf: "Feral Spirit",
			aocl: "Chain Lightning",
			aoeq: "Earthquake"
		}
	},
	otch: {
		name: "Tauren Chieftain",
		race: ORC,
		type: HERO,
		commands: {
			aosh: "Shockwave",
			aoae: "Endurance Aura",
			aore: "Reincarnation",
			aows: "War Stomp"
		}
	},
	oshd: {
		name: "Shadow Hunter",
		race: ORC,
		type: HERO,
		commands: {
			aohw: "Healing Wave",
			aohx: "Hex",
			aosw: "Serpent Ward",
			aovd: "Big Bad Voodoo"
		}
	},
	opeo: {
		name: "Peon",
		race: ORC,
		type: UNIT,
		commands: {
			ahar: "Gather",
			arep: "Repair",
			asal: "Pillage",
			cmdbuildorc: "Build Structure",
			cmdcancelbuild: "Cancel"
		}
	},
	cmdbuildorc: {
		name: "Build Structure",
		race: ORC,
		type: OTHER,
		commands: {
			ogre: "Build Great Hall",
			obar: "Build Barracks",
			ofor: "Build War Mill",
			owtw: "Build Watch Tower",
			otrb: "Build Orc Burrow",
			oalt: "Build Altar of Storms",
			osld: "Build Spirit Lodge",
			obea: "Build Beastiary",
			otto: "Build Tauren Totem",
			ovln: "Build Voodoo Lounge",
			cmdcancel: "Cancel"
		}
	},
	ogru: {
		name: "Grunt",
		race: ORC,
		type: UNIT,
		commands: {
			asal: "Pillage"
		}
	},
	ohun: {
		name: "Troll Headhunter",
		race: ORC,
		type: UNIT,
	},
	otbk: {
		name: "Troll Berserker",
		race: ORC,
		type: UNIT,
		commands: {
			absk: "Berserk"
		}
	},
	ocat: {
		name: "Demolisher",
		race: ORC,
		type: UNIT,
		commands: {
			cmdattackground: "Attack Ground",
			abof: "Burning Oil"
		}
	},
	oshm: {
		name: "Shaman",
		race: ORC,
		type: UNIT,
		commands: {
			ablo: "Lightning Shield",
			alsh: "Bloodlust",
			apg2: "Purge",
		}
	},
	odoc: {
		name: "Witch Doctor",
		race: ORC,
		type: UNIT,
		commands: {
			aeye: "Sentry Ward",
			ahwd: "Healing Ward",
			asta: "Stasis Trap"
		}
	},
	ospw: {
		name: "Spirit Walker",
		race: ORC,
		type: UNIT,
		commands: {
			acpf: "Corporeal Form",
			aspl: "Spirit Link",
			adcn: "Disenchant",
			aast: "Ancestral Spirit",
			acsk: "Resistant Skin"
		}
	},
	ospm: {
		name: "Spirit Walker",
		suffix: "Ethereal",
		race: ORC,
		type: UNIT,
		commands: {
			acpf: "Corporeal Form",
			aspl: "Spirit Link",
			adcn: "Disenchant",
			aast: "Ancestral Spirit",
			acsk: "Resistant Skin"
		}
	},
	orai: {
		name: "Raider",
		race: ORC,
		type: UNIT,
		commands: {
			aens: "Ensnare",
			asal: "Pillage"
		}
	},
	okod: {
		name: "Kodo Beast",
		race: ORC,
		type: UNIT,
		commands: {
			aakb: "War Drums",
			adev: "Devour"
		}
	},
	owyv: {
		name: "Wind Rider",
		race: ORC,
		type: UNIT,
		commands: {
			aven: "Envenomed Spears"
		}
	},
	otbr: {
		name: "Troll Batrider",
		race: ORC,
		type: UNIT,
		commands: {
			aliq: "Liquid Fire",
			auco: "Unstable Concoction"
		}
	},
	otau: {
		name: "Tauren",
		race: ORC,
		type: UNIT,
		commands: {
			awar: "Pulverize"
		}
	},
	ogre: {
		name: "Great Hall",
		race: ORC,
		type: BUILDING,
		commands: {
			opeo: "Train Peon",
			ropg: "Research Pillage",
			ropm: "Backpack",
			cmdrally: "Set Rally Point",
			ostr: "Upgrade to Stronghold",
			cmdcancelbuild: "Cancel"
		}
	},
	ostr: {
		name: "Stronghold",
		race: ORC,
		type: BUILDING,
		commands: {
			opeo: "Train Peon",
			ropg: "Research Pillage",
			ropm: "Backpack",
			cmdrally: "Set Rally Point",
			ofrt: "Upgrade to Fortress",
			cmdcancelbuild: "Cancel"
		}
	},
	ofrt: {
		name: "Fortress",
		race: ORC,
		type: BUILDING,
		commands: {
			opeo: "Train Peon",
			ropg: "Research Pillage",
			ropm: "Backpack",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	obar: {
		name: "Barracks",
		race: ORC,
		type: BUILDING,
		commands: {
			ogru: "Train Grunt",
			ohun: "Train Troll Headhunter",
			ocat: "Train Demolisher",
			robs: "Research Berserker Strength",
			rotr: "Research Troll Regeneration",
			robk: "Berserker Upgrade",
			robf: "Burning Oil",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	obar2: {
		name: "Barracks",
		suffix: "with Berserkers",
		race: ORC,
		type: BUILDING,
		commands: {
			ogru: "Train Grunt",
			otbk: "Train Troll Berserkers",
			ocat: "Train Demolisher",
			robs: "Research Berserker Strength",
			rotr: "Research Troll Regeneration",
			robf: "Burning Oil",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	ofor: {
		name: "War Mill",
		race: ORC,
		type: BUILDING,
		commands: {
			rome: "Upgrade Melee Weapons",
			roar: "Upgrade Armor",
			rora: "Upgrade Ranged Weapons",
			rosp: "Upgrade Barricades",
			rorb: "Reinforced Defenses",
			cmdcancelbuild: "Cancel"
		}
	},
	owtw: {
		name: "Watch Tower",
		race: ORC,
		type: TOWER
	},
	otrb: {
		name: "Burrow",
		race: ORC,
		type: BUILDING,
		commands: {
			abtl: "Battle Stations",
			astd: "Stand Down"
		}
	},
	oalt: {
		name: "Altar of Storms",
		race: ORC,
		type: BUILDING,
		commands: {
			obla: "Summon Blademaster",
			ofar: "Summon Far Seer",
			otch: "Summon Tauren Chieftain",
			oshd: "Summon Shadow Hunter",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	oalt2: {
		name: "Altar of Storms",
		suffix: "Campaign",
		race: ORC,
		type: BUILDING,
		commands: {
			ogrh: "Grom Hellscream",
			opgh: "Grom Hellscream (Possessed)",
			othr: "Thrall",
			ocbh: "Cairne Bloodhoof",
			naka: "Akama",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	osld: {
		name: "Spirit Lodge",
		race: ORC,
		type: BUILDING,
		commands: {
			oshm: "Train Shaman",
			odoc: "Train Witch Doctor",
			rowd: "Witch Doctor Training",
			rost: "Shaman Training",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	obea: {
		name: "Beastiary",
		race: ORC,
		type: BUILDING,
		commands: {
			orai: "Train Raider",
			okod: "Train Kodo Beast",
			owyv: "Train Wind Rider",
			otbr: "Train Troll Batrider",
			roen: "Research Ensnare",
			rovs: "Research Envenomed Spears",
			rwdm: "Upgrade War Drums",
			rolf: "Research Liquid Fire",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	otto: {
		name: "Tauren Totem",
		race: ORC,
		type: BUILDING,
		commands: {
			otau: "Train Tauren",
			ospm: "Train Spirit Walker",
			rows: "Research Pulverize",
			rowt: "Spirit Walker Training",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	ovln: {
		name: "Voodoo Lounge",
		race: ORC,
		type: BUILDING,
		commands: {
			shas: "Purchase Scroll of Speed",
			hslv: "Purchase Healing Salve",
			plcl: "Purchase Lesser Clarity Potion",
			phea: "Purchase Potion of Healing",
			pman: "Purchase Potion of Mana",
			stwp: "Purchase Scroll of Town Portal",
			tgrh: "Purchase Tiny Great Hall",
			oli2: "Purchase Orb of Lightning",
			anei: "Select User"
		}
	},
	oshy: {
		name: "Orc Shipyard",
		race: ORC,
		type: BUILDING,
		commands: {
			obot: "Hire Transport Ship",
			odes: "Hire Frigate",
			ojgn: "Train Orc Juggernaught",
			ane2: "Select User"
		}
	},
	obot: {
		name: "Orc Transport Ship",
		race: ORC,
		type: NOATTACK,
		commands: {
			slo3: "Load",
			sdro: "Unload"
		}
	},
	odes: {
		name: "Orc Frigate",
		race: ORC,
		type: UNIT
	},
	ojgn: {
		name: "Orc Juggernaught",
		race: ORC,
		type: UNIT
	},
	osw1: {
		name: "Spirit Wolf",
		suffix: "Level 1",
		race: ORC,
		type: SUMMON
	},
	osw2: {
		name: "Dire Wolf",
		suffix: "Level 2",
		race: ORC,
		type: SUMMON,
		commands: {
			acct: "Critical Strike"
		}
	},
	osw3: {
		name: "Shadow Wolf",
		suffix: "Level 3",
		race: ORC,
		type: SUMMON,
		commands: {
			acct: "Critical Strike"
		}
	},
	nw2w: {
		name: "Orc Warlock",
		race: ORC,
		type: UNIT,
		commands: {
			acfb: "Firebolt",
			acuf: "Unholy Frenzy",
			accr: "Cripple"
		}
	},
	owar: {
		name: "Orc Warchief",
		race: ORC,
		type: UNIT
	},
	nchg: {
		name: "Chaos Grunt",
		race: ORC,
		type: UNIT,
		commands: {
			asal: "Pillage"
		}
	},
	nchr: {
		name: "Chaos Raider",
		race: ORC,
		type: UNIT,
		commands: {
			aens: "Ensnare",
			asal: "Pillage"
		}
	},
	nckb: {
		name: "Chaos Kodo Beast",
		race: ORC,
		type: UNIT,
		commands: {
			aakb: "War Drums",
			adev: "Devour"
		}
	},
	nchw: {
		name: "Chaos Warlock",
		race: ORC,
		type: UNIT,
		commands: {
			awfb: "Firebolt",
			suhf: "Unholy Frenzy",
			scri: "Cripple"
		}
	},
	chaosgreathall: {
		name: "Great Hall",
		suffix: "Chaos Orc",
		race: ORC,
		type: BUILDING,
		commands: {
			ncpn: "Train Chaos Peon",
			ropg: "Research Pillage",
			cmdrally: "Set Rally Point",
			ostr: "Upgrade to Stronghold",
			cmdcancelbuild: "Cancel"
		}
	},
	chaosbarracks: {
		name: "Barracks",
		suffix: "Chaos Orc",
		race: ORC,
		type: BUILDING,
		commands: {
			nchg: "Train Chaos Grunt",
			ohun: "Train Troll Headhunter",
			ocat: "Train Demolisher",
			robs: "Research Berserker Strength",
			rotr: "Research Troll Regeneration",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	chaosspiritlodge: {
		name: "Spirit Lodge",
		suffix: "Chaos Orc",
		race: ORC,
		type: BUILDING,
		commands: {
			nchw: "Train Chaos Warlock",
			odoc: "Train Witch Doctor",
			rost: "Shaman Training",
			rowd: "Witch Doctor Training",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	chaosbeastiary: {
		name: "Beastiary",
		suffix: "Chaos Orc",
		race: ORC,
		type: BUILDING,
		commands: {
			nchr: "Train Raider",
			nckb: "Train Kodo Beast",
			roen: "Research Ensnare",
			rwdm: "Upgrade War Drums",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	ogrh: {
		name: "Grom Hellscream",
		race: ORC,
		type: HERO,
		commands: {
			aowk: "Wind Walk",
			aocr: "Critical Strike",
			aomi: "Mirror Image",
			aoww: "Bladestorm"
		}
	},
	opgh: {
		name: "Grom Hellscream",
		suffix: "Possessed",
		race: ORC,
		type: HERO,
		commands: {
			aowk: "Wind Walk",
			aocr: "Critical Strike",
			aomi: "Mirror Image",
			aoww: "Bladestorm"
		}
	},
	othr: {
		name: "Thrall",
		race: ORC,
		type: HERO,
		commands: {
			aofs: "Far Sight",
			aosf: "Feral Spirit",
			aocl: "Chain Lightning",
			aoeq: "Earthquake"
		}
	},
	ocbh: {
		name: "Cairne Bloodhoof",
		race: ORC,
		type: HERO,
		commands: {
			aosh: "Shockwave",
			aoae: "Endurance Aura",
			aore: "Reincarnation",
			aows: "War Stomp"
		}
	},
	orex: {
		name: "Rexxar",
		race: ORC,
		type: HERO,
		commands: {
			arsg: "Summon Misha",
			arsq: "Summon Quilbeast",
			ansb: "Storm Bolt",
			arsp: "Stampede",
			aamk: "Attribute Bonus"
		}
	},
	orkn: {
		name: "Rokhan",
		race: ORC,
		type: HERO,
		commands: {
			anhw: "Healing Wave",
			anhx: "Hex",
			arsw: "Serpent Ward",
			aols: "Voodoo Spirits",
			aamk: "Attribute Bonus"
		}
	},
	nsjs: {
		name: "Chen Stormstout",
		race: ORC,
		type: HERO,
		commands: {
			ancf: "Breath of Fire",
			acdh: "Drunken Haze",
			acdb: "Drunken Brawler",
			acef: "Storm, Earth, and Fire",
			aamk: "Attribute Bonus"
		}
	},
	ocb2: {
		name: "Cairne Bloodhoof",
		suffix: "Expansion",
		race: ORC,
		type: HERO,
		commands: {
			aos2: "Shockwave",
			aow2: "War Stomp",
			aor2: "Endurance Aura",
			aor3: "Reincarnation",
			aamk: "Attribute Bonus"
		}
	},
	osam: {
		name: "Samuro",
		race: ORC,
		type: HERO,
		commands: {
			aowk: "Wind Walk",
			aocr: "Critical Strike",
			aomi: "Mirror Image",
			aoww: "Bladestorm"
		}
	},
	odrt: {
		name: "Drek'Thar",
		race: ORC,
		type: HERO,
		commands: {
			aofs: "Far Sight",
			aosf: "Feral Spirit",
			aocl: "Chain Lightning",
			aoeq: "Earthquake"
		}
	},
	nmsh: {
		name: "Misha",
		race: ORC,
		type: SUMMON
	},
	naka: {
		name: "Akama",
		race: DRAENEI,
		type: HERO,
		commands: {
			acs7: "Feral Spirit",
			aocl: "Chain Lightning",
			aesh: "Shadow Strike",
			anr2: "Resurrection",
			ahid: "Shadowmeld"
		}
	},
	ndrl: {
		name: "Draenei Laborer",
		race: DRAENEI,
		type: UNIT,
		commands: {
			arep: "Repair",
			ahar: "Gather",
			cmdbuildorc: "Build Structure",
			cmdcancelbuild: "Cancel"
		}
	},
	cmdbuilddraenei: {
		name: "Build Structure",
		race: DRAENEI,
		type: OTHER,
		commands: {
			ndh2: "Build Draenei Haven",
			ndh3: "Build Draenei Barracks",
			ndh4: "Build Seer's Den",
			nbt1: "Build Advanced Boulder Tower",
			cmdcancel: "Cancel"
		}
	},
	ndh2: {
		name: "Draenei Haven",
		race: DRAENEI,
		type: BUILDING,
		commands: {
			ndrl: "Train Draenei Laborer",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	ndh3: {
		name: "Draenei Barracks",
		race: DRAENEI,
		type: BUILDING,
		commands: {
			ndrn: "Train Draenei Vindicator",
			ndrt: "Train Draenei Stalker",
			ndsa: "Train Salamander",
			ncat: "Train Draenei Demolisher",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	ndh4: {
		name: "Seer's Den",
		race: DRAENEI,
		type: BUILDING,
		commands: {
			ndrs: "Train Draenei Seer",
			ndrh: "Train Draenei Harbinger",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	ndrt: {
		name: "Draenei Stalker",
		race: DRAENEI,
		type: UNIT,
		commands: {
			acev: "Evasion",
			acen: "Ensnare"
		}
	},
	ndrn: {
		name: "Draenei Vindicator",
		race: DRAENEI,
		type: UNIT
	},
	ndsa: {
		name: "Salamander",
		suffix: "Draenei",
		race: DRAENEI,
		type: UNIT
	},
	ncat: {
		name: "Draenei Demolisher",
		race: DRAENEI,
		type: UNIT,
		commands: {
			cmdattackground: "Attack Ground",
			abof: "Burning Oil"
		}
	},
	ndrh: {
		name: "Draenei Harbinger",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			ache: "Ray of Disruption",
			acbb: "Bloodlust"
		}
	},
	ndrs: {
		name: "Draenei Seer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsw: "Slow",
			acba: "Brilliance Aura",
			achv: "Healing Wave"
		}
	},
	ndrd2: {
		name: "Draenei Elite Assassin",
		race: DRAENEI,
		type: UNIT,
		commands: {
			ahid: "Shadowmeld",
			acht: "Howl of Terror",
			acct: "Critical Strike"
		}
	},
	ndrs2: {
		name: "Draenei Saboteur",
		race: DRAENEI,
		type: UNIT,
		commands: {
			ahid: "Shadowmeld",
			achv: "Healing Wave",
			aliq: "Liquid Fire"
		}
	},
	udea: {
		name: "Death Knight",
		race: UNDEAD,
		type: HERO,
		commands: {
			audc: "Death Coil",
			audp: "Death Pact",
			auau: "Unholy Aura",
			auan: "Animate Dead"
		}
	},
	udre: {
		name: "Dreadlord",
		race: UNDEAD,
		type: HERO,
		commands: {
			auav: "Vampiric Aura",
			ausl: "Sleep",
			aucs: "Carrion Swarm",
			auin: "Inferno"
		}
	},
	ulic: {
		name: "Lich",
		race: UNDEAD,
		type: HERO,
		commands: {
			aufn: "Frost Nova",
			aufu: "Frost Armor",
			audr: "Dark Ritual",
			audd: "Death and Decay"
		}
	},
	ucrl: {
		name: "Crypt Lord",
		race: UNDEAD,
		type: HERO,
		commands: {
			auim: "Impale",
			auts: "Spiked Carapace",
			aucb: "Carrion Beetles",
			auls: "Locust Swarm"
		}
	},
	uaco: {
		name: "Acolyte",
		race: UNDEAD,
		type: UNIT,
		commands: {
			aaha: "Gather",
			arst: "Restore",
			alam: "Sacrifice",
			auns: "Unsummon Building",
			cmdbuildundead: "Summon Building"
		}
	},
	cmdbuildundead: {
		name: "Summon Building",
		race: UNDEAD,
		type: OTHER,
		commands: {
			unpl: "Summon Necropolis",
			usep: "Summon Crypt",
			ugol: "Haunt Gold Mine",
			ugrv: "Summon Graveyard",
			uzig: "Summon Ziggurat",
			uaod: "Summon Altar of Darkness",
			utod: "Summon Temple of the Damned",
			uslh: "Summon Slaughterhouse",
			usap: "Summon Sacrificial Pit",
			ubon: "Summon Boneyard",
			utom: "Summon Tomb of Relics",
			cmdcancel: "Cancel"
		}
	},
	ushd: {
		name: "Shade",
		race: UNDEAD,
		type: NOATTACK,
		commands: {
			atru: "True Sight"
		}
	},
	ugho: {
		name: "Ghoul",
		race: UNDEAD,
		type: UNIT,
		commands: {
			acan: "Cannibalize",
			ahrl: "Gather"
		}
	},
	ucry: {
		name: "Crypt Fiend",
		race: UNDEAD,
		type: UNIT,
		commands: {
			aweb: "Web",
			abur: "Burrow"
		}
	},
	ugar: {
		name: "Gargoyle",
		race: UNDEAD,
		type: UNIT,
		commands: {
			astn: "Stone Form"
		}
	},
	uabo: {
		name: "Abomination",
		race: UNDEAD,
		type: UNIT,
		commands: {
			aap1: "Disease Cloud",
			acn2: "Cannibalize"
		}
	},
	umtw: {
		name: "Meat Wagon",
		race: UNDEAD,
		type: UNIT,
		commands: {
			amel: "Load Corpse",
			amed: "Drop All Corpses",
			apts: "Disease Cloud",
			aexh: "Exhume Corpses"
		}
	},
	unec: {
		name: "Necromancer",
		race: UNDEAD,
		type: UNIT,
		commands: {
			acri: "Cripple",
			arai: "Raise Dead",
			auhf: "Unholy Frenzy"
		}
	},
	uban: {
		name: "Banshee",
		race: UNDEAD,
		type: UNIT,
		commands: {
			aam2: "Anti-magic Shell",
			acrs: "Curse",
			aps2: "Possession"
		}
	},
	ufro: {
		name: "Frost Wyrm",
		race: UNDEAD,
		type: UNIT,
		commands: {
			afrz: "Frost Breath"
		}
	},
	uobs: {
		name: "Obsidian Statue",
		race: UNDEAD,
		type: UNIT,
		commands: {
			arpl: "Essence of Blight",
			arpm: "Spirit Touch",
			ubsp: "Morph into Destroyer"
		}
	},
	ubsp: {
		name: "Destroyer",
		race: UNDEAD,
		type: UNIT,
		commands: {
			advm: "Devour Magic",
			afak: "Orb of Annihilation",
			aabs: "Absorb Mana",
			acmi: "Spell Immunity"
		}
	},
	unpl: {
		name: "Necropolis",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			uaco: "Train Acolyte",
			rupm: "Research Backpack",
			unp1: "Upgrade to Halls of the Dead",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	unp1: {
		name: "Halls of the Dead",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			uaco: "Train Acolyte",
			rupm: "Research Backpack",
			unp2: "Upgrade to Black Citadel",
			cmdrally: "Set Rally Point",
			afr2: "Frost Attack",
			cmdcancelbuild: "Cancel"
		}
	},
	unp2: {
		name: "Black Citadel",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			uaco: "Train Acolyte",
			rupm: "Research Backpack",
			cmdrally: "Set Rally Point",
			afr2: "Frost Attack",
			cmdcancelbuild: "Cancel"
		}
	},
	usep: {
		name: "Crypt",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			ugho: "Train Ghoul",
			ucry: "Train Crypt Fiend",
			ugar: "Train Gargoyle",
			ruac: "Research Cannibalize",
			ruwb: "Research Web",
			rugf: "Research Ghoul Frenzy",
			rusf: "Research Stone Form",
			rubu: "Research Burrow",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	ugrv: {
		name: "Graveyard",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			rume: "Upgrade Unholy Strength",
			ruar: "Upgrade Unholy Armor",
			rura: "Upgrade Creature Attack",
			rucr: "Upgrade Creature Carapace",
			cmdcancelbuild: "Cancel"
		}
	},
	uzig: {
		name: "Ziggurat",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			uzg1: "Upgrade to Spirit Tower",
			uzg2: "Upgrade to Nerubian Tower",
			cmdcancelbuild: "Cancel"
		}
	},
	uzg1: {
		name: "Spirit Tower",
		race: UNDEAD,
		type: TOWER
	},
	uzg2: {
		name: "Nerubian Tower",
		race: UNDEAD,
		type: TOWER,
		commands: {
			afra: "Frost Attack"
		}
	},
	uaod: {
		name: "Altar of Darkness",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			udea: "Summon Death Knight",
			ulic: "Summon Lich",
			udre: "Summon Dreadlord",
			ucrl: "Summon Crypt Lord",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	uaod2: {
		name: "Altar of Darkness",
		suffix: "Campaign",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			uear: "Arthas",
			uvar: "Varimathras",
			uktl: "Kel'Thuzad",
			uanb: "Anub'arak",
			usyl: "Sylvanas",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	utod: {
		name: "Temple of the Damned",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			unec: "Train Necromancer",
			uban: "Train Banshee",
			rune: "Necromancer Training",
			ruba: "Banshee Training",
			rusm: "Research Skeletal Mastery",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	uslh: {
		name: "Slaughterhouse",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			umtw: "Train Meat Wagon",
			uabo: "Train Abomination",
			uobs: "Train Obsidian Statue",
			rupc: "Research Disease Cloud",
			rusp: "Research Destroyer Form",
			ruex: "Research Exhume Corpses",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	usap: {
		name: "Sacrificial Pit",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			asac: "Sacrifice",
			cmdcancelbuild: "Cancel"
		}
	},
	ubon: {
		name: "Boneyard",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			ufro: "Train Frost Wyrm",
			rufb: "Research Freezing Breath",
			cmdcancelbuild: "Cancel"
		}
	},
	utom: {
		name: "Tomb of Relics",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			rnec: "Purchase Rod of Necromancy",
			dust: "Purchase Dust of Appearance",
			skul: "Purchase Sacrificial Skull",
			phea: "Purchase Potion of Healing",
			pman: "Purchase Potion of Mana",
			stwp: "Purchase Scroll of Town Portal",
			ocor: "Purchase Orb of Corruption",
			shea: "Purchase Scroll of Healing",
			anei: "Select User"
		}
	},
	ushp: {
		name: "Undead Shipyard",
		race: UNDEAD,
		type: BUILDING,
		commands: {
			ubot: "Hire Transport Ship",
			udes: "Hire Frigate",
			uubs: "Hire Battleship",
			ane2: "Select User"
		}
	},
	ubot: {
		name: "Undead Transport Ship",
		race: UNDEAD,
		type: NOATTACK,
		commands: {
			slo3: "Load",
			sdro: "Unload"
		}
	},
	udes: {
		name: "Undead Frigate",
		race: UNDEAD,
		type: UNIT
	},
	uubs: {
		name: "Undead Battleship",
		race: UNDEAD,
		type: UNIT
	},
	uarb: {
		name: "Sky Barge",
		race: UNDEAD,
		type: UNIT,
		commands: {
			aloa: "Load",
			adro: "Unload"
		}
	},
	nzom: {
		name: "Zombie",
		race: UNDEAD,
		type: UNIT
	},
	uswb: {
		name: "Sylvanas Windrunner",
		race: UNDEAD,
		type: UNIT,
		commands: {
			acam: "Anti-magic Shell",
			acrs: "Curse"
		}
	},
	uear: {
		name: "Arthas",
		race: UNDEAD,
		type: HERO,
		commands: {
			audc: "Death Coil",
			audp: "Death Pact",
			auau: "Unholy Aura",
			auan: "Animate Dead"
		}
	},
	uktl: {
		name: "Kel'Thuzad",
		race: UNDEAD,
		type: HERO,
		commands: {
			aufn: "Frost Nova",
			aufu: "Frost Armor",
			audr: "Dark Ritual",
			audd: "Death and Decay"
		}
	},
	uanb: {
		name: "Anub'arak",
		race: UNDEAD,
		type: HERO,
		commands: {
			auim: "Impale",
			auts: "Spiked Carapace",
			aucb: "Carrion Beetles",
			auls: "Locust Swarm"
		}
	},
	usyl: {
		name: "Sylvanas",
		race: UNDEAD,
		type: HERO,
		commands: {
			ansi: "Silence",
			anba: "Black Arrow",
			andr: "Life Drain",
			anch: "Charm"
		}
	},
	npld: {
		name: "Pit Lord",
		suffix: "Campaign",
		race: DEMON,
		type: HERO,
		commands: {
			aosh: "Shockwave",
			ahtc: "Thunder Clap",
			aoeq: "Earthquake",
			anrn: "Reincarnation"
		}
	},
	nman: {
		name: "Mannoroth",
		race: DEMON,
		type: HERO,
		commands: {
			aosh: "Shockwave",
			ahtc: "Thunder Clap",
			aoeq: "Earthquake",
			anrn: "Reincarnation"
		}
	},
	nmag: {
		name: "Magtheridon",
		race: DEMON,
		type: HERO,
		commands: {
			anrf: "Rain of Fire",
			anht: "Howl of Terror",
			anca: "Cleaving Attack",
			ando: "Doom"
		}
	},
	uwar: {
		name: "Archimonde",
		race: DEMON,
		type: HERO,
		commands: {
			anrc: "Rain of Chaos",
			andp: "Dark Portal",
			anfd: "Finger of Death",
			ahbh: "Bash"
		}
	},
	umal: {
		name: "Mal'Ganis",
		race: DEMON,
		type: HERO,
		commands: {
			ausl: "Sleep",
			aucs: "Carrion Swarm",
			ansl: "Soul Preservation",
			andc: "Dark Conversion"
		}
	},
	utic: {
		name: "Tichondrius",
		race: DEMON,
		type: HERO,
		commands: {
			ausl: "Sleep",
			aucs: "Carrion Swarm",
			anrc: "Rain of Chaos",
			anfd: "Finger of Death"
		}
	},
	uvar: {
		name: "Varimathras",
		race: DEMON,
		type: HERO,
		commands: {
			anrf: "Rain of Fire",
			ausl: "Sleep",
			auav: "Vampiric Aura",
			ando: "Doom"
		}
	},
	uske: {
		name: "Skeleton Warrior",
		race: UNDEAD,
		type: SUMMON
	},
	uskm: {
		name: "Skeletal Mage",
		race: UNDEAD,
		type: SUMMON
	},
	ninf: {
		name: "Infernal",
		race: UNDEAD,
		type: SUMMON,
		commands: {
			acmi: "Spell Immunity",
			anpi: "Permanent Immolation",
			acrk: "Resistant Skin"
		}
	},
	ucs1: {
		name: "Carrion Beetle",
		suffix: "Level 1",
		race: UNDEAD,
		type: SUMMON
	},
	ucs2: {
		name: "Carrion Beetle",
		suffix: "Level 2",
		race: UNDEAD,
		type: SUMMON,
		commands: {
			abu2: "Burrow"
		}
	},
	ucs3: {
		name: "Carrion Beetle",
		suffix: "Level 3",
		race: UNDEAD,
		type: SUMMON,
		commands: {
			abu3: "Burrow"
		}
	},
	edem: {
		name: "Demon Hunter",
		race: NIGHTELF,
		type: HERO,
		commands: {
			aemb: "Mana Burn",
			aeim: "Immolation",
			aeev: "Evasion",
			aeme: "Metamorphosis"
		}
	},
	ekee: {
		name: "Keeper of the Grove",
		race: NIGHTELF,
		type: HERO,
		commands: {
			aeer: "Entangling Roots",
			aefn: "Force of Nature",
			aeah: "Thorns Aura",
			aetq: "Tranquility"
		}
	},
	emoo: {
		name: "Priestess of the Moon",
		race: NIGHTELF,
		type: HERO,
		commands: {
			aest: "Scout",
			ahfa: "Searing Arrows",
			aear: "Trueshot Aura",
			aesf: "Starfall",
			ashm: "Shadowmeld"
		}
	},
	ewar: {
		name: "Warden",
		race: NIGHTELF,
		type: HERO,
		commands: {
			aefk: "Fan of Knives",
			aebl: "Blink",
			aesh: "Shadow Strike",
			aesv: "Vengeance",
			ashm: "Shadowmeld"
		}
	},
	ewsp: {
		name: "Wisp",
		race: NIGHTELF,
		type: NOATTACK,
		commands: {
			adtn: "Denotate",
			aren: "Renew",
			awha: "Gather",
			cmdbuildnightelf: "Create Building",
			cmdcancelbuild: "Cancel"
		}
	},
	cmdbuildnightelf: {
		name: "Create Building",
		race: NIGHTELF,
		type: OTHER,
		commands: {
			etol: "Create Tree of Life",
			eaom: "Create Ancient of War",
			edob: "Create Hunter's Hall",
			etrp: "Create Ancient Protector",
			emow: "Create Moon Well",
			eate: "Create Altar of Elders",
			eaoe: "Create Ancient of Lore",
			eaow: "Create Ancient of Wind",
			edos: "Create Chimaera Roost",
			eden: "Create Ancient of Wonders",
			cmdcancel: "Cancel"
		}
	},
	earc: {
		name: "Archer",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			aco2: "Mount Hippogryph",
			ashm: "Shadowmeld",
			aegr: "Elune's Grace"
		}
	},
	esen: {
		name: "Huntress",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			aesn: "Sentinel",
			ashm: "Shadowmeld",
			amgl: "Moon Glaive"
		}
	},
	ebal: {
		name: "Glaive Thrower",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			cmdattackground: "Attack Ground",
			aimp: "Vorpal Blades"
		}
	},
	edry: {
		name: "Dryad",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			aadm: "Abolish Magic",
			amim: "Spell Immunity",
			aspo: "Slow Poison"
		}
	},
	edoc: {
		name: "Druid of the Claw",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			abrf: "Bear Form",
			arej: "Rejuvenation",
			aroa: "Roar"
		}
	},
	edcm: {
		name: "Druid of the Claw",
		suffix: "Bear Form",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			abrf: "Night Elf Form",
			ara2: "Roar"
		}
	},
	emtg: {
		name: "Mountain Giant",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			atau: "Taunt",
			agra: "War Club",
			arsk: "Resistant Skin",
			assk: "Hardened Skin"
		}
	},
	ehip: {
		name: "Hippogryph",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			aco3: "Pick up Archer"
		}
	},
	ehpr: {
		name: "Hippogryph Rider",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			adec: "Dismount Archer"
		}
	},
	edot: {
		name: "Druid of the Talon",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			acyc: "Cyclone",
			arav: "Storm Crow Form",
			afae: "Faerie Fire"
		}
	},
	edtm: {
		name: "Druid of the Talon",
		suffix: "Storm Crow Form",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			arav: "Night Elf Form",
			afa2: "Faerie Fire"
		}
	},
	efdr: {
		name: "Faerie Dragon",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			amim: "Spell Immunity",
			amfl: "Mana Flare",
			apsh: "Phase Shift"
		}
	},
	echm: {
		name: "Chimaera",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			acor: "Corrosive Breath"
		}
	},
	etol: {
		name: "Tree of Life",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			ewsp: "Train Wisp",
			renb: "Research Nature's Blessing",
			repm: "Backpack",
			etoa: "Upgrade to Tree of Ages",
			aent: "Entangle Gold Mine",
			aro1: "Uproot",
			cmdrally: "Set Rally Point"
		}
	},
	aroo: {
		name: "Uprooted Ancient",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			aent: "Entangle Gold Mine",
			aeat: "Eat Tree",
			aro1: "Root"
		}
	},
	etoa: {
		name: "Tree of Ages",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			ewsp: "Train Wisp",
			renb: "Research Nature's Blessing",
			repm: "Backpack",
			etoe: "Upgrade to Tree of Ages",
			aent: "Entangle Gold Mine",
			aro1: "Uproot",
			cmdrally: "Set Rally Point"
		}
	},
	etoe: {
		name: "Tree of Eternity",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			ewsp: "Train Wisp",
			renb: "Research Nature's Blessing",
			repm: "Backpack",
			aent: "Entangle Gold Mine",
			aro1: "Uproot",
			cmdrally: "Set Rally Point"
		}
	},
	egol: {
		name: "Entangled Gold Mine",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			slo2: "Load Wisp",
			adri: "Unload All"
		}
	},
	eaom: {
		name: "Ancient of War",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			earc: "Train Archer",
			esen: "Train Huntress",
			ebal: "Train Glaive Thrower",
			reib: "Research Improved Bows",
			remk: "Research Marksmanship",
			remg: "Research Moon Glaive",
			resc: "Research Sentinel",
			repb: "Research Vorpal Blades",
			cmdrally: "Set Rally Point",
			aro1: "Uproot"
		}
	},
	edob: {
		name: "Hunter's Hall",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			resm: "Upgrade Strength of the Moon",
			rema: "Upgrade Moon Armor",
			resw: "Upgrade Strength of the Wild",
			rerh: "Upgrade Reinforced Hides",
			reuv: "Research Ultravision",
			rews: "Research Well Spring",
			cmdcancelbuild: "Cancel"
		}
	},
	etrp: {
		name: "Ancient Protector",
		race: NIGHTELF,
		type: TOWER,
		commands: {
			aro2: "Uproot"
		}
	},
	emow: {
		name: "Moon Well",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			ambt: "Replenish Mana and Life"
		}
	},
	eate: {
		name: "Altar of Elders",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			edem: "Summon Demon Hunter",
			ekee: "Summon Keeper of the Grove",
			emoo: "Summon Priestess of the Moon",
			ewar: "Summon Warden",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	eate2: {
		name: "Altar of Elders",
		suffix: "Campaign",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			etyr: "Tyrande",
			efur: "Furion",
			emns: "Malfurion",
			emfr: "Malfurion (with Stag)",
			eill: "Illidan",
			ewrd: "Maiev",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	eaoe: {
		name: "Ancient of Lore",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			edry: "Train Dryad",
			edoc: "Train Druid of the Claw",
			emtg: "Train Mountain Giant",
			resi: "Research Abolish Magic",
			redc: "Druid of the Claw Training",
			rers: "Research Resistant Skin",
			rehs: "Research Hardened Skin",
			reeb: "Research Mark of the Claw",
			cmdrally: "Set Rally Point",
			aro1: "Uproot"
		}
	},
	eaow: {
		name: "Ancient of Wind",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			ehip: "Train Hippogryph",
			edot: "Train Druid of the Talon",
			efdr: "Train Faerie Dragon",
			redt: "Druid of the Talon Training",
			reec: "Research Mark of the Talon",
			cmdrally: "Set Rally Point",
			aro1: "Uproot"
		}
	},
	edos: {
		name: "Chimaera Roost",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			echm: "Train Chimaera",
			recb: "Research Corrosive Breath",
			cmdcancelbuild: "Cancel"
		}
	},
	eden: {
		name: "Ancient of Wonders",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			moon: "Purchase Moonstone",
			plcl: "Purchase Lesser Clarity Potion",
			dust: "Purchase Dust of Appearance",
			phea: "Purchase Potion of Healing",
			pman: "Purchase Potion of Mana",
			stwp: "Purchase Scroll of Town Portal",
			spre: "Purchase Staff of Preservation",
			oven: "Purchase Orb of Venom",
			pams: "Purchase Anti-magic Potion",
			anei: "Select User",
			aro1: "Uproot"
		}
	},
	eshy: {
		name: "Night Elf Shipyard",
		race: NIGHTELF,
		type: BUILDING,
		commands: {
			etrs: "Hire Transport Ship",
			edes: "Hire Frigate",
			ebsh: "Hire Battleship",
			ane2: "Select User"
		}
	},
	etrs: {
		name: "Night Elf Transport Ship",
		race: NIGHTELF,
		type: NOATTACK,
		commands: {
			slo3: "Load",
			sdro: "Unload"
		}
	},
	edes: {
		name: "Night Elf Frigate",
		race: NIGHTELF,
		type: UNIT
	},
	ebsh: {
		name: "Night Elf Battleship",
		race: NIGHTELF,
		type: UNIT
	},
	efon: {
		name: "Treant",
		race: NIGHTELF,
		type: SUMMON
	},
	nowl: {
		name: "Owl Scout",
		suffix: "Level 1",
		race: NIGHTELF,
		type: SUMMON,
		commands: {
			adtg: "True Sight"
		}
	},
	now2: {
		name: "Owl Scout",
		suffix: "Level 2",
		race: NIGHTELF,
		type: SUMMON,
		commands: {
			adtg: "True Sight"
		}
	},
	now3: {
		name: "Owl Scout",
		suffix: "Level 3",
		race: NIGHTELF,
		type: SUMMON,
		commands: {
			adtg: "True Sight"
		}
	},
	espv: {
		name: "Avatar of Vengeance",
		race: NIGHTELF,
		type: SUMMON,
		commands: {
			avng: "Spirit of Vengeance",
			acmi: "Spell Immunity",
			acrk: "Resistant Skin"
		}
	},
	even: {
		name: "Spirit of Vengeance",
		race: NIGHTELF,
		type: SUMMON
	},
	nwat: {
		name: "Sentry",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			acbl: "Bloodlust"
		}
	},
	nssn: {
		name: "Warden",
		suffix: "Campaign",
		race: NIGHTELF,
		type: UNIT
	},
	eshd: {
		name: "Shandris",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			ashm: "Shadowmeld"
		}
	},
	ensh: {
		name: "Naisha",
		race: NIGHTELF,
		type: UNIT,
		commands: {
			aesr: "Sentinel",
			ashm: "Shadowmeld",
			amgr: "Moon Glaive"
		}
	},
	eill: {
		name: "Illidan",
		race: NAGA,
		type: HERO,
		commands: {
			aemb: "Mana Burn",
			aeim: "Immolation",
			aeev: "Evasion",
			aell: "Metamorphosis"
		}
	},
	efur: {
		name: "Furion",
		race: NIGHTELF,
		type: HERO,
		commands: {
			aeer: "Entangling Roots",
			aefn: "Force of Nature",
			aeah: "Thorns Aura",
			aetq: "Tranquility"
		}
	},
	emns: {
		name: "Malfurion",
		race: NIGHTELF,
		type: HERO,
		commands: {
			aeer: "Entangling Roots",
			aefn: "Force of Nature",
			aeah: "Thorns Aura",
			aetq: "Tranquility"
		}
	},
	emfr: {
		name: "Malfurion",
		suffix: "with Stag",
		race: NIGHTELF,
		type: HERO,
		commands: {
			aeer: "Entangling Roots",
			aefn: "Force of Nature",
			aeah: "Thorns Aura",
			aetq: "Tranquility"
		}
	},
	etyr: {
		name: "Tyrande",
		race: NIGHTELF,
		type: HERO,
		commands: {
			aest: "Scout",
			ahfa: "Searing Arrows",
			aear: "Trueshot Aura",
			aesf: "Starfall",
			ashm: "Shadowmeld"
		}
	},
	ewrd: {
		name: "Maiev",
		race: NIGHTELF,
		type: HERO,
		commands: {
			aefk: "Fan of Knives",
			aebl: "Blink",
			aesh: "Shadow Strike",
			aesv: "Vengeance",
			ashm: "Shadowmeld"
		}
	},
	eevi: {
		name: "Illidan",
		suffix: "Expansion",
		race: NAGA,
		type: HERO,
		commands: {
			aemb: "Mana Burn",
			aeim: "Immolation",
			aeev: "Evasion",
			aevi: "Metamorphosis"
		}
	},
	hvsh: {
		name: "Lady Vashj",
		race: NAGA,
		type: HERO,
		commands: {
			anfl: "Forked Lightning",
			anfa: "Frost Arrows",
			anms: "Mana Shield",
			anto: "Tornado"
		}
	},
	nmpe: {
		name: "Mur'gul Slave",
		race: NAGA,
		type: UNIT,
		commands: {
			anha: "Gather",
			arep: "Repair",
			cmdbuildnaga: "Build Structure",
			cmdcancelbuild: "Cancel"
		}
	},
	cmdbuildnaga: {
		name: "Build Structure",
		race: NAGA,
		type: OTHER,
		commands: {
			nntt: "Build Temple of Tides",
			nnsg: "Build Spawning Grounds",
			nnfm: "Build Coral Bed",
			nntg: "Build Tidal Guardian",
			nnsa: "Build Shrine of Azshara",
			nnad: "Build Altar of the Depths",
			cmdcancel: "Cancel"
		}
	},
	nnmg: {
		name: "Mur'gul Reaver",
		race: NAGA,
		type: UNIT
	},
	nmyr: {
		name: "Naga Myrmidon",
		race: NAGA,
		type: UNIT,
		commands: {
			anen: "Ensnare",
			asb1: "Submerge"
		}
	},
	nnrg: {
		name: "Naga Royal Guard",
		race: NAGA,
		type: UNIT,
		commands: {
			asb2: "Submerge",
			accv: "Crushing Wave",
			accb: "Frost Bolt",
			acwe: "Summon Sea Elemental",
			acsk: "Resistant Skin",
		}
	},
	nsnp: {
		name: "Snap Dragon",
		race: NAGA,
		type: UNIT,
		commands: {
			aspo: "Slow Poison",
			asb3: "Submerge"
		}
	},
	nhyc: {
		name: "Dragon Turtle",
		race: NAGA,
		type: UNIT,
		commands: {
			acdv: "Devour",
			anth: "Spiked Shell",
			ansk: "Hardened Skin"

		}
	},
	nnsw: {
		name: "Naga Siren",
		race: NAGA,
		type: UNIT,
		commands: {
			acny: "Cyclone",
			acfu: "Frost Armor",
			anpa: "Parasite"
		}
	},
	nwgs: {
		name: "Couatl",
		race: NAGA,
		type: UNIT,
		commands: {
			andm: "Abolish Magic"
		}
	},
	nntt: {
		name: "Temple of Tides",
		race: NAGA,
		type: BUILDING,
		commands: {
			nmpe: "Train Mur'gul Slave",
			nnmg: "Train Mur'gul Reaver",
			cmdrally: "Set Rally Point",
			rnat: "Upgrade Blades",
			rnam: "Upgrade Scales",
			rnsb: "Research Submerge",
			cmdcancelbuild: "Cancel"
		}
	},
	nnsg: {
		name: "Spawning Grounds",
		race: NAGA,
		type: BUILDING,
		commands: {
			nmyr: "Train Myrmidon",
			nsnp: "Train Snap Dragon",
			nhyc: "Train Dragon Turtle",
			cmdrally: "Set Rally Point",
			rnen: "Research Ensnare",
			cmdcancelbuild: "Cancel"
		}
	},
	nnfm: {
		name: "Coral Bed",
		race: NAGA,
		type: BUILDING
	},
	nntg: {
		name: "Tidal Guardian",
		race: NAGA,
		type: TOWER
	},
	nnsa: {
		name: "Shine of Azshara",
		race: NAGA,
		type: BUILDING,
		commands: {
			nnsw: "Train Naga Siren",
			nwgs: "Train Couatl",
			rnsw: "Naga Siren Training",
			rnsi: "Research Abolish Magic",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	nnad: {
		name: "Altar of the Depths",
		race: NAGA,
		type: BUILDING,
		commands: {
			eevi: "Illidan (Expansion)",
			hvsh: "Lady Vashj",
			cmdrally: "Set Rally Point",
			cmdcancelbuild: "Cancel"
		}
	},
	nsel: {
		name: "Sea Elemental",
		race: NAGA,
		type: SUMMON,
		commands: {
			acbh: "Bash"
		}
	},
	nngs: {
		name: "Naga Sea Witch",
		race: NEUTRAL,
		type: HERO,
		commands: {
			anfl: "Forked Lightning",
			anfa: "Frost Arrows",
			anms: "Mana Shield",
			anto: "Tornado"
		}
	},
	nbrn: {
		name: "Dark Ranger",
		race: NEUTRAL,
		type: HERO,
		commands: {
			ansi: "Silence",
			anba: "Black Arrow",
			andr: "Life Drain",
			anch: "Charm"
		}
	},
	npbm: {
		name: "Pandaren Brewmaster",
		race: NEUTRAL,
		type: HERO,
		commands: {
			anbf: "Breath of Fire",
			andb: "Drunken Haze",
			andh: "Drunken Brawler",
			anef: "Storm, Earth, and Fire"
		}
	},
	nbst: {
		name: "Beastmaster",
		race: NEUTRAL,
		type: HERO,
		commands: {
			ansg: "Summon Bear",
			ansq: "Summon Quilbeast",
			answ: "Summon Hawk",
			anst: "Stampede"
		}
	},
	nplh: {
		name: "Pit Lord",
		race: NEUTRAL,
		type: HERO,
		commands: {
			anrf: "Rain of Fire",
			anht: "Howl of Terror",
			anca: "Cleaving Attack",
			ando: "Doom"
		}
	},
	ntin: {
		name: "Goblin Tinker",
		race: NEUTRAL,
		type: HERO,
		commands: {
			ansy: "Pocket Factory",
			ancs: "Cluster Rockets",
			aneg: "Engineering Upgrade",
			anrg: "Robo-Goblin"
		}
	},
	ntin1: {
		name: "Goblin Tinker",
		suffix: "Engineering Upgrade 1",
		race: NEUTRAL,
		type: HERO,
		commands: {
			ans1: "Pocket Factory",
			anc1: "Cluster Rockets",
			aneg: "Engineering Upgrade",
			ang1: "Robo-Goblin"
		}
	},
	ntin2: {
		name: "Goblin Tinker",
		suffix: "Engineering Upgrade 2",
		race: NEUTRAL,
		type: HERO,
		commands: {
			ans2: "Pocket Factory",
			anc2: "Cluster Rockets",
			aneg: "Engineering Upgrade",
			ang2: "Robo-Goblin"
		}
	},
	ntin3: {
		name: "Goblin Tinker",
		suffix: "Engineering Upgrade 3",
		race: NEUTRAL,
		type: HERO,
		commands: {
			ans3: "Pocket Factory",
			anc3: "Cluster Rockets",
			aneg: "Engineering Upgrade",
			ang3: "Robo-Goblin"
		}
	},
	nalc: {
		name: "Goblin Alchemist",
		race: NEUTRAL,
		type: HERO,
		commands: {
			anhs: "Healing Spray",
			ancr: "Chemical Rage",
			anab: "Acid Bomb",
			antm: "Transmute"
		}
	},
	nfir: {
		name: "Firelord",
		race: NEUTRAL,
		type: HERO,
		commands: {
			anso: "Soul Burn",
			anlm: "Summon Lava Spawn",
			ania: "Incinerate",
			anvc: "Volcano"
		}
	},
	ndr1: {
		name: "Lesser Dark Minion",
		suffix: "Level 1",
		race: NEUTRAL,
		type: SUMMON
	},
	ndr2: {
		name: "Dark Minion",
		suffix: "Level 2",
		race: NEUTRAL,
		type: SUMMON
	},
	ndr3: {
		name: "Greater Dark Minion",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON
	},
	npn1: {
		name: "Fire",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			anpi: "Permanent Immolation",
			acrk: "Resistant Skin"
		}
	},
	npn2: {
		name: "Storm",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			anwk: "Wind Walk",
			accy: "Cyclone",
			adsm: "Dispel Magic",
			acrk: "Resistant Skin"
		}
	},
	npn3: {
		name: "Earth",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			anta: "Taunt",
			acpv: "Pulverize",
			acmi: "Spell Immunity",
			acrk: "Resistant Skin"
		}
	},
	ngz1: {
		name: "Bear",
		suffix: "Level 1",
		race: NEUTRAL,
		type: SUMMON
	},
	ngz2: {
		name: "Raging Bear",
		suffix: "Level 2",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			acbh: "Bash"
		}
	},
	ngz3: {
		name: "Spirit Bear",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			anbl: "Blink",
			acbh: "Bash"
		}
	},
	nqb1: {
		name: "Quilbeast",
		suffix: "Level 1",
		race: NEUTRAL,
		type: SUMMON
	},
	nqb2: {
		name: "Dire Quilbeast",
		suffix: "Level 2",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			afzy: "Frenzy"
		}
	},
	nqb3: {
		name: "Raging Quilbeast",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			afzy: "Frenzy"
		}
	},
	nwe1: {
		name: "Hawk",
		suffix: "Level 1",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			antr: "True Sight"
		}
	},
	nwe2: {
		name: "Thunder Hawk",
		suffix: "Level 2",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			antr: "True Sight"
		}
	},
	nwe3: {
		name: "Spirit Hawk",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			antr: "True Sight"
		}
	},
	nba2: {
		name: "Doom Guard",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			acrf: "Rain of Fire",
			awrs: "War Stomp",
			adsm: "Dispel Magic",
			accr: "Cripple",
			acsk: "Resistant Skin"
		}
	},
	ncgb: {
		name: "Clockwerk Goblin",
		suffix: "Level 1",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			asdg: "Kaboom!"
		}
	},
	ncg1: {
		name: "Clockwerk Goblin",
		suffix: "Level 2",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			asd2: "Kaboom!"
		}
	},
	ncg2: {
		name: "Clockwerk Goblin",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON,
		commands: {
			asd3: "Kaboom!"
		}
	},
	nlv1: {
		name: "Lava Spawn",
		suffix: "Level 1",
		race: NEUTRAL,
		type: SUMMON
	},
	nlv2: {
		name: "Lava Spawn",
		suffix: "Level 2",
		race: NEUTRAL,
		type: SUMMON
	},
	nlv3: {
		name: "Lava Spawn",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON
	},
	ngsp: {
		name: "Goblin Sappers",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			asds: "Kaboom!"
		}
	},
	ngir: {
		name: "Goblin Shredder",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			ahr3: "Gather"
		}
	},
	nzep: {
		name: "Goblin Zeppelin",
		race: NEUTRAL,
		type: NOATTACK,
		commands: {
			aloa: "Load",
			adro: "Unload All"
		}
	},
	ngme: {
		name: "Goblin Merchant",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			bspd: "Purchase Boots of Speed",
			prvt: "Purchase Periapt of Vitality",
			cnob: "Purchase Circlet of Nobility",
			dust: "Purchase Dust of Appearance",
			spro: "Purchase Scroll of Protection",
			pinv: "Purchase Potion of Invisibility",
			stwp: "Purchase Scroll of Town Portal",
			stel: "Purchase Staff of Teleportation",
			tret: "Purchase Tome of Retraining",
			shea: "Purchase Scroll of Healing",
			pnvl: "Purchase Potion of Lesser Invulnerability",
			anei: "Select User"
		}
	},
	ngad: {
		name: "Goblin Laboratory",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			ngsp: "Hire Goblin Sapper",
			nzep: "Hire Goblin Zeppelin",
			ngir: "Hire Goblin Shredder",
			andt: "Reveal"
		}
	},
	nshp: {
		name: "Goblin Shipyard",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nbot: "Hire Transport Ship"
		}
	},
	ntav: {
		name: "Tavern",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nngs: "Summon Naga Sea Witch",
			nbrn: "Summon Dark Ranger",
			npbm: "Summon Pandaren Brewmaster",
			nfir: "Summon Firelord",
			nplh: "Summon Pit Lord",
			nbst: "Summon Beastmaster",
			ntin: "Summon Tinker",
			nalc: "Summon Alchemist"
		}
	},
	ndrr: {
		name: "Red Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nrdk: "Summon Red Dragon Whelp",
			nrdr: "Summon Red Drake",
			nrwm: "Summon Red Dragon"
		}
	},
	ndrg: {
		name: "Green Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			ngrw: "Summon Green Dragon Whelp",
			ngdk: "Summon Green Drake",
			ngrd: "Summon Green Dragon"
		}
	},
	ndru: {
		name: "Blue Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nadw: "Summon Blue Dragon Whelp",
			nadk: "Summon Blue Drake",
			nadr: "Summon Blue Dragon"
		}
	},
	ndrz: {
		name: "Bronze Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nbzw: "Summon Bronze Dragon Whelp",
			nbzk: "Summon Bronze Drake",
			nbzd: "Summon Bronze Dragon"
		}
	},
	ndrk: {
		name: "Black Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nbdr: "Summon Black Dragon Whelp",
			nbdk: "Summon Black Drake",
			nbwm: "Summon Black Dragon"
		}
	},
	ndro: {
		name: "Nether Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nnht: "Summon Nether Dragon Hatchling",
			nndk: "Summon Nether Drake",
			nndr: "Summon Nether Dragon"
		}
	},
	nmer: {
		name: "Mercenary Camp",
		suffix: "Lordaeron Summer",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nfsp: "Hire Forest Troll Shadow Priest",
			nftb: "Hire Forest Troll Berserker",
			ngrk: "Summon Mud Golem",
			nogm: "Hire Ogre Mauler"
		}
	},
	nmr2: {
		name: "Mercenary Camp",
		suffix: "Lordaeron Fall",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			ngnb: "Hire Gnoll Brute",
			ngnw: "Hire Gnoll Warden",
			ngrk: "Summon Mud Golem",
			nomg: "Hire Ogre Magi"
		}
	},
	nmr3: {
		name: "Mercenary Camp",
		suffix: "Lordaeron Winter",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nitt: "Hire Ice Troll Trapper",
			nits: "Hire Ice Troll Berserker",
			ngrk: "Summon Mud Golem",
			ngnv: "Hire Gnoll Overseer"
		}
	},
	nmr4: {
		name: "Mercenary Camp",
		suffix: "Barrens",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			ncen: "Hire Centaur Outrunner",
			nhrr: "Hire Harpy Rogue",
			nhrw: "Hire Harpy Windwitch",
			nrzm: "Hire Razormane Medicine Man"
		}
	},
	nmr5: {
		name: "Mercenary Camp",
		suffix: "Ashenvale",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nfrs: "Hire Furbolg Shaman",
			nthl: "Hire Thunder Lizard",
			nsts: "Hire Satyr Shadowdancer"
		}
	},
	nmr6: {
		name: "Mercenary Camp",
		suffix: "Felwood",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nmfs: "Hire Murloc Flesheater",
			nslf: "Summon Sludge Flinger",
			nstl: "Hire Satyr Soulstealer"
		}
	},
	nmr7: {
		name: "Mercenary Camp",
		suffix: "Northrend",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nnwa: "Hire Nerubian Warrior",
			nits: "Hire Ice Troll Berserker",
			nnwl: "Hire Nerubian Webspinner",
			nrvs: "Summon Frost Revenant"
		}
	},
	nmr8: {
		name: "Mercenary Camp",
		suffix: "Cityscape",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nass: "Hire Assassin",
			nrog: "Hire Rogue",
			nkog: "Hire Kobold Geomancer",
			nfsh: "Hire Forest Troll High Priest"
		}
	},
	nmr9: {
		name: "Mercenary Camp",
		suffix: "Dalaran",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nass: "Hire Assassin",
			nrog: "Hire Rogue",
			nkog: "Hire Kobold Geomancer",
			nfsh: "Hire Forest Troll High Priest"
		}
	},
	nmr0: {
		name: "Mercenary Camp",
		suffix: "Village",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nass: "Hire Assassin",
			nkob: "Hire Kobold",
			nkog: "Hire Kobold Geomancer",
			nmrr: "Hire Murloc Huntsman"
		}
	},
	nmra: {
		name: "Mercenary Camp",
		suffix: "Dungeon",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nskf: "Hire Burning Archer",
			nowb: "Summon Wildkin",
			nkog: "Hire Kobold Geomancer"
		}
	},
	nmrb: {
		name: "Mercenary Camp",
		suffix: "Underground",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nskf: "Hire Burning Archer",
			nowb: "Summon Wildkin",
			nkog: "Hire Kobold Geomancer"
		}
	},
	nmrc: {
		name: "Mercenary Camp",
		suffix: "Sunken Ruins",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			ntrt: "Summon Giant Sea Turtle",
			nlsn: "Hire Makrura Snapper",
			nmsn: "Hire Mur'gul Snarecaster",
			nlds: "Hire Makrura Deepseer"
		}
	},
	nmrd: {
		name: "Mercenary Camp",
		suffix: "Icecrown Glacier",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			nanm: "Hire Barbed Arachnathid",
			nbdm: "Hire Blue Dragonspawn Meddler",
			nfps: "Hire Polar Furbolg Shaman",
			nmgw: "Hire Magnataur Warrior"
		}
	},
	nmre: {
		name: "Mercenary Camp",
		suffix: "Outland",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			npfl: "Summon Fel Beast",
			ndrm: "Hire Draenei Disciple",
			nvdw: "Hire Voidwalker",
			ndrd: "Hire Draenei Darkslayer"
		}
	},
	nmrf: {
		name: "Mercenary Camp",
		suffix: "Black Citadel",
		race: NEUTRAL,
		type: BUILDING,
		commands: {
			npfl: "Summon Fel Beast",
			ndrm: "Hire Draenei Disciple",
			nvdw: "Hire Voidwalker",
			ndrd: "Hire Draenei Darkslayer"
		}
	},
	nanm: {
		name: "Barbed Arachnathid",
		suffix: "Mercenary",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			abu5: "Burrow"
		}
	},
	nanb: {
		name: "Barbed Arachnathid",
		suffix: "Creep",
		race: NEUTRAL,
		type: UNIT
	},
	nanc: {
		name: "Crystal Arachnathid",
		race: NEUTRAL,
		type: UNIT
	},
	nanw: {
		name: "Warrior Arachnathid",
		race: NEUTRAL,
		type: UNIT
	},
	nane: {
		name: "Arachnathid Earth-borer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acvs: "Envenomed Weapons",
			acss: "Shadow Strike"
		}
	},
	nano: {
		name: "Overlord Arachnathid",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acac: "Command Aura"
		}
	},
	nban: {
		name: "Bandit",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			ashm: "Shadowmeld"
		}
	},
	nbrg: {
		name: "Brigand",
		race: NEUTRAL,
		type: UNIT
	},
	nrog: {
		name: "Rogue",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			ashm: "Shadowmeld"
		}
	},
	nass: {
		name: "Assassin",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			ashm: "Shadowmeld",
			acvs: "Envenomed Weapons"
		}
	},
	nenf: {
		name: "Enforcer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			ashm: "Shadowmeld",
			acev: "Evasion"
		}
	},
	nbld: {
		name: "Bandit Lord",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			ashm: "Shadowmeld",
			acav: "Devotion Aura",
			acds: "Divine Shield"
		}
	},
	nbdm: {
		name: "Blue Dragonspawn Meddler",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acev: "Evasion"
		}
	},
	nbda: {
		name: "Blue Dragonspawn Apprentice",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acrj: "Rejuvenation",
			acev: "Evasion"
		}
	},
	nbdw: {
		name: "Blue Dragonspawn Warrior",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acev: "Evasion"
		}
	},
	nbds: {
		name: "Blue Dragonspawn Sorcerer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acfn: "Frost Nova",
			acev: "Evasion"
		}
	},
	nbdo: {
		name: "Blue Dragonspawn Overseer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acev: "Evasion",
			acav: "Devotion Aura",
			acbf: "Breath of Frost"
		}
	},
	ncea: {
		name: "Centaur Archer",
		race: NEUTRAL,
		type: UNIT
	},
	ncer: {
		name: "Centaur Drudge",
		race: NEUTRAL,
		type: UNIT
	},
	ncim: {
		name: "Centaur Impaler",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsa: "Searing Arrows"
		}
	},
	ncen: {
		name: "Centaur Outrunner",
		race: NEUTRAL,
		type: UNIT
	},
	ncks: {
		name: "Centaur Sorcerer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbl: "Bloodlust",
			acdm: "Abolish Magic"
		}
	},
	ncnk: {
		name: "Centaur Khan",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			scae: "Endurance Aura",
			acrn: "Reincarnation",
			awrs: "War Stomp"
		}
	},
	nscb: {
		name: "Spider Crab Shorecrawler",
		race: NEUTRAL,
		type: UNIT
	},
	nsc2: {
		name: "Spider Crab Limbripper",
		race: NEUTRAL,
		type: UNIT
	},
	nsc3: {
		name: "Spider Crab Behemoth",
		race: NEUTRAL,
		type: UNIT
	},
	ndtr: {
		name: "Dark Troll",
		race: NEUTRAL,
		type: UNIT
	},
	ndtp: {
		name: "Dark Troll Shadow Priest",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anh1: "Heal"
		}
	},
	ndtt: {
		name: "Dark Troll Trapper",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acen: "Ensnare"
		}
	},
	ndtb: {
		name: "Dark Troll Berserker",
		race: NEUTRAL,
		type: UNIT
	},
	ndth: {
		name: "Dark Troll High Priest",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anh2: "Heal",
			acsl: "Sleep"
		}
	},
	ndtw: {
		name: "Dark Troll Warlord",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acat: "Trueshot Aura"
		}
	},
	ndrf: {
		name: "Draenei Guardian",
		race: NEUTRAL,
		type: UNIT
	},
	ndrm: {
		name: "Draenei Disciple",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anh1: "Heal"
		}
	},
	ndrp: {
		name: "Draenei Protector",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acen: "Ensnare"
		}
	},
	ndrw: {
		name: "Draenei Watcher",
		race: NEUTRAL,
		type: UNIT
	},
	ndrd: {
		name: "Draenei Darkslayer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acim: "Immolation"
		}
	},
	nrdk: {
		name: "Red Dragon Whelp",
		race: NEUTRAL,
		type: UNIT
	},
	nrdr: {
		name: "Red Drake",
		race: NEUTRAL,
		type: UNIT
	},
	nrwm: {
		name: "Red Dragon",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acdv: "Devour",
			acmi: "Spell Immunity"
		}
	},
	nbdr: {
		name: "Black Dragon Whelp",
		race: NEUTRAL,
		type: UNIT
	},
	nbdk: {
		name: "Black Drake",
		race: NEUTRAL,
		type: UNIT
	},
	nbwm: {
		name: "Black Dragon",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acdv: "Devour",
			acmi: "Spell Immunity"
		}
	},
	nbzw: {
		name: "Bronze Dragon Whelp",
		race: NEUTRAL,
		type: UNIT
	},
	nbzk: {
		name: "Bronze Drake",
		race: NEUTRAL,
		type: UNIT
	},
	nbzd: {
		name: "Bronze Dragon",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acdv: "Devour",
			acmi: "Spell Immunity"
		}
	},
	ngrw: {
		name: "Green Dragon Whelp",
		race: NEUTRAL,
		type: UNIT
	},
	ngdk: {
		name: "Green Drake",
		race: NEUTRAL,
		type: UNIT
	},
	ngrd: {
		name: "Green Dragon",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acdv: "Devour",
			acmi: "Spell Immunity"
		}
	},
	nadw: {
		name: "Blue Dragon Whelp",
		race: NEUTRAL,
		type: UNIT
	},
	nadk: {
		name: "Blue Drake",
		race: NEUTRAL,
		type: UNIT
	},
	nadr: {
		name: "Blue Dragon",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acdv: "Devour",
			acmi: "Spell Immunity"
		}
	},
	nnht: {
		name: "Nether Dragon Hatchling",
		race: NEUTRAL,
		type: UNIT
	},
	nndk: {
		name: "Nether Drake",
		race: NEUTRAL,
		type: UNIT
	},
	nndr: {
		name: "Nether Dragon",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accr: "Cripple",
			acmi: "Spell Immunity"
		}
	},
	nrel: {
		name: "Reef Elemental",
		race: NEUTRAL,
		type: UNIT
	},
	nele: {
		name: "Enraged Elemental",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity"
		}
	},
	nelb: {
		name: "Berserk Elemental",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity",
			acfn: "Frost Nova"
		}
	},
	nenc: {
		name: "Corrupted Treant",
		race: NEUTRAL,
		type: UNIT
	},
	nenp: {
		name: "Poison Treant",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			aenr: "Entangling Roots",
			acvs: "Envenomed Weapons"
		}
	},
	nepl: {
		name: "Plague Treant",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			aenr: "Entangling Roots",
			aap3: "Disease Cloud"
		}
	},
	ners: {
		name: "Eredar Sorcerer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acdm: "Abolish Magic",
			acsl: "Sleep"
		}
	},
	nerd: {
		name: "Eredar Diabolist",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acpa: "Parasite",
			anfb: "Firebolt"
		}
	},
	nerw: {
		name: "Eredar Warlock",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbh: "Bash",
			acfd: "Finger of Pain",
			acmf: "Mana Shield"
		}
	},
	nfor: {
		name: "Faceless One Trickster",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accs: "Curse",
			acpu: "Purge"
		}
	},
	nfot: {
		name: "Faceless One Terror",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsl: "Sleep",
			acmf: "Mana Shield"
		}
	},
	nfod: {
		name: "Faceless One Deathbringer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acad: "Animate Dead",
			acsi: "Silence"
		}
	},
	nfgu: {
		name: "Felguard",
		race: NEUTRAL,
		type: UNIT
	},
	nfgb: {
		name: "Bloodfiend",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acce: "Cleaving Attack"
		}
	},
	nfov: {
		name: "Overlord",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acht: "Howl of Terror",
			acce: "Cleaving Attack",
			acvp: "Vampiric Aura"
		}
	},
	npfl: {
		name: "Fel Beast",
		race: NEUTRAL,
		type: UNIT
	},
	nfel: {
		name: "Fel Stalker",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			ambb: "Mana Burn"
		}
	},
	npfm: {
		name: "Fel Ravager",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbk: "Black Arrow",
			acde: "Devour Magic"
		}
	},
	nftr: {
		name: "Forest Troll",
		race: NEUTRAL,
		type: UNIT
	},
	nfsp: {
		name: "Forest Troll Shadow Priest",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anh1: "Heal",
			acdm: "Abolish Magic"
		}
	},
	nftt: {
		name: "Forest Troll Trapper",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acen: "Ensnare"
		}
	},
	nftb: {
		name: "Forest Troll Berserker",
		race: NEUTRAL,
		type: UNIT
	},
	nfsh: {
		name: "Forest Troll High Priest",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anh2: "Heal",
			acif: "Inner Fire",
			acd2: "Abolish Magic"
		}
	},
	nftk: {
		name: "Forest Troll Warlord",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acat: "Trueshot Aura"
		}
	},
	nfrl: {
		name: "Furbolg",
		race: NEUTRAL,
		type: UNIT
	},
	nfrs: {
		name: "Furbolg Shaman",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acr2: "Rejuvenation"
		}
	},
	nfrp: {
		name: "Pandaren",
		race: NEUTRAL,
		type: UNIT
	},
	nfrb: {
		name: "Furbolg Tracker",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acff: "Faerie Fire"
		}
	},
	nfrg: {
		name: "Furbolg Champion",
		race: NEUTRAL,
		type: UNIT
	},
	nfre: {
		name: "Furbolg Elder Shaman",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acr2: "Rejuvenation",
			acls: "Lightning Shield"
		}
	},
	nfra: {
		name: "Furbolg Ursa Warrior",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			awrs: "War Stomp",
			acac: "Command Aura"
		}
	},
	ngh1: {
		name: "Ghost",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acps: "Possession"
		}
	},
	ngh2: {
		name: "Wraith",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acps: "Possession",
			accs: "Curse"
		}
	},
	nsgn: {
		name: "Sea Giant",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acpv: "Pulverize"
		}
	},
	nsgh: {
		name: "Sea Giant Hunter",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acpv: "Pulverize",
			acen: "Ensnare"
		}
	},
	nsgb: {
		name: "Sea Giant Behemoth",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			actb: "Hurl Boulder",
			acpv: "Pulverize",
			awrs: "War Stomp"
		}
	},
	nspb: {
		name: "Black Spider",
		race: NEUTRAL,
		type: UNIT
	},
	nspg: {
		name: "Forest Spider",
		race: NEUTRAL,
		type: UNIT
	},
	nspr: {
		name: "Spider",
		race: NEUTRAL,
		type: UNIT
	},
	nssp: {
		name: "Spitting Spider",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acvs: "Envenomed Weapons"
		}
	},
	nsgt: {
		name: "Giant Spider",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acvs: "Envenomed Weapons",
			acen: "Ensnare"
		}
	},
	nsbm: {
		name: "Brood Mother",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acvs: "Envenomed Weapons",
			acen: "Ensnare"
		}
	},
	ngno: {
		name: "Gnoll",
		race: NEUTRAL,
		type: UNIT
	},
	ngna: {
		name: "Gnoll Poacher",
		race: NEUTRAL,
		type: UNIT
	},
	ngns: {
		name: "Gnoll Assassin",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acvs: "Envenomed Weapons"
		}
	},
	ngnb: {
		name: "Gnoll Brute",
		race: NEUTRAL,
		type: UNIT
	},
	ngnw: {
		name: "Gnoll Warden",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acpu: "Purge"
		}
	},
	ngnv: {
		name: "Gnoll Overseer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acac: "Command Aura"
		}
	},
	ngrk: {
		name: "Mud Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity",
			acsw: "Slow"
		}
	},
	ngst: {
		name: "Rock Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity",
			actb: "Hurl Boulder"
		}
	},
	nggr: {
		name: "Granite Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity",
			actb: "Hurl Boulder",
			actc: "Slam"
		}
	},
	narg: {
		name: "Battle Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity"
		}
	},
	nwrg: {
		name: "War Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity"
		}
	},
	nsgg: {
		name: "Siege Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity"
		}
	},
	nhar: {
		name: "Harpy Scout",
		race: NEUTRAL,
		type: UNIT
	},
	nhrr: {
		name: "Harpy Rogue",
		race: NEUTRAL,
		type: UNIT
	},
	nhrw: {
		name: "Harpy Windwitch",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acff: "Faerie Fire"
		}
	},
	nhrh: {
		name: "Harpy Storm-hag",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accs: "Curse",
			acsl: "Sleep"
		}
	},
	nhrq: {
		name: "Harpy Queen",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acr2: "Rejuvenation",
			accy: "Cyclone"
		}
	},
	nhfp: {
		name: "Fallen Priest",
		race: NEUTRAL,
		type: UNIT
	},
	nhdc: {
		name: "Deceiver",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accs: "Curse"
		}
	},
	nhhr: {
		name: "Heretic",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acrd: "Raise Dead",
			acca: "Carrion Swarm"
		}
	},
	nhyh: {
		name: "Hydra Hatchling",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			aspo: "Slow Poison"
		}
	},
	nhyd: {
		name: "Hydra",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			aspo: "Slow Poison"
		}
	},
	nehy: {
		name: "Elder Hydra",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acff: "Faerie Fire"
		}
	},
	nahy: {
		name: "Ancient Hydra",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			aspo: "Slow Poison",
			awrh: "War Stomp",
			acdv: "Devour"
		}
	},
	nitr: {
		name: "Ice Troll",
		race: NEUTRAL,
		type: UNIT
	},
	nitp: {
		name: "Ice Troll Priest",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anh1: "Heal"
		}
	},
	nitt: {
		name: "Ice Troll Trapper",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acen: "Ensnare"
		}
	},
	nits: {
		name: "Ice Troll Berserker",
		race: NEUTRAL,
		type: UNIT
	},
	nith: {
		name: "Ice Troll High Priest",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anh2: "Heal",
			acf2: "Frost Armor",
			acd2: "Abolish Magic"
		}
	},
	nitw: {
		name: "Ice Troll Warlord",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acat: "Trueshot Aura"
		}
	},
	ninc: {
		name: "Infernal Contraption",
		race: NEUTRAL,
		type: UNIT
	},
	ninm: {
		name: "Infernal Machine",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbc: "Breath of Fire"
		}
	},
	nina: {
		name: "Infernal Juggernaut",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anin: "Inferno"
		}
	},
	nkob: {
		name: "Kobold",
		race: NEUTRAL,
		type: UNIT
	},
	nkog: {
		name: "Kobold Geomancer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsw: "Slow",
			acdm: "Abolish Magic"
		}
	},
	nkot: {
		name: "Kobold Tunneler",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbh: "Bash"
		}
	},
	nkol: {
		name: "Kobold Taskmaster",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acac: "Command Aura",
			acbh: "Bash"
		}
	},
	nltl: {
		name: "Lightning Lizard",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acpu: "Purge"
		}
	},
	nthl: {
		name: "Thunder Lizard",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			act2: "Slam"
		}
	},
	nstw: {
		name: "Storm Wyrm",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acls: "Lightning Shield",
			accl: "Chain Lightning",
			acdv: "Devour"
		}
	},
	nlpr: {
		name: "Makrura Prawn",
		race: NEUTRAL,
		type: UNIT
	},
	nlpd: {
		name: "Makrura Pooldweller",
		race: NEUTRAL,
		type: UNIT
	},
	nltc: {
		name: "Makrura Tidecaller",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anh1: "Heal",
			acf2: "Frost Armor"
		}
	},
	nlds: {
		name: "Makrura Deepseer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			aenw: "Entangling Roots",
			aslp: "Summon Prawns"
		}
	},
	nlsn: {
		name: "Makrura Snapper",
		race: NEUTRAL,
		type: UNIT
	},
	nlkl: {
		name: "Makrura Tidal Lord",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acce: "Cleaving Attack",
			acav: "Devotion Aura"
		}
	},
	nwiz: {
		name: "Apprentice Wizard",
		race: NEUTRAL,
		type: UNIT
	},
	nwzr: {
		name: "Rogue Wizard",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acf2: "Frost Armor"
		}
	},
	nwzg: {
		name: "Renegade Wizard",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acpu: "Purge",
			acls: "Lightning Shield"
		}
	},
	nwzd: {
		name: "Dark Wizard",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acrd: "Raise Dead",
			acba: "Brilliance Aura",
			acpy: "Polymorph"
		}
	},
	nmgw: {
		name: "Magnataur Warrior",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity"
		}
	},
	nmgr: {
		name: "Magnataur Reaver",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity",
			accb: "Frost Bolt"
		}
	},
	nmgd: {
		name: "Magnataur Destroyer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmi: "Spell Immunity",
			accb: "Frostbolt",
			actc: "Slam"
		}
	},
	nmam: {
		name: "Mammoth",
		race: NEUTRAL,
		type: UNIT
	},
	nmit: {
		name: "Icetusk Mammoth",
		race: NEUTRAL,
		type: UNIT
	},
	nmdr: {
		name: "Dire Mammoth",
		race: NEUTRAL,
		type: UNIT
	},
	nmcf: {
		name: "Mur'gul Cliffrunner",
		race: NEUTRAL,
		type: UNIT
	},
	nmbg: {
		name: "Mur'gul Blood-Gill",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anh1: "Heal"
		}
	},
	nmtw: {
		name: "Mur'gul Tidewarrior",
		race: NEUTRAL,
		type: UNIT
	},
	nmsn: {
		name: "Mur'gul Snarecaster",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsw: "Slow",
			acdm: "Abolish Magic"
		}
	},
	nmrv: {
		name: "Mur'gul Marauder",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acac: "Command Aura"
		}
	},
	nmsc: {
		name: "Mur'gul Shadowcaster",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			achx: "Hex",
			accs: "Curse"
		}
	},
	nmrl: {
		name: "Murloc Tiderunner",
		race: NEUTRAL,
		type: UNIT
	},
	nmrr: {
		name: "Murloc Huntsman",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acen: "Ensnare"
		}
	},
	nmpg: {
		name: "Murloc Plaguebearer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			aap3: "Disease Cloud"
		}
	},
	nmfs: {
		name: "Murloc Flesheater",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accn: "Cannibalize"
		}
	},
	nmrm: {
		name: "Murloc Nightcrawler",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acvs: "Envenomed Weapons",
			ashm: "Shadowmeld"
		}
	},
	nmmu: {
		name: "Murloc Mutant",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accr: "Cripple"
		}
	},
	nspd: {
		name: "Spiderling",
		race: NEUTRAL,
		type: UNIT
	},
	nnwa: {
		name: "Nerubian Warrior",
		race: NEUTRAL,
		type: UNIT
	},
	nnwl: {
		name: "Nerubian Webspinner",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acwb: "Web",
			acrd: "Raise Dead"
		}
	},
	nnwr: {
		name: "Nerubian Seer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acrd: "Raise Dead",
			acdm: "Abolish Magic"
		}
	},
	nnws: {
		name: "Nerubian Spider Lord",
		race: NEUTRAL,
		type: UNIT
	},
	nnwq: {
		name: "Nerubian Queen",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acua: "Unholy Aura",
			acca: "Carrion Swarm",
			acrd: "Raise Dead"
		}
	},
	nogr: {
		name: "Ogre Warrior",
		race: NEUTRAL,
		type: UNIT
	},
	nomg: {
		name: "Ogre Magi",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbb: "Bloodlust"
		}
	},
	nogm: {
		name: "Ogre Mauler",
		race: NEUTRAL,
		type: UNIT
	},
	nogl: {
		name: "Ogre Lord",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acav: "Devotion Aura",
			acsh: "Shockwave"
		}
	},
	nowb: {
		name: "Wildkin",
		race: NEUTRAL,
		type: UNIT
	},
	nowe: {
		name: "Enraged Wildkin",
		race: NEUTRAL,
		type: UNIT
	},
	nowk: {
		name: "Berserk Wildkin",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbh: "Bash",
			awrs: "War Stomp"
		}
	},
	nplb: {
		name: "Polar Bear",
		race: NEUTRAL,
		type: UNIT
	},
	nplg: {
		name: "Giant Polar Bear",
		race: NEUTRAL,
		type: UNIT
	},
	nfpl: {
		name: "Polar Furbolg",
		race: NEUTRAL,
		type: UNIT
	},
	nfps: {
		name: "Polar Furbolg Shaman",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acf2: "Frost Armor",
			acdm: "Abolish Magic"
		}
	},
	nfpt: {
		name: "Polar Furbolg Tracker",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsw: "Slow"
		}
	},
	nfpc: {
		name: "Polar Furbolg Champion",
		race: NEUTRAL,
		type: UNIT
	},
	nfpe: {
		name: "Polar Furbolg Elder Shaman",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			achv: "Healing Wave",
			acfn: "Frost Nova"
		}
	},
	nfpu: {
		name: "Polar Furbolg Ursa Warrior",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			awrs: "War Stomp",
			acac: "Command Aura"
		}
	},
	nrzt: {
		name: "Quillboar",
		race: NEUTRAL,
		type: UNIT
	},
	nrzs: {
		name: "Razormane Scout",
		race: NEUTRAL,
		type: UNIT
	},
	nqbh: {
		name: "Quillboar Hunter",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acev: "Evasion"
		}
	},
	nrzb: {
		name: "Razormane Brute",
		race: NEUTRAL,
		type: UNIT
	},
	nrzm: {
		name: "Razormane Medicine Man",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			achw: "Healing Ward",
			acs9: "Feral Spirit"
		}
	},
	nrzg: {
		name: "Razormane Chieftain",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acah: "Thorns Aura",
			actb: "Hurl Boulder"
		}
	},
	nrvf: {
		name: "Fire Revenant",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acim: "Immolation"
		}
	},
	ntrv: {
		name: "Revenant of the Tides",
		race: NEUTRAL,
		type: UNIT
	},
	nrvs: {
		name: "Frost Revenant",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbz: "Blizzard"
		}
	},
	nsrv: {
		name: "Revenant of the Seas",
		race: NEUTRAL,
		type: UNIT
	},
	nrvl: {
		name: "Lightning Revenant",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acpu: "Purge",
			accl: "Chain Lightning"
		}
	},
	nrvi: {
		name: "Ice Revenant",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acvp: "Vampiric Aura",
			acfn: "Frost Nova"
		}
	},
	ndrv: {
		name: "Revenant of the Depths",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acwe: "Summon Sea Elemental"
		}
	},
	nrvd: {
		name: "Death Revenant",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acrd: "Raise Dead",
			acdc: "Death Coil",
			acad: "Animate Dead"
		}
	},
	nlrv: {
		name: "Deeplord Revenant",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accv: "Crushing Wave",
			acf2: "Frost Armor"
		}
	},
	nslh: {
		name: "Salamander Hatchling",
		race: NEUTRAL,
		type: UNIT
	},
	nslr: {
		name: "Salamander",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acim: "Immolation",
			acfb: "Firebolt"
		}
	},
	nslv: {
		name: "Salamander Vizier",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbl: "Bloodlust",
			ambd: "Mana Burn",
			acdm: "Abolish Magic"
		}
	},
	nsll: {
		name: "Salamander Lord",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acim: "Immolation",
			acrf: "Rain of Fire",
			acdv: "Devour"
		}
	},
	nsqt: {
		name: "Sasquatch",
		race: NEUTRAL,
		type: UNIT
	},
	nsqe: {
		name: "Elder Sasquatch",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbh: "Bash",
			acfr: "Force of Nature"
		}
	},
	nsqo: {
		name: "Sasquatch Oracle",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acrj: "Rejuvenation",
			acro: "Roar"
		}
	},
	nsqa: {
		name: "Ancient Sasquatch",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			actc: "Slam",
			acfr: "Force of Nature",
			acrn: "Reincarnation"
		}
	},
	nsty: {
		name: "Satyr",
		race: NEUTRAL,
		type: UNIT
	},
	nsat: {
		name: "Satyr Trickster",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acpu: "Purge"
		}
	},
	nsts: {
		name: "Satyr Shadowdancer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accs: "Curse",
			ashm: "Shadowmeld"
		}
	},
	nstl: {
		name: "Satyr Soulstealer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			ambd: "Mana Burn",
			acrd: "Raise Dead"
		}
	},
	nsth: {
		name: "Satyr Hellcaller",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbl: "Bloodlust",
			acua: "Unholy Aura",
			acad: "Animate Dead"
		}
	},
	nsko: {
		name: "Skeletal Orc",
		race: NEUTRAL,
		type: UNIT
	},
	nsog: {
		name: "Skeletal Orc Grunt",
		race: NEUTRAL,
		type: UNIT
	},
	nsoc: {
		name: "Skeletal Orc Champion",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acdc: "Death Coil"
		}
	},
	nslm: {
		name: "Sludge Minion",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsw: "Slow"
		}
	},
	nslf: {
		name: "Sludge Flinger",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsw: "Slow"
		}
	},
	nsln: {
		name: "Sludge Monstrosity",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsw: "Slow"
		}
	},
	nsra: {
		name: "Stormreaver Apprentice",
		race: NEUTRAL,
		type: UNIT
	},
	nsrh: {
		name: "Stormreaver Hermit",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acpu: "Purge"
		}
	},
	nsrn: {
		name: "Stormreaver Necrolyte",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbl: "Bloodlust",
			accl: "Chain Lightning"
		}
	},
	nsrw: {
		name: "Stormreaver Warlock",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acmo: "Monsoon",
			acad: "Animate Dead"
		}
	},
	ndqn: {
		name: "Succubus",
		race: NEUTRAL,
		type: UNIT
	},
	ndqv: {
		name: "Vile Tormentor",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsi: "Silence"
		}
	},
	ndqt: {
		name: "Vile Temptress",
		race: NEUTRAL,
		type: UNIT
	},
	ndqp: {
		name: "Maiden of Pain",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acdr: "Life Drain",
			acss: "Shadow Strike"
		}
	},
	ndqs: {
		name: "Queen of Suffering",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acdc: "Death Coil",
			acua: "Unholy Aura",
			acch: "Charm"
		}
	},
	ntrh: {
		name: "Sea Turtle Hatchling",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anth: "Spiked Shell"
		}
	},
	ntrs: {
		name: "Sea Turtle",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anth: "Spiked Shell"
		}
	},
	ntrt: {
		name: "Giant Sea Turtle",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anth: "Spiked Shell"
		}
	},
	ntrg: {
		name: "Gargantuan Sea Turtle",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			anth: "Spiked Shell"
		}
	},
	ntrd: {
		name: "Dragon Turtle",
		suffix: "Creep",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acc2: "Crushing Wave",
			acdv: "Devour",
			ant2: "Spiked Shell"
		}
	},
	ntkf: {
		name: "Tuskarr Fighter",
		race: NEUTRAL,
		type: UNIT
	},
	ntka: {
		name: "Tuskarr Spearman",
		race: NEUTRAL,
		type: UNIT
	},
	ntkh: {
		name: "Tuskarr Healer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acdm: "Abolish Magic",
			anh1: "Heal"
		}
	},
	ntkt: {
		name: "Tuskarr Trapper",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acen: "Ensnare"
		}
	},
	ntkw: {
		name: "Tuskarr Warrior",
		race: NEUTRAL,
		type: UNIT
	},
	ntks: {
		name: "Tuskarr Sorcerer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acif: "Inner Fire"
		}
	},
	ntkc: {
		name: "Tuskarr Chieftain",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acac: "Command Aura"
		}
	},
	nubk: {
		name: "Unbroken Darkhunter",
		race: NEUTRAL,
		type: UNIT
	},
	nubr: {
		name: "Unbroken Rager",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acen: "Ensnare"
		}
	},
	nubw: {
		name: "Unbroken Darkweaver",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acuf: "Unholy Frenzy"
		}
	},
	nvdl: {
		name: "Lesser Voidwalker",
		race: NEUTRAL,
		type: UNIT
	},
	nvdw: {
		name: "Voidwalker",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accw: "Cold Arrows"
		}
	},
	nvdg: {
		name: "Greater Voidwalker",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acf2: "Frost Armor",
			accl: "Chain Lightning"
		}
	},
	nvde: {
		name: "Elder Voidwalker",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acfl: "Forked Lightning",
			acde: "Devour Magic"
		}
	},
	nwen: {
		name: "Wendigo",
		race: NEUTRAL,
		type: UNIT
	},
	nwnr: {
		name: "Elder Wendigo",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acbh: "Bash"
		}
	},
	nwns: {
		name: "Wendigo Shaman",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acrj: "Rejuvenation",
			acro: "Roar"
		}
	},
	nwna: {
		name: "Ancient Wendigo",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			awrs: "War Stomp",
			acbh: "Bash",
			acrn: "Reincarnation"
		}
	},
	nwwf: {
		name: "Frost Wolf",
		race: NEUTRAL,
		type: UNIT
	},
	nwlt: {
		name: "Timber Wolf",
		race: NEUTRAL,
		type: UNIT
	},
	nwwg: {
		name: "Giant Frost Wolf",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acct: "Critical Strike"
		}
	},
	nwlg: {
		name: "Giant Wolf",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acct: "Critical Strike"
		}
	},
	nwwd: {
		name: "Dire Frost Wolf",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acct: "Critical Strike",
			acro: "Roar"
		}
	},
	nwld: {
		name: "Dire Wolf",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acct: "Critical Strike",
			acro: "Roar"
		}
	},
	nska: {
		name: "Skeleton Archer",
		race: NEUTRAL,
		type: UNIT
	},
	nskf: {
		name: "Burning Archer",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			acsa: "Searing Arrows"
		}
	},
	nskm: {
		name: "Skeletal Marksman",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accw: "Cold Arrows"
		}
	},
	nbal: {
		name: "Doom Guard",
		suffix: "Creep",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			accr: "Cripple",
			adsm: "Dispel Magic",
			awrs: "War Stomp",
			acrf: "Rain of Fire",
			acsk: "Resistant Skin"
		}
	},
	ndrj: {
		name: "Dalaran Reject",
		race: NEUTRAL,
		type: UNIT
	},
	ndmu: {
		name: "Dalaran Mutant",
		race: NEUTRAL,
		type: UNIT
	},
	nske: {
		name: "Skeleton Warrior",
		race: NEUTRAL,
		type: UNIT
	},
	nskg: {
		name: "Giant Skeleton Warrior",
		race: NEUTRAL,
		type: UNIT
	},
	njg1: {
		name: "Jungle Stalker",
		race: NEUTRAL,
		type: UNIT
	},
	njga: {
		name: "Elder Jungle Stalker",
		race: NEUTRAL,
		type: UNIT
	},
	njgb: {
		name: "Enraged Jungle Stalker",
		race: NEUTRAL,
		type: UNIT,
		commands: {
			actc: "Slam"
		}
	}
};