"use strict";

const NEUTRAL = "neutral";
const HUMAN = "human";
const ORC = "orc";
const UNDEAD = "undead";
const NIGHT_ELF = "nightelf";
const BLOOD_ELF = "bloodelf";
const DRAENEI = "draenei";
const DEMON = "demon";
const NAGA = "naga";

const OTHER = 0;
const UNIT = 1;
const HERO = 2;
const NO_ATTACK = 3;
const SUMMON = 4;
const BUILDING = 5;
const TOWER = 6;
const ITEM = 7;

const data = {};

data.common = {
	basic: [
		["cmdmove", "Move"],
		["cmdstop", "Stop"],
		["cmdholdpos", "Hold Position"],
		["cmdattack", "Attack"],
		["cmdpatrol", "Patrol"]
	],
	hero: [
		["cmdselectskill", "Hero Abilities"]
	],
	noAttack: [
		["cmdmove", "Move"],
		["cmdstop", "Stop"],
		["cmdholdpos", "Hold Position"],
		["cmdpatrol", "Patrol"]
	],
	tower: [
		["cmdstop", "Stop"],
		["cmdattack", "Attack"]
	]
};

data.units = {
	hpal: {
		name: "Paladin",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahhb", "Holy Light"],
			["ahds", "Divine Shield"],
			["ahre", "Resurrection"],
			["ahad", "Devotion Aura"]
		]
	},
	hamg: {
		name: "Archmage",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahbz", "Blizzard"],
			["ahab", "Brilliance Aura"],
			["ahwe", "Summon Water Elemental"],
			["ahmt", "Mass Teleport"]
		]
	},
	hmkg: {
		name: "Mountain King",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahtc", "Thunder Clap"],
			["ahtb", "Storm Bolt"],
			["ahbh", "Bash"],
			["ahav", "Avatar"]
		]
	},
	hblm: {
		name: "Blood Mage",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahfs", "Flame Strike"],
			["ahbn", "Banish"],
			["ahdr", "Siphon Mana"],
			["ahpx", "Phoenix"]
		]
	},
	hpea: {
		name: "Peasant",
		race: HUMAN,
		type: UNIT,
		commands: [
			["ahar", "Gather"],
			["ahrp", "Repair"],
			["amil", "Call to Arms"],
			["ahlh", "Lumber Harvesting"],
			["cmdbuildhuman", "Build Structure"],
			["cmdcancelbuild", "Cancel"]
		],
		build: "cmdbuildhuman"
	},
	cmdbuildhuman: {
		name: "Build Structure",
		race: HUMAN,
		type: OTHER,
		commands: [
			["htow", "Build Town Hall"],
			["hbar", "Build Barracks"],
			["hlum", "Build Lumber Mill"],
			["hbla", "Build Blacksmith"],
			["hhou", "Build Farm"],
			["halt", "Build Altar of Kings"],
			["hars", "Build Arcane Sanctum"],
			["harm", "Build Workshop"],
			["hwtw", "Build Scout Tower"],
			["hgra", "Build Gryphon Aviary"],
			["hvlt", "Build Arcane Vault"],
			["cmdcancel", "Cancel"]
		]
	},
	hmil: {
		name: "Militia",
		race: HUMAN,
		type: UNIT,
		commands: [
			["amil", "Back to Work"]
		]
	},
	hfoo: {
		name: "Footman",
		race: HUMAN,
		type: UNIT,
		commands: [
			["adef", "Defend"]
		]
	},
	hrif: {
		name: "Rifleman",
		race: HUMAN,
		type: UNIT,
		commands: [
			["ahri", "Long Rifles"]
		]
	},
	hkni: {
		name: "Knight",
		race: HUMAN,
		type: UNIT,
		commands: [
			["ahsb", "Sundering Blades"],
			["ahan", "Animal War Training"]
		]
	},
	hmpr: {
		name: "Priest",
		race: HUMAN,
		type: UNIT,
		commands: [
			["ahea", "Heal"],
			["ainf", "Inner Fire"],
			["adis", "Dispel Magic"]
		]
	},
	hsor: {
		name: "Sorceress",
		race: HUMAN,
		type: UNIT,
		commands: [
			["aivs", "Invisibility"],
			["aply", "Polymorph"],
			["aslo", "Slow"]
		]
	},
	hspt: {
		name: "Spell Breaker",
		race: HUMAN,
		type: UNIT,
		commands: [
			["asps", "Spell Steal"],
			["acmg", "Control Magic"],
			["amim", "Spell Immunity"],
			["afbk", "Feedback"]
		]
	},
	hgyr: {
		name: "Flying Machine",
		race: HUMAN,
		type: UNIT,
		commands: [
			["agyb", "Flying Machine Bombs"],
			["agyv", "True Sight"],
			["aflk", "Flak Cannons"]
		]
	},
	hmtm: {
		name: "Mortar Team",
		race: HUMAN,
		type: UNIT,
		commands: [
			["cmdattackground", "Attack Ground"],
			["afla", "Flare"],
			["afsh", "Fragmentation Shards"]
		]
	},
	hmtt: {
		name: "Siege Engine",
		race: HUMAN,
		type: UNIT,
		commands: [
			["aroc", "Barrage"]
		]
	},
	hrtt: {
		name: "Siege Engine",
		suffix: "with Barrage",
		race: HUMAN,
		type: UNIT,
		commands: [
			["aroc", "Barrage"]
		]
	},
	hgry: {
		name: "Gryphon Rider",
		race: HUMAN,
		type: UNIT,
		commands: [
			["asth", "Storm Hammers"],
			["ahan", "Animal War Training"]
		]
	},
	hdhw: {
		name: "Dragonhawk Rider",
		race: HUMAN,
		type: UNIT,
		commands: [
			["aclf", "Cloud"],
			["amls", "Aerial Shackles"],
			["ahan", "Animal War Training"]
		]
	},
	htow: {
		name: "Town Hall",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hpea", "Train Peasant"],
			["rhpm", "Research Backpack"],
			["cmdrally", "Set Rally Point"],
			["hkee", "Upgrade to Keep"],
			["amic", "Call to Arms"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hkee: {
		name: "Keep",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hpea", "Train Peasant"],
			["rhpm", "Research Backpack"],
			["cmdrally", "Set Rally Point"],
			["hcas", "Upgrade to Keep"],
			["amic", "Call to Arms"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hcas: {
		name: "Castle",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hpea", "Train Peasant"],
			["rhpm", "Research Backpack"],
			["cmdrally", "Set Rally Point"],
			["amic", "Call to Arms"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hbar: {
		name: "Barracks",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hfoo", "Train Footman"],
			["hrif", "Train Rifleman"],
			["hkni", "Train Knight"],
			["cmdrally", "Set Rally Point"],
			["rhde", "Research Defend"],
			["rhri", "Research Long Rifles"],
			["rhsb", "Research Sundering Blades"],
			["rhan", "Research Animal War Training"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hlum: {
		name: "Lumber Mill",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["rhac", "Upgrade Masonry"],
			["rhlh", "Upgrade Lumber Harvesting"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hbla: {
		name: "Blacksmith",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["rhme", "Upgrade Forged Swords"],
			["rhar", "Upgrade Plating"],
			["rhla", "Upgrade Leather Armor"],
			["rhra", "Upgrade Gunpowder"],
			["cmdcancelbuild", "Cancel"]
		]
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
		commands: [
			["hamg", "Summon Archmage"],
			["hmkg", "Summon Mountain King"],
			["hpal", "Summon Paladin"],
			["hblm", "Summon Blood Mage"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	halt_campaign: {
		name: "Altar of Kings",
		suffix: "Campaign",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hart", "Arthas"],
			["harf", "Arthas (wielding Frostmourne)"],
			["hjai", "Jaina"],
			["hmbr", "Muradin Bronzebeard"],
			["hkal", "Kael"],
			["hlgr", "Lord Garithos"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hars: {
		name: "Arcane Sanctum",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hmpr", "Train Priest"],
			["hsor", "Train Sorceress"],
			["hspt", "Train Spell Breaker"],
			["rhpt", "Priest Training"],
			["rhst", "Sorceress Training"],
			["rhse", "Research Magic Sentry"],
			["rhss", "Research Control Magic"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	harm: {
		name: "Workshop",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hgyr", "Train Flying Machine"],
			["hmtm", "Train Mortar Team"],
			["hmtt", "Train Siege Engine"],
			["rhgb", "Research Flying Machine Bombs"],
			["rhfl", "Research Flare"],
			["rhrt", "Research Barrage"],
			["rhfc", "Research Flak Cannons"],
			["rhfs", "Research Fragmentation Shards"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	harm_barrage: {
		name: "Workshop",
		suffix: "with Barrage Tank",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hgyr", "Train Flying Machine"],
			["hmtm", "Train Mortar Team"],
			["hrtt", "Train Siege Engine (with Barrage)"],
			["rhgb", "Research Flying Machine Bombs"],
			["rhfs", "Research Fragmentation Shards"],
			["rhfc", "Research Flak Cannons"],
			["rhfl", "Research Flare"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hwtw: {
		name: "Scout Tower",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hgtw", "Upgrade to Guard Tower"],
			["hctw", "Upgrade to Cannon Tower"],
			["hatw", "Upgrade to Arcane Tower"],
			["adts", "Magic Sentry"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hgtw: {
		name: "Guard Tower",
		race: HUMAN,
		type: TOWER,
		commands: [
			["adts", "Magic Sentry"]
		]
	},
	hctw: {
		name: "Cannon Tower",
		race: HUMAN,
		type: TOWER,
		commands: [
			["cmdattackground", "Attack Ground"],
			["adts", "Magic Sentry"],
			["afsh", "Fragmentation Shards"]
		]
	},
	hatw: {
		name: "Arcane Tower",
		race: HUMAN,
		type: TOWER,
		commands: [
			["adts", "Magic Sentry"],
			["ahta", "Reveal"],
			["afbt", "Feedback"]
		]
	},
	hgra: {
		name: "Gryphon Aviary",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hgry", "Train Gryphon Rider"],
			["hdhw", "Train Dragonhawk Rider"],
			["cmdrally", "Set Rally Point"],
			["rhhb", "Research Storm Hammers"],
			["rhcd", "Research Cloud"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hvlt: {
		name: "Arcane Vault",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["sreg", "Purchase Scroll of Regeneration"],
			["mcri", "Purchase Mechanical Critter"],
			["plcl", "Purchase Lesser Clarity Potion"],
			["phea", "Purchase Potion of Healing"],
			["pman", "Purchase Potion of Mana"],
			["stwp", "Purchase Scroll of Town Portal"],
			["tsct", "Purchase Ivory Tower"],
			["ofr2", "Purchase Orb of Fire"],
			["ssan", "Purchase Staff of Sanctuary"],
			["anei", "Select User"]
		]
	},
	hshy: {
		name: "Human Shipyard",
		race: HUMAN,
		type: BUILDING,
		commands: [
			["hbot", "Hire Transport Ship"],
			["hdes", "Hire Frigate"],
			["hbsh", "Hire Battleship"],
			["ane2", "Select User"]
		]
	},
	hbot: {
		name: "Human Transport Ship",
		race: HUMAN,
		type: NO_ATTACK,
		commands: [
			["slo3", "Load"],
			["sdro", "Unload"]
		]
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
		commands: [
			["ahpe", "Phoenix"],
			["acmi", "Spell Immunity"],
			["acrk", "Resistant Skin"]
		]
	},
	hcth: {
		name: "Captain",
		race: HUMAN,
		type: UNIT,
		commands: [
			["adef", "Defend"]
		]
	},
	nmed: {
		name: "Medivh",
		race: HUMAN,
		type: UNIT,
		commands: [
			["amrf", "Raven Form"]
		]
	},
	nmdm: {
		name: "Medivh",
		suffix: "Raven Form",
		race: HUMAN,
		type: UNIT,
		commands: [
			["amrf", "Raven Form"]
		]
	},
	nemi: {
		name: "Emissary",
		race: HUMAN,
		type: UNIT,
		commands: [
			["ahea", "Heal"],
			["ainf", "Inner Fire"],
			["adis", "Dispel Magic"]
		]
	},
	nchp: {
		name: "Chaplain",
		race: HUMAN,
		type: UNIT,
		commands: [
			["anh2", "Heal"],
			["acif", "Inner Fire"],
			["adsm", "Dispel Magic"]
		]
	},
	nhym: {
		name: "Hydromancer",
		race: HUMAN,
		type: UNIT,
		commands: [
			["acsw", "Slow"],
			["acpy", "Polymorph"],
			["acc3", "Crushing Wave"]
		]
	},
	njks: {
		name: "Jailor Kassan",
		race: HUMAN,
		type: UNIT
	},
	hart: {
		name: "Arthas",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahhb", "Holy Light"],
			["ahds", "Divine Shield"],
			["ahre", "Resurrection"],
			["ahad", "Devotion Aura"]
		]
	},
	harf: {
		name: "Arthas",
		suffix: "wielding Frostmourne",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahhb", "Holy Light"],
			["ahds", "Divine Shield"],
			["ahre", "Resurrection"],
			["ahad", "Devotion Aura"]
		]
	},
	hjai: {
		name: "Jaina",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahbz", "Blizzard"],
			["ahab", "Brilliance Aura"],
			["ahwe", "Summon Water Elemental"],
			["ahmt", "Mass Teleport"]
		]
	},
	hmbr: {
		name: "Muradin Bronzebeard",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahtc", "Thunder Clap"],
			["ahtb", "Storm Bolt"],
			["ahbh", "Bash"],
			["ahav", "Avatar"]
		]
	},
	hvwd: {
		name: "Sylvanas Windrunner",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahca", "Cold Arrows"],
			["aest", "Scout"],
			["aear", "Trueshot Aura"],
			["aesf", "Starfall"]
		]
	},
	hlgr: {
		name: "Lord Garithos",
		race: HUMAN,
		type: HERO,
		commands: [
			["ansh", "Shockwave"],
			["ahhb", "Holy Light"],
			["ahad", "Devotion Aura"],
			["anav", "Avatar"]
		]
	},
	huth: {
		name: "Uther",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahhb", "Holy Light"],
			["ahds", "Divine Shield"],
			["ahre", "Resurrection"],
			["ahad", "Devotion Aura"]
		]
	},
	hdgo: {
		name: "Dagren the Orcslayer",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahhb", "Holy Light"],
			["ahds", "Divine Shield"],
			["ahre", "Resurrection"],
			["ahad", "Devotion Aura"]
		]
	},
	hhkl: {
		name: "Halahk the Lifebringer",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahhb", "Holy Light"],
			["ahds", "Divine Shield"],
			["ahre", "Resurrection"],
			["ahad", "Devotion Aura"]
		]
	},
	hmgd: {
		name: "Magroth the Defender",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahhb", "Holy Light"],
			["ahds", "Divine Shield"],
			["ahre", "Resurrection"],
			["ahad", "Devotion Aura"]
		]
	},
	hpb1: {
		name: "Lord Nicholas Buzan",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahhb", "Holy Light"],
			["ahds", "Divine Shield"],
			["ahre", "Resurrection"],
			["ahad", "Devotion Aura"]
		]
	},
	hpb2: {
		name: "Sir Gregory Edmunson",
		race: HUMAN,
		type: HERO,
		commands: [
			["ahhb", "Holy Light"],
			["ahds", "Divine Shield"],
			["ahre", "Resurrection"],
			["ahad", "Devotion Aura"]
		]
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
		commands: [
			["ahbz", "Blizzard"],
			["ahab", "Brilliance Aura"],
			["ahwe", "Summon Water Elemental"],
			["ahmt", "Mass Teleport"]
		]
	},
	hkal: {
		name: "Kael",
		race: BLOOD_ELF,
		type: HERO,
		commands: [
			["ahfs", "Flame Strike"],
			["ahbn", "Banish"],
			["ahdr", "Siphon Mana"],
			["ahpx", "Phoenix"]
		]
	},
	htow_campaign: {
		name: "Town Hall",
		suffix: "Blood Elf",
		race: BLOOD_ELF,
		type: BUILDING,
		commands: [
			["nhew", "Train Worker"],
			["cmdrally", "Set Rally Point"],
			["hkee", "Upgrade to Keep"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hbar_campaign: {
		name: "Barracks",
		suffix: "Blood Elf",
		race: BLOOD_ELF,
		type: BUILDING,
		commands: [
			["hhes", "Train Swordsman"],
			["nhea", "Train Archer"],
			["cmdrally", "Set Rally Point"],
			["rhde", "Research Defend"],
			["reib", "Research Improved Bows"],
			["remk", "Research Marksmanship"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	nheb: {
		name: "High Elven Barracks",
		race: BLOOD_ELF,
		type: BUILDING,
		commands: [
			["hhes", "Train Swordsman"],
			["nhea", "Train Archer"],
			["nws1", "Train Dragon Hawk"],
			["cmdrally", "Set Rally Point"],
			["rhde", "Research Defend"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	hhes: {
		name: "Swordsman",
		race: BLOOD_ELF,
		type: UNIT,
		commands: [
			["adef", "Defend"]
		]
	},
	nhea: {
		name: "Archer",
		race: BLOOD_ELF,
		type: UNIT
	},
	nws1: {
		name: "Dragon Hawk",
		suffix: "Campaign",
		race: BLOOD_ELF,
		type: UNIT,
		commands: [
			["acen", "Ensnare"]
		]
	},
	nhew: {
		name: "Worker",
		race: BLOOD_ELF,
		type: UNIT,
		commands: [
			["ahar", "Gather"],
			["ahrp", "Repair"],
			["cmdbuildhuman", "Build Structure"],
			["cmdcancelbuild", "Cancel"]
		],
		build: "cmdbuildhuman"
	},
	nbee: {
		name: "Blood Elf Engineer",
		race: BLOOD_ELF,
		type: UNIT,
		commands: [
			["ahar", "Gather"],
			["ahrp", "Repair"],
			["cmdbuildhuman", "Build Structure"],
			["cmdcancelbuild", "Cancel"]
		],
		build: "cmdbuildbloodelf"
	},
	cmdbuildbloodelf: {
		name: "Build Structure",
		race: BLOOD_ELF,
		type: OTHER,
		commands: [
			["net1", "Build Energy Tower"],
			["nbt1", "Build Boulder Tower"],
			["nft1", "Build Flame Tower"],
			["ndt1", "Build Cold Tower"],
			["ntt1", "Build Death Tower"],
			["cmdcancel", "Cancel"]
		]
	},
	nbel: {
		name: "Blood Elf Lieutenant",
		race: BLOOD_ELF,
		type: UNIT,
		commands: [
			["adef", "Defend"],
			["amim", "Spell Immunity"]
		]
	},
	hc00: {
		name: "Runner",
		race: BLOOD_ELF,
		type: UNIT,
		commands: [
			["ahar", "Gather"],
			["ahrp", "Repair"],
			["amil", "Call to Arms"],
			["cmdbuildhuman", "Build Structure"],
			["cmdcancelbuild", "Cancel"]
		],
		build: "cmdbuildhuman"
	},
	negf: {
		name: "Earth-Fury Tower",
		race: BLOOD_ELF,
		type: TOWER
	},
	negm: {
		name: "Sky-Fury Tower",
		race: BLOOD_ELF,
		type: TOWER
	},
	negt: {
		name: "High Elven Guard Tower",
		race: BLOOD_ELF,
		type: TOWER
	},
	net1: {
		name: "Energy Tower",
		race: BLOOD_ELF,
		type: TOWER,
		commands: [
			["net2", "Upgrade to Pulse Tower"],
			["a009", "Reclaim Tower"],
			["amim", "Spell Immunity"]
		]
	},
	net2: {
		name: "Pulse Tower",
		race: BLOOD_ELF,
		type: TOWER,
		commands: [
			["a009", "Reclaim Tower"],
			["amim", "Spell Immunity"]
		]
	},
	nbt1: {
		name: "Boulder Tower",
		race: BLOOD_ELF,
		type: TOWER,
		commands: [
			["cmdattackground", "Attack Ground"],
			["nbt2", "Upgrade to Shockwave Tower"],
			["a009", "Reclaim Tower"],
			["amim", "Spell Immunity"]
		]
	},
	nbt2: {
		name: "Shockwave Tower",
		race: BLOOD_ELF,
		type: TOWER,
		commands: [
			["cmdattackground", "Attack Ground"],
			["a009", "Reclaim Tower"],
			["amim", "Spell Immunity"]
		]
	},
	nft1: {
		name: "Flame Tower",
		race: BLOOD_ELF,
		type: TOWER,
		commands: [
			["nft2", "Upgrade to Blazing Tower"],
			["a009", "Reclaim Tower"],
			["amim", "Spell Immunity"]
		]
	},
	nft2: {
		name: "Blazing Tower",
		race: BLOOD_ELF,
		type: TOWER,
		commands: [
			["a009", "Reclaim Tower"],
			["amim", "Spell Immunity"]
		]
	},
	ndt1: {
		name: "Cold Tower",
		race: BLOOD_ELF,
		type: TOWER,
		commands: [
			["ndt2", "Upgrade to Arctic Tower"],
			["a009", "Reclaim Tower"],
			["amim", "Spell Immunity"]
		]
	},
	ndt2: {
		name: "Arctic Tower",
		race: BLOOD_ELF,
		type: TOWER,
		commands: [
			["a009", "Reclaim Tower"],
			["amim", "Spell Immunity"]
		]
	},
	ntt1: {
		name: "Death Tower",
		race: BLOOD_ELF,
		type: TOWER,
		commands: [
			["ntx2", "Upgrade to Extinction Tower"],
			["a009", "Reclaim Tower"],
			["amim", "Spell Immunity"]
		]
	},
	ntt2: {
		name: "Extinction Tower",
		race: BLOOD_ELF,
		type: TOWER,
		commands: [
			["a009", "Reclaim Tower"],
			["amim", "Spell Immunity"]
		]
	},
	obla: {
		name: "Blademaster",
		race: ORC,
		type: HERO,
		commands: [
			["aowk", "Wind Walk"],
			["aocr", "Critical Strike"],
			["aomi", "Mirror Image"],
			["aoww", "Bladestorm"]
		]
	},
	ofar: {
		name: "Far Seer",
		race: ORC,
		type: HERO,
		commands: [
			["aofs", "Far Sight"],
			["aosf", "Feral Spirit"],
			["aocl", "Chain Lightning"],
			["aoeq", "Earthquake"]
		]
	},
	otch: {
		name: "Tauren Chieftain",
		race: ORC,
		type: HERO,
		commands: [
			["aosh", "Shockwave"],
			["aoae", "Endurance Aura"],
			["aore", "Reincarnation"],
			["aows", "War Stomp"]
		]
	},
	oshd: {
		name: "Shadow Hunter",
		race: ORC,
		type: HERO,
		commands: [
			["aohw", "Healing Wave"],
			["aohx", "Hex"],
			["aosw", "Serpent Ward"],
			["aovd", "Big Bad Voodoo"]
		]
	},
	opeo: {
		name: "Peon",
		race: ORC,
		type: UNIT,
		commands: [
			["ahar", "Gather"],
			["arep", "Repair"],
			["asal", "Pillage"],
			["cmdbuildorc", "Build Structure"],
			["cmdcancelbuild", "Cancel"]
		],
		build: "cmdbuildorc"
	},
	cmdbuildorc: {
		name: "Build Structure",
		race: ORC,
		type: OTHER,
		commands: [
			["ogre", "Build Great Hall"],
			["obar", "Build Barracks"],
			["ofor", "Build War Mill"],
			["owtw", "Build Watch Tower"],
			["otrb", "Build Orc Burrow"],
			["oalt", "Build Altar of Storms"],
			["osld", "Build Spirit Lodge"],
			["obea", "Build Beastiary"],
			["otto", "Build Tauren Totem"],
			["ovln", "Build Voodoo Lounge"],
			["cmdcancel", "Cancel"]
		]
	},
	ogru: {
		name: "Grunt",
		race: ORC,
		type: UNIT,
		commands: [
			["aobs", "Brute Strength"],
			["asal", "Pillage"]
		]
	},
	ohun: {
		name: "Troll Headhunter",
		race: ORC,
		type: UNIT,
		commands: [
			["absk", "Berserk"],
			["aobk", "Berserker Upgrade"],
			["aotr", "Troll Regeneration"]
		]
	},
	otbk: {
		name: "Troll Berserker",
		race: ORC,
		type: UNIT,
		commands: [
			["absk", "Berserk"],
			["aobk", "Berserker Upgrade"],
			["aotr", "Troll Regeneration"]
		]
	},
	ocat: {
		name: "Demolisher",
		race: ORC,
		type: UNIT,
		commands: [
			["cmdattackground", "Attack Ground"],
			["abof", "Burning Oil"]
		]
	},
	oshm: {
		name: "Shaman",
		race: ORC,
		type: UNIT,
		commands: [
			["ablo", "Bloodlust"],
			["alsh", "Lightning Shield"],
			["apg2", "Purge"]
		]
	},
	oshm_campaign: {
		name: "Shaman",
		suffix: "Campaign",
		race: ORC,
		type: UNIT,
		commands: [
			["ablo", "Bloodlust"],
			["alsh", "Lightning Shield"],
			["aprg", "Purge"]
		]
	},
	odoc: {
		name: "Witch Doctor",
		race: ORC,
		type: UNIT,
		commands: [
			["aeye", "Sentry Ward"],
			["ahwd", "Healing Ward"],
			["asta", "Stasis Trap"],
			["aotr", "Troll Regeneration"]
		]
	},
	ospw: {
		name: "Spirit Walker",
		race: ORC,
		type: UNIT,
		commands: [
			["acpf", "Corporeal Form"],
			["aspl", "Spirit Link"],
			["adcn", "Disenchant"],
			["aast", "Ancestral Spirit"],
			["acsk", "Resistant Skin"]
		]
	},
	ospm: {
		name: "Spirit Walker",
		suffix: "Ethereal",
		race: ORC,
		type: UNIT,
		commands: [
			["acpf", "Corporeal Form"],
			["aspl", "Spirit Link"],
			["adcn", "Disenchant"],
			["aast", "Ancestral Spirit"],
			["acsk", "Resistant Skin"]
		]
	},
	orai: {
		name: "Raider",
		race: ORC,
		type: UNIT,
		commands: [
			["aens", "Ensnare"],
			["asal", "Pillage"]
		]
	},
	okod: {
		name: "Kodo Beast",
		race: ORC,
		type: UNIT,
		commands: [
			["aakb", "War Drums"],
			["adev", "Devour"]
		]
	},
	owyv: {
		name: "Wind Rider",
		race: ORC,
		type: UNIT,
		commands: [
			["aven", "Envenomed Spears"]
		]
	},
	otbr: {
		name: "Troll Batrider",
		race: ORC,
		type: UNIT,
		commands: [
			["aliq", "Liquid Fire"],
			["auco", "Unstable Concoction"],
			["aotr", "Troll Regeneration"]
		]
	},
	otau: {
		name: "Tauren",
		race: ORC,
		type: UNIT,
		commands: [
			["awar", "Pulverize"]
		]
	},
	ogre: {
		name: "Great Hall",
		race: ORC,
		type: BUILDING,
		commands: [
			["opeo", "Train Peon"],
			["ropg", "Research Pillage"],
			["ropm", "Backpack"],
			["cmdrally", "Set Rally Point"],
			["ostr", "Upgrade to Stronghold"],
			["cmdcancelbuild", "Cancel"],
			["aosp", "Spiked Barricades"]
		]
	},
	ostr: {
		name: "Stronghold",
		race: ORC,
		type: BUILDING,
		commands: [
			["opeo", "Train Peon"],
			["ropg", "Research Pillage"],
			["ropm", "Backpack"],
			["cmdrally", "Set Rally Point"],
			["ofrt", "Upgrade to Fortress"],
			["cmdcancelbuild", "Cancel"],
			["aosp", "Spiked Barricades"]
		]
	},
	ofrt: {
		name: "Fortress",
		race: ORC,
		type: BUILDING,
		commands: [
			["opeo", "Train Peon"],
			["ropg", "Research Pillage"],
			["ropm", "Backpack"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"],
			["aosp", "Spiked Barricades"]
		]
	},
	obar: {
		name: "Barracks",
		race: ORC,
		type: BUILDING,
		commands: [
			["ogru", "Train Grunt"],
			["ohun", "Train Troll Headhunter"],
			["ocat", "Train Demolisher"],
			["robs", "Research Brute Strength"],
			["rotr", "Research Troll Regeneration"],
			["robk", "Berserker Upgrade"],
			["robf", "Burning Oil"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	obar_berserkers: {
		name: "Barracks",
		suffix: "with Berserkers",
		race: ORC,
		type: BUILDING,
		commands: [
			["ogru", "Train Grunt"],
			["otbk", "Train Troll Berserkers"],
			["ocat", "Train Demolisher"],
			["robs", "Research Brute Strength"],
			["rotr", "Research Troll Regeneration"],
			["robf", "Burning Oil"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	ofor: {
		name: "War Mill",
		race: ORC,
		type: BUILDING,
		commands: [
			["rome", "Upgrade Melee Weapons"],
			["roar", "Upgrade Armor"],
			["rora", "Upgrade Ranged Weapons"],
			["rosp", "Upgrade Barricades"],
			["rorb", "Reinforced Defenses"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	owtw: {
		name: "Watch Tower",
		race: ORC,
		type: TOWER,
		commands: [
			["aosp", "Spiked Barricades"]
		]
	},
	otrb: {
		name: "Burrow",
		race: ORC,
		type: BUILDING,
		commands: [
			["abtl", "Battle Stations"],
			["astd", "Stand Down"],
			["aorb", "Reinforced Defenses"]
		]
	},
	oalt: {
		name: "Altar of Storms",
		race: ORC,
		type: BUILDING,
		commands: [
			["obla", "Summon Blademaster"],
			["ofar", "Summon Far Seer"],
			["otch", "Summon Tauren Chieftain"],
			["oshd", "Summon Shadow Hunter"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	oalt_campaign: {
		name: "Altar of Storms",
		suffix: "Campaign",
		race: ORC,
		type: BUILDING,
		commands: [
			["ogrh", "Grom Hellscream"],
			["opgh", "Grom Hellscream (Possessed)"],
			["othr", "Thrall"],
			["ocbh", "Cairne Bloodhoof"],
			["naka", "Akama"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	osld: {
		name: "Spirit Lodge",
		race: ORC,
		type: BUILDING,
		commands: [
			["oshm", "Train Shaman"],
			["odoc", "Train Witch Doctor"],
			["rowd", "Witch Doctor Training"],
			["rost", "Shaman Training"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	obea: {
		name: "Beastiary",
		race: ORC,
		type: BUILDING,
		commands: [
			["orai", "Train Raider"],
			["okod", "Train Kodo Beast"],
			["owyv", "Train Wind Rider"],
			["otbr", "Train Troll Batrider"],
			["roen", "Research Ensnare"],
			["rovs", "Research Envenomed Spears"],
			["rwdm", "Upgrade War Drums"],
			["rolf", "Research Liquid Fire"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	otto: {
		name: "Tauren Totem",
		race: ORC,
		type: BUILDING,
		commands: [
			["otau", "Train Tauren"],
			["ospm", "Train Spirit Walker"],
			["rows", "Upgrade Pulverize"],
			["rowt", "Spirit Walker Training"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	ovln: {
		name: "Voodoo Lounge",
		race: ORC,
		type: BUILDING,
		commands: [
			["shas", "Purchase Scroll of Speed"],
			["hslv", "Purchase Healing Salve"],
			["plcl", "Purchase Lesser Clarity Potion"],
			["phea", "Purchase Potion of Healing"],
			["pman", "Purchase Potion of Mana"],
			["stwp", "Purchase Scroll of Town Portal"],
			["tgrh", "Purchase Tiny Great Hall"],
			["oli2", "Purchase Orb of Lightning"],
			["anei", "Select User"]
		]
	},
	oshy: {
		name: "Orc Shipyard",
		race: ORC,
		type: BUILDING,
		commands: [
			["obot", "Hire Transport Ship"],
			["odes", "Hire Frigate"],
			["ojgn", "Train Orc Juggernaught"],
			["ane2", "Select User"]
		]
	},
	obot: {
		name: "Orc Transport Ship",
		race: ORC,
		type: NO_ATTACK,
		commands: [
			["slo3", "Load"],
			["sdro", "Unload"]
		]
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
		commands: [
			["acct", "Critical Strike"]
		]
	},
	osw3: {
		name: "Shadow Wolf",
		suffix: "Level 3",
		race: ORC,
		type: SUMMON,
		commands: [
			["acct", "Critical Strike"]
		]
	},
	ogrk: {
		name: "Gar’thok",
		race: ORC,
		type: UNIT,
		commands: [
			["asal", "Pillage"]
		]
	},
	onzg: {
		name: "Nazgrel",
		race: ORC,
		type: UNIT,
		commands: [
			["aens", "Ensnare"],
			["ansk", "Hardened Skin"],
			["acrk", "Resistant Skin"]
		]
	},
	ovlj: {
		name: "Vol’jin",
		race: ORC,
		type: UNIT,
		commands: [
			["aeye", "Sentry Ward"],
			["ahwd", "Healing Ward"],
			["asta", "Stasis Trap"]
		]
	},
	oosc: {
		name: "Kodo Beast",
		suffix: "Riderless",
		race: ORC,
		type: NO_ATTACK
	},
	o002: {
		name: "Pack Beast",
		race: ORC,
		type: NO_ATTACK
	},
	o004: {
		name: "Bovan Windtotem",
		race: ORC,
		type: UNIT,
		commands: [
			["a000", "Corporeal Form"],
			["aspl", "Spirit Link"],
			["adcn", "Disenchant"],
			["aast", "Ancestral Spirit"]
		]
	},
	o006: {
		name: "Bovan Windtotem",
		suffix: "Ethereal",
		race: ORC,
		type: UNIT,
		commands: [
			["a000", "Corporeal Form"],
			["aspl", "Spirit Link"],
			["adcn", "Disenchant"],
			["aast", "Ancestral Spirit"]
		]
	},
	negz: {
		name: "Engineer Gazlowe",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["asds", "Kaboom!"]
		]
	},
	nw2w: {
		name: "Orc Warlock",
		race: ORC,
		type: UNIT,
		commands: [
			["acfb", "Firebolt"],
			["acuf", "Unholy Frenzy"],
			["accr", "Cripple"]
		]
	},
	owar: {
		name: "Orc Warchief",
		race: ORC,
		type: UNIT
	},
	omtg: {
		name: "Mathog",
		race: ORC,
		type: UNIT
	},
	nchg: {
		name: "Fel Grunt",
		race: ORC,
		type: UNIT,
		commands: [
			["asal", "Pillage"]
		]
	},
	nchr: {
		name: "Fel Raider",
		race: ORC,
		type: UNIT,
		commands: [
			["aens", "Ensnare"],
			["asal", "Pillage"]
		]
	},
	nckb: {
		name: "Fel Kodo Beast",
		race: ORC,
		type: UNIT,
		commands: [
			["aakb", "War Drums"],
			["adev", "Devour"]
		]
	},
	nchw: {
		name: "Fel Warlock",
		race: ORC,
		type: UNIT,
		commands: [
			["awfb", "Firebolt"],
			["suhf", "Unholy Frenzy"],
			["scri", "Cripple"]
		]
	},
	ogre_chaos: {
		name: "Great Hall",
		suffix: "Fel Orc",
		race: ORC,
		type: BUILDING,
		commands: [
			["ncpn", "Train Fel Peon"],
			["ropg", "Research Pillage"],
			["cmdrally", "Set Rally Point"],
			["ostr", "Upgrade to Stronghold"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	obar_chaos: {
		name: "Barracks",
		suffix: "Fel Orc",
		race: ORC,
		type: BUILDING,
		commands: [
			["nchg", "Train Fel Grunt"],
			["ohun", "Train Troll Headhunter"],
			["ocat", "Train Demolisher"],
			["robs", "Research Brute Strength"],
			["rotr", "Research Troll Regeneration"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	osld_chaos: {
		name: "Spirit Lodge",
		suffix: "Fel Orc",
		race: ORC,
		type: BUILDING,
		commands: [
			["nchw", "Train Fel Warlock"],
			["odoc", "Train Witch Doctor"],
			["rost", "Shaman Training"],
			["rowd", "Witch Doctor Training"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	obea_chaos: {
		name: "Beastiary",
		suffix: "Fel Orc",
		race: ORC,
		type: BUILDING,
		commands: [
			["nchr", "Train Fel Raider"],
			["nckb", "Train Fel Kodo Beast"],
			["roen", "Research Ensnare"],
			["rwdm", "Upgrade War Drums"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	o001: {
		name: "Orgrimmar Armory",
		race: ORC,
		type: BUILDING,
		commands: [
			["mlst", "Purchase Maul of Strength"],
			["stwa", "Purchase Sturdy War Axe"],
			["shen", "Purchase Enchanted Shield"],
			["rst1", "Purchase Gauntlets of Ogre Strength +3"],
			["hcun", "Purchase Hood of Cunning"],
			["evtl", "Purchase Talisman of Evasion"],
			["ckng", "Purchase Crown of Kings +5"],
			["anei", "Select User"]
		]
	},
	n000: {
		name: "Orgrimmar Barracks",
		race: ORC,
		type: BUILDING,
		commands: [
			["ogru", "Hire Grunt"],
			["otbk", "Hire Berserker"],
			["o002", "Hire Pack Beast"]
		]
	},
	n002: {
		name: "Watch Post Barracks",
		race: ORC,
		type: BUILDING,
		commands: [
			["ogru", "Hire Grunt"],
			["otbk", "Hire Berserker"],
			["o002", "Hire Pack Beast"]
		]
	},

	ovln_campaign: {
		name: "Voodoo Lounge",
		suffix: "Campaign",
		race: ORC,
		type: BUILDING,
		commands: [
			["rspd", "Purchase Rune of Speed"],
			["phea", "Purchase Potion of Healing"],
			["pman", "Purchase Potion of Mana"],
			["stwp", "Purchase Scroll of Town Portal"],
			["tdex", "Purchase Tome of Dexterity"],
			["tint", "Purchase Tome of Intelligence"],
			["tstr", "Purchase Tome of Strength"],
			["texp", "Purchase Tome of Experience"],
			["anei", "Select User"]
		]
	},
	n003: {
		name: "Neeloc’s Outpost",
		race: ORC,
		type: BUILDING,
		commands: [
			["rspd", "Purchase Rune of Speed"],
			["spro", "Purchase Scroll of Protection"],
			["sman", "Purchase Scroll of Mana"],
			["shea", "Purchase Scroll of Healing"],
			["rin1", "Purchase Mantle of Intelligence +3"],
			["bspd", "Purchase Boots of Speed"],
			["sneg", "Purchase Staff of Negation"],
			["arsc", "Purchase Arcane Scroll"],
			["ofir", "Purchase Orb of Fire"],
			["mnsf", "Purchase Mindstaff"],
			["anei", "Select User"]
		]
	},
	n004: {
		name: "Goblin Storehouse",
		race: ORC,
		type: BUILDING,
		commands: [
			["rspd", "Purchase Rune of Speed"],
			["sreg", "Purchase Scroll of Regeneration"],
			["shas", "Purchase Scroll of Speed"],
			["pgma", "Purchase Potion of Greater Mana"],
			["wneu", "Purchase Wand of Neutralization"],
			["rde2", "Purchase Ring of Protection +3"],
			["hlst", "Purchase Health Stone"],
			["rwiz", "Purchase Sobi Mask"],
			["anei", "Select User"]
		]
	},
	n005: {
		name: "Aicila’s Marketplace",
		race: ORC,
		type: BUILDING,
		commands: [
			["rspd", "Purchase Rune of Speed"],
			["shrs", "Purchase Shimmerglaze Roast"],
			["sror", "Purchase Scroll of the Beast"],
			["arsc", "Purchase Arcane Roast"],
			["mnst", "Purchase Mana Stone"],
			["cnob", "Purchase Circlet of Nobility"],
			["belv", "Purchase Boots of Quel’Thalas +6"],
			["oli2", "Purchase Orb of Lightning"],
			["anei", "Select User"]
		]
	},
	ogrh: {
		name: "Grom Hellscream",
		race: ORC,
		type: HERO,
		commands: [
			["aowk", "Wind Walk"],
			["aocr", "Critical Strike"],
			["aomi", "Mirror Image"],
			["aoww", "Bladestorm"]
		]
	},
	opgh: {
		name: "Grom Hellscream",
		suffix: "Possessed",
		race: ORC,
		type: HERO,
		commands: [
			["aowk", "Wind Walk"],
			["aocr", "Critical Strike"],
			["aomi", "Mirror Image"],
			["aoww", "Bladestorm"]
		]
	},
	othr: {
		name: "Thrall",
		race: ORC,
		type: HERO,
		commands: [
			["aofs", "Far Sight"],
			["aosf", "Feral Spirit"],
			["aocl", "Chain Lightning"],
			["aoeq", "Earthquake"]
		]
	},
	ocbh: {
		name: "Cairne Bloodhoof",
		race: ORC,
		type: HERO,
		commands: [
			["aosh", "Shockwave"],
			["aoae", "Endurance Aura"],
			["aore", "Reincarnation"],
			["aows", "War Stomp"]
		]
	},
	orex: {
		name: "Rexxar",
		race: ORC,
		type: HERO,
		commands: [
			["arsg", "Summon Misha"],
			["arsq", "Summon Quilbeast"],
			["ansb", "Storm Bolt"],
			["arsp", "Stampede"],
			["aamk", "Attribute Bonus"]
		]
	},
	orkn: {
		name: "Rokhan",
		race: ORC,
		type: HERO,
		commands: [
			["anhw", "Healing Wave"],
			["anhx", "Hex"],
			["arsw", "Serpent Ward"],
			["aols", "Voodoo Spirits"],
			["aamk", "Attribute Bonus"]
		]
	},
	nsjs: {
		name: "Chen Stormstout",
		race: ORC,
		type: HERO,
		commands: [
			["ancf", "Breath of Fire"],
			["acdh", "Drunken Haze"],
			["acdb", "Drunken Brawler"],
			["acef", "Storm, Earth, and Fire"],
			["aamk", "Attribute Bonus"]
		]
	},
	ocb2: {
		name: "Cairne Bloodhoof",
		suffix: "Expansion",
		race: ORC,
		type: HERO,
		commands: [
			["aos2", "Shockwave"],
			["aow2", "War Stomp"],
			["aor2", "Endurance Aura"],
			["aor3", "Reincarnation"],
			["aamk", "Attribute Bonus"]
		]
	},
	orex_wyvern: {
		name: "Rexxar",
		suffix: "Wyvern Form",
		race: ORC,
		type: UNIT,
		commands: [
			["aroa", "Roar"],
			["afzy", "Frenzy"]
		]
	},
	orkn_wyvern: {
		name: "Rokhan",
		suffix: "Wyvern Form",
		race: ORC,
		type: UNIT,
		commands: [
			["amls", "Aerial Shackles"],
			["achv", "Healing Wave"]
		]
	},
	nsjs_wyvern: {
		name: "Chen Stormstout",
		suffix: "Wyvern Form",
		race: ORC,
		type: UNIT,
		commands: [
			["acbc", "Breath of Fire"],
			["acfb", "Firebolt"]
		]
	},
	ogld: {
		name: "Gul’dan",
		race: ORC,
		type: HERO
	},
	osam: {
		name: "Samuro",
		race: ORC,
		type: HERO,
		commands: [
			["aowk", "Wind Walk"],
			["aocr", "Critical Strike"],
			["aomi", "Mirror Image"],
			["aoww", "Bladestorm"]
		]
	},
	odrt: {
		name: "Drek’Thar",
		race: ORC,
		type: HERO,
		commands: [
			["aofs", "Far Sight"],
			["aosf", "Feral Spirit"],
			["aocl", "Chain Lightning"],
			["aoeq", "Earthquake"]
		]
	},
	nwad: {
		name: "Watcher Ward",
		race: NEUTRAL,
		type: OTHER
	},
	oeye: {
		name: "Sentry Ward",
		race: ORC,
		type: OTHER
	},
	otot: {
		name: "Stasis Trap",
		race: ORC,
		type: OTHER
	},
	ohwd: {
		name: "Healing Ward",
		race: ORC,
		type: OTHER
	},
	osp1: {
		name: "Serpent Ward",
		suffix: "Level 1",
		race: ORC,
		type: OTHER
	},
	osp2: {
		name: "Serpent Ward",
		suffix: "Level 2",
		race: ORC,
		type: OTHER
	},
	osp3: {
		name: "Serpent Ward",
		suffix: "Level 3",
		race: ORC,
		type: OTHER
	},
	osp4: {
		name: "Serpent Ward",
		suffix: "Level 4",
		race: ORC,
		type: OTHER
	},
	ngzc: {
		name: "Misha",
		suffix: "Level 1",
		race: ORC,
		type: SUMMON,
		commands: [
			["acrk", "Resistant Skin"]
		]
	},
	ngzd: {
		name: "Misha",
		suffix: "Level 2",
		race: ORC,
		type: SUMMON,
		commands: [
			["anbh", "Bash"],
			["acrk", "Resistant Skin"]
		]
	},
	ngza: {
		name: "Misha",
		suffix: "Level 3",
		race: ORC,
		type: SUMMON,
		commands: [
			["anb2", "Maul"],
			["acrk", "Resistant Skin"]
		]
	},
	ngz4: {
		name: "Misha",
		suffix: "Level 4",
		race: ORC,
		type: SUMMON,
		commands: [
			["anb2", "Maul"],
			["acrk", "Resistant Skin"]
		]
	},
	naka: {
		name: "Akama",
		race: DRAENEI,
		type: HERO,
		commands: [
			["acs7", "Feral Spirit"],
			["aocl", "Chain Lightning"],
			["aesh", "Shadow Strike"],
			["anr2", "Resurrection"],
			["ahid", "Shadowmeld"]
		]
	},
	ndrl: {
		name: "Draenei Laborer",
		race: DRAENEI,
		type: UNIT,
		commands: [
			["arep", "Repair"],
			["ahar", "Gather"],
			["cmdbuildorc", "Build Structure"],
			["cmdcancelbuild", "Cancel"]
		],
		build: "cmdbuilddraenei"
	},
	cmdbuilddraenei: {
		name: "Build Structure",
		race: DRAENEI,
		type: OTHER,
		commands: [
			["ndh2", "Build Draenei Haven"],
			["ndh3", "Build Draenei Barracks"],
			["ndh4", "Build Seer’s Den"],
			["nbt2", "Build Advanced Boulder Tower"],
			["cmdcancel", "Cancel"]
		]
	},
	ndh2: {
		name: "Draenei Haven",
		race: DRAENEI,
		type: BUILDING,
		commands: [
			["ndrl", "Train Draenei Laborer"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	ndh3: {
		name: "Draenei Barracks",
		race: DRAENEI,
		type: BUILDING,
		commands: [
			["ndrn", "Train Draenei Vindicator"],
			["ndrt", "Train Draenei Stalker"],
			["ndsa", "Train Salamander"],
			["ncat", "Train Draenei Demolisher"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	ndh4: {
		name: "Seer’s Den",
		race: DRAENEI,
		type: BUILDING,
		commands: [
			["ndrs", "Train Draenei Seer"],
			["ndrh", "Train Draenei Harbinger"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	ndrn: {
		name: "Draenei Vindicator",
		race: DRAENEI,
		type: UNIT
	},
	ndrt: {
		name: "Draenei Stalker",
		race: DRAENEI,
		type: UNIT,
		commands: [
			["acev", "Evasion"],
			["acen", "Ensnare"]
		]
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
		commands: [
			["cmdattackground", "Attack Ground"],
			["abof", "Burning Oil"]
		]
	},
	ndrh: {
		name: "Draenei Harbinger",
		race: DRAENEI,
		type: UNIT,
		commands: [
			["ache", "Ray of Disruption"],
			["acbb", "Bloodlust"]
		]
	},
	ndrs: {
		name: "Draenei Seer",
		race: DRAENEI,
		type: UNIT,
		commands: [
			["acsw", "Slow"],
			["acba", "Brilliance Aura"],
			["achv", "Healing Wave"]
		]
	},
	ndrd2: {
		name: "Draenei Elite Assassin",
		race: DRAENEI,
		type: UNIT,
		commands: [
			["ahid", "Shadowmeld"],
			["acht", "Howl of Terror"],
			["acct", "Critical Strike"]
		]
	},
	ndrs2: {
		name: "Draenei Saboteur",
		race: DRAENEI,
		type: UNIT,
		commands: [
			["ahid", "Shadowmeld"],
			["achv", "Healing Wave"],
			["aliq", "Liquid Fire"]
		]
	},
	udea: {
		name: "Death Knight",
		race: UNDEAD,
		type: HERO,
		commands: [
			["audc", "Death Coil"],
			["audp", "Death Pact"],
			["auau", "Unholy Aura"],
			["auan", "Animate Dead"]
		]
	},
	udre: {
		name: "Dreadlord",
		race: UNDEAD,
		type: HERO,
		commands: [
			["auav", "Vampiric Aura"],
			["ausl", "Sleep"],
			["aucs", "Carrion Swarm"],
			["auin", "Inferno"]
		]
	},
	ulic: {
		name: "Lich",
		race: UNDEAD,
		type: HERO,
		commands: [
			["aufn", "Frost Nova"],
			["aufu", "Frost Armor"],
			["audr", "Dark Ritual"],
			["audd", "Death and Decay"]
		]
	},
	ucrl: {
		name: "Crypt Lord",
		race: UNDEAD,
		type: HERO,
		commands: [
			["auim", "Impale"],
			["auts", "Spiked Carapace"],
			["aucb", "Carrion Beetles"],
			["auls", "Locust Swarm"]
		]
	},
	uaco: {
		name: "Acolyte",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["aaha", "Gather"],
			["arst", "Restore"],
			["alam", "Sacrifice"],
			["auns", "Unsummon Building"],
			["cmdbuildundead", "Summon Building"]
		],
		build: "cmdbuildundead"
	},
	cmdbuildundead: {
		name: "Summon Building",
		race: UNDEAD,
		type: OTHER,
		commands: [
			["unpl", "Summon Necropolis"],
			["usep", "Summon Crypt"],
			["ugol", "Haunt Gold Mine"],
			["ugrv", "Summon Graveyard"],
			["uzig", "Summon Ziggurat"],
			["uaod", "Summon Altar of Darkness"],
			["utod", "Summon Temple of the Damned"],
			["uslh", "Summon Slaughterhouse"],
			["usap", "Summon Sacrificial Pit"],
			["ubon", "Summon Boneyard"],
			["utom", "Summon Tomb of Relics"],
			["cmdcancel", "Cancel"]
		]
	},
	ushd: {
		name: "Shade",
		race: UNDEAD,
		type: NO_ATTACK,
		commands: [
			["atru", "True Sight"],
			["augh", "Shade"]
		]
	},
	ugho: {
		name: "Ghoul",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["acan", "Cannibalize"],
			["augf", "Ghoul Frenzy"],
			["ahrl", "Gather"]
		]
	},
	ucry: {
		name: "Crypt Fiend",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["aweb", "Web"],
			["abur", "Burrow"]
		]
	},
	ugar: {
		name: "Gargoyle",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["astn", "Stone Form"]
		]
	},
	ugrm: {
		name: "Gargoyle",
		suffix: "Stone Form",
		race: UNDEAD,
		type: OTHER,
		commands: [
			["astn", "Stone Form"],
			["acmi", "Spell Immunity"]
		]
	},
	uabo: {
		name: "Abomination",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["aap1", "Disease Cloud"],
			["acn2", "Cannibalize"]
		]
	},
	umtw: {
		name: "Meat Wagon",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["cmdattackground", "Attack Ground"],
			["amel", "Load Corpse"],
			["amed", "Drop All Corpses"],
			["apts", "Disease Cloud"],
			["aexh", "Exhume Corpses"]
		]
	},
	unec: {
		name: "Necromancer",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["arai", "Raise Dead"],
			["auhf", "Unholy Frenzy"],
			["acri", "Cripple"],
			["ausm", "Skeletal Mastery"]
		]
	},
	uban: {
		name: "Banshee",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["aam2", "Anti-magic Shell"],
			["acrs", "Curse"],
			["aps2", "Possession"]
		]
	},
	ufro: {
		name: "Frost Wyrm",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["afra", "Frost Attack"],
			["afrz", "Freezing Breath"]
		]
	},
	uobs: {
		name: "Obsidian Statue",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["arpl", "Essence of Blight"],
			["arpm", "Spirit Touch"],
			["ubsp", "Morph into Destroyer"]
		]
	},
	ubsp: {
		name: "Destroyer",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["advm", "Devour Magic"],
			["afak", "Orb of Annihilation"],
			["aabs", "Absorb Mana"],
			["acmi", "Spell Immunity"]
		]
	},
	unpl: {
		name: "Necropolis",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["uaco", "Train Acolyte"],
			["rupm", "Research Backpack"],
			["unp1", "Upgrade to Halls of the Dead"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	unp1: {
		name: "Halls of the Dead",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["uaco", "Train Acolyte"],
			["rupm", "Research Backpack"],
			["unp2", "Upgrade to Black Citadel"],
			["cmdrally", "Set Rally Point"],
			["afr2", "Frost Attack"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	unp2: {
		name: "Black Citadel",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["uaco", "Train Acolyte"],
			["rupm", "Research Backpack"],
			["cmdrally", "Set Rally Point"],
			["afr2", "Frost Attack"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	usep: {
		name: "Crypt",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["ugho", "Train Ghoul"],
			["ucry", "Train Crypt Fiend"],
			["ugar", "Train Gargoyle"],
			["ruac", "Research Cannibalize"],
			["ruwb", "Research Web"],
			["rugf", "Research Ghoul Frenzy"],
			["rusf", "Research Stone Form"],
			["rubu", "Research Burrow"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	ugrv: {
		name: "Graveyard",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["rume", "Upgrade Unholy Strength"],
			["ruar", "Upgrade Unholy Armor"],
			["rura", "Upgrade Creature Attack"],
			["rucr", "Upgrade Creature Carapace"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	uzig: {
		name: "Ziggurat",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["uzg1", "Upgrade to Spirit Tower"],
			["uzg2", "Upgrade to Nerubian Tower"],
			["cmdcancelbuild", "Cancel"]
		]
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
		commands: [
			["afra", "Frost Attack"]
		]
	},
	uaod: {
		name: "Altar of Darkness",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["udea", "Summon Death Knight"],
			["ulic", "Summon Lich"],
			["udre", "Summon Dreadlord"],
			["ucrl", "Summon Crypt Lord"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	uaod_campaign: {
		name: "Altar of Darkness",
		suffix: "Campaign",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["uear", "Arthas"],
			["uvar", "Varimathras"],
			["uktl", "Kel’Thuzad"],
			["uanb", "Anub’arak"],
			["usyl", "Sylvanas"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	utod: {
		name: "Temple of the Damned",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["unec", "Train Necromancer"],
			["uban", "Train Banshee"],
			["rune", "Necromancer Training"],
			["ruba", "Banshee Training"],
			["rusm", "Research Skeletal Mastery"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	utod_campaign: {
		name: "Temple of the Damned",
		suffix: "Campaign",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["unec", "Train Necromancer"],
			["uban", "Train Banshee"],
			["rune", "Necromancer Training"],
			["ruba", "Banshee Training"],
			["rusl", "Research Skeletal Longevity"],
			["rusm", "Research Skeletal Mastery"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	uslh: {
		name: "Slaughterhouse",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["umtw", "Train Meat Wagon"],
			["uabo", "Train Abomination"],
			["uobs", "Train Obsidian Statue"],
			["rupc", "Research Disease Cloud"],
			["rusp", "Research Destroyer Form"],
			["ruex", "Research Exhume Corpses"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	usap: {
		name: "Sacrificial Pit",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["asac", "Sacrifice"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	ubon: {
		name: "Boneyard",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["ufro", "Train Frost Wyrm"],
			["cmdrally", "Set Rally Point"],
			["rufb", "Research Freezing Breath"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	utom: {
		name: "Tomb of Relics",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["rnec", "Purchase Rod of Necromancy"],
			["ritd", "Purchase Ritual Dagger"],
			["skul", "Purchase Sacrificial Skull"],
			["dust", "Purchase Dust of Appearance"],
			["phea", "Purchase Potion of Healing"],
			["pman", "Purchase Potion of Mana"],
			["stwp", "Purchase Scroll of Town Portal"],
			["ocor", "Purchase Orb of Corruption"],
			["shea", "Purchase Scroll of Healing"],
			["anei", "Select User"]
		]
	},
	ushp: {
		name: "Undead Shipyard",
		race: UNDEAD,
		type: BUILDING,
		commands: [
			["ubot", "Hire Transport Ship"],
			["udes", "Hire Frigate"],
			["uubs", "Hire Battleship"],
			["ane2", "Select User"]
		]
	},
	ubot: {
		name: "Undead Transport Ship",
		race: UNDEAD,
		type: NO_ATTACK,
		commands: [
			["slo3", "Load"],
			["sdro", "Unload"]
		]
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
		commands: [
			["aloa", "Load"],
			["adro", "Unload"]
		]
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
		commands: [
			["acam", "Anti-magic Shell"],
			["acrs", "Curse"]
		]
	},
	usyl_reforged: {
		name: "Sylvanas Windrunner",
		suffix: "Reforged",
		race: UNDEAD,
		type: HERO,
		commands: [
			["ansi", "Silence"],
			["anht", "Howl of Terror"],
			["andr", "Life Drain"],
			["anch", "Charm"]
		]
	},
	ubdr: {
		name: "Sapphiron",
		suffix: "Living",
		race: NEUTRAL,
		type: UNIT
	},
	ubdd: {
		name: "Sapphiron",
		suffix: "Undead",
		race: UNDEAD,
		type: UNIT,
		commands: [
			["acfn", "Frost Nova"],
			["afrz", "Freezing Breath"],
			["acsk", "Resistant Skin"]
		]
	},
	uear: {
		name: "Arthas",
		race: UNDEAD,
		type: HERO,
		commands: [
			["audc", "Death Coil"],
			["audp", "Death Pact"],
			["auau", "Unholy Aura"],
			["auan", "Animate Dead"]
		]
	},
	uktl: {
		name: "Kel’Thuzad",
		race: UNDEAD,
		type: HERO,
		commands: [
			["aufn", "Frost Nova"],
			["aufu", "Frost Armor"],
			["audr", "Dark Ritual"],
			["audd", "Death and Decay"]
		]
	},
	uanb: {
		name: "Anub’arak",
		race: UNDEAD,
		type: HERO,
		commands: [
			["auim", "Impale"],
			["auts", "Spiked Carapace"],
			["aucb", "Carrion Beetles"],
			["auls", "Locust Swarm"]
		]
	},
	usyl: {
		name: "Sylvanas",
		race: UNDEAD,
		type: HERO,
		commands: [
			["ansi", "Silence"],
			["anba", "Black Arrow"],
			["andr", "Life Drain"],
			["anch", "Charm"]
		]
	},
	npld: {
		name: "Pit Lord",
		suffix: "Campaign",
		race: DEMON,
		type: HERO,
		commands: [
			["aosh", "Shockwave"],
			["ahtc", "Thunder Clap"],
			["aoeq", "Earthquake"],
			["anrn", "Reincarnation"]
		]
	},
	nman: {
		name: "Mannoroth",
		race: DEMON,
		type: HERO,
		commands: [
			["aosh", "Shockwave"],
			["ahtc", "Thunder Clap"],
			["aoeq", "Earthquake"],
			["anrn", "Reincarnation"]
		]
	},
	nmag: {
		name: "Magtheridon",
		race: DEMON,
		type: HERO,
		commands: [
			["anrf", "Rain of Fire"],
			["anht", "Howl of Terror"],
			["anca", "Cleaving Attack"],
			["ando", "Doom"]
		]
	},
	uwar: {
		name: "Archimonde",
		race: DEMON,
		type: HERO,
		commands: [
			["anrc", "Rain of Chaos"],
			["andp", "Dark Portal"],
			["anfd", "Finger of Death"],
			["ahbh", "Bash"],
			["acm2", "Spell Immunity"]
		]
	},
	umal: {
		name: "Mal’Ganis",
		race: DEMON,
		type: HERO,
		commands: [
			["ausl", "Sleep"],
			["aucs", "Carrion Swarm"],
			["ansl", "Soul Preservation"],
			["andc", "Dark Conversion"]
		]
	},
	utic: {
		name: "Tichondrius",
		race: DEMON,
		type: HERO,
		commands: [
			["ausl", "Sleep"],
			["aucs", "Carrion Swarm"],
			["anrc", "Rain of Chaos"],
			["anfd", "Finger of Death"]
		]
	},
	uvar: {
		name: "Varimathras",
		race: DEMON,
		type: HERO,
		commands: [
			["anrf", "Rain of Fire"],
			["ausl", "Sleep"],
			["auav", "Vampiric Aura"],
			["ando", "Doom"]
		]
	},
	ubal: {
		name: "Balnazzar",
		race: DEMON,
		type: HERO,
		commands: [
			["ausl", "Sleep"],
			["auav", "Vampiric Aura"],
			["anr3", "Rain of Chaos"],
			["aoeq", "Earthquake"],
			["acf3", "Finger of Pain"]
		]
	},
	udth: {
		name: "Detheroc",
		race: DEMON,
		type: HERO,
		commands: [
			["ausl", "Sleep"],
			["aesh", "Shadow Strike"],
			["aucs", "Carrion Swarm"],
			["audd", "Death and Decay"]
		]
	},
	uvng: {
		name: "Dalvengyr",
		race: DEMON,
		type: HERO,
		commands: [
			["auav", "Vampiric Aura"],
			["ausl", "Sleep"],
			["aucs", "Carrion Swarm"],
			["auin", "Inferno"]
		]
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
		commands: [
			["acmi", "Spell Immunity"],
			["anpi", "Permanent Immolation"],
			["acrk", "Resistant Skin"]
		]
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
		commands: [
			["abu2", "Burrow"]
		]
	},
	ucs3: {
		name: "Carrion Beetle",
		suffix: "Level 3",
		race: UNDEAD,
		type: SUMMON,
		commands: [
			["abu3", "Burrow"]
		]
	},
	edem: {
		name: "Demon Hunter",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aemb", "Mana Burn"],
			["aeim", "Immolation"],
			["aeev", "Evasion"],
			["aeme", "Metamorphosis"]
		]
	},
	ekee: {
		name: "Keeper of the Grove",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aeer", "Entangling Roots"],
			["aefn", "Force of Nature"],
			["aeah", "Thorns Aura"],
			["aetq", "Tranquility"]
		]
	},
	emoo: {
		name: "Priestess of the Moon",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aest", "Scout"],
			["ahfa", "Searing Arrows"],
			["aear", "Trueshot Aura"],
			["aesf", "Starfall"],
			["ashm", "Shadowmeld"]
		]
	},
	ewar: {
		name: "Warden",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aefk", "Fan of Knives"],
			["aebl", "Blink"],
			["aesh", "Shadow Strike"],
			["aesv", "Vengeance"],
			["ashm", "Shadowmeld"]
		]
	},
	ewsp: {
		name: "Wisp",
		race: NIGHT_ELF,
		type: NO_ATTACK,
		commands: [
			["adtn", "Denotate"],
			["aren", "Renew"],
			["awha", "Gather"],
			["cmdbuildnightelf", "Create Building"],
			["cmdcancelbuild", "Cancel"]
		],
		build: "cmdbuildnightelf"
	},
	cmdbuildnightelf: {
		name: "Create Building",
		race: NIGHT_ELF,
		type: OTHER,
		commands: [
			["etol", "Create Tree of Life"],
			["eaom", "Create Ancient of War"],
			["edob", "Create Hunter’s Hall"],
			["etrp", "Create Ancient Protector"],
			["emow", "Create Moon Well"],
			["eate", "Create Altar of Elders"],
			["eaoe", "Create Ancient of Lore"],
			["eaow", "Create Ancient of Wind"],
			["edos", "Create Chimaera Roost"],
			["eden", "Create Ancient of Wonders"],
			["cmdcancel", "Cancel"]
		]
	},
	earc: {
		name: "Archer",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["aco2", "Mount Hippogryph"],
			["ashm", "Shadowmeld"],
			["aegr", "Elune’s Grace"],
			["aeib", "Improved Bows"],
			["aemk", "Marksmanship"]
		]
	},
	esen: {
		name: "Huntress",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["aesn", "Sentinel"],
			["ashm", "Shadowmeld"],
			["amgl", "Moon Glaive"]
		]
	},
	ebal: {
		name: "Glaive Thrower",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["cmdattackground", "Attack Ground"],
			["aimp", "Vorpal Blades"]
		]
	},
	edry: {
		name: "Dryad",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["aadm", "Abolish Magic"],
			["amim", "Spell Immunity"],
			["aspo", "Slow Poison"]
		]
	},
	edoc: {
		name: "Druid of the Claw",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["abrf", "Bear Form"],
			["arej", "Rejuvenation"],
			["aroa", "Roar"]
		]
	},
	edcm: {
		name: "Druid of the Claw",
		suffix: "Bear Form",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["abrf", "Night Elf Form"],
			["ara2", "Roar"]
		]
	},
	emtg: {
		name: "Mountain Giant",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["atau", "Taunt"],
			["agra", "War Club"],
			["arsk", "Resistant Skin"],
			["assk", "Hardened Skin"]
		]
	},
	ehip: {
		name: "Hippogryph",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["aco3", "Pick up Archer"]
		]
	},
	ehpr: {
		name: "Hippogryph Rider",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["adec", "Dismount Archer"],
			["aeib", "Improved Bows"],
			["aemk", "Marksmanship"]
		]
	},
	edot: {
		name: "Druid of the Talon",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["acyc", "Cyclone"],
			["arav", "Storm Crow Form"],
			["afae", "Faerie Fire"]
		]
	},
	edtm: {
		name: "Druid of the Talon",
		suffix: "Storm Crow Form",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["arav", "Night Elf Form"],
			["afa2", "Faerie Fire"]
		]
	},
	efdr: {
		name: "Faerie Dragon",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["amim", "Spell Immunity"],
			["amfl", "Mana Flare"],
			["apsh", "Phase Shift"]
		]
	},
	echm: {
		name: "Chimaera",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["acor", "Corrosive Breath"]
		]
	},
	etol: {
		name: "Tree of Life",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["ewsp", "Train Wisp"],
			["renb", "Research Nature’s Blessing"],
			["repm", "Backpack"],
			["etoa", "Upgrade to Tree of Ages"],
			["aent", "Entangle Gold Mine"],
			["aro1", "Uproot"],
			["cmdrally", "Set Rally Point"]
		]
	},
	aroo: {
		name: "Uprooted Ancient",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["aent", "Entangle Gold Mine"],
			["aeat", "Eat Tree"],
			["aro1", "Root"]
		]
	},
	etoa: {
		name: "Tree of Ages",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["ewsp", "Train Wisp"],
			["renb", "Research Nature’s Blessing"],
			["repm", "Backpack"],
			["etoe", "Upgrade to Tree of Ages"],
			["aent", "Entangle Gold Mine"],
			["aro1", "Uproot"],
			["cmdrally", "Set Rally Point"]
		]
	},
	etoe: {
		name: "Tree of Eternity",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["ewsp", "Train Wisp"],
			["renb", "Research Nature’s Blessing"],
			["repm", "Backpack"],
			["aent", "Entangle Gold Mine"],
			["aro1", "Uproot"],
			["cmdrally", "Set Rally Point"]
		]
	},
	egol: {
		name: "Entangled Gold Mine",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["slo2", "Load Wisp"],
			["adri", "Unload All"]
		]
	},
	eaom: {
		name: "Ancient of War",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["earc", "Train Archer"],
			["esen", "Train Huntress"],
			["ebal", "Train Glaive Thrower"],
			["reib", "Research Improved Bows"],
			["remk", "Research Marksmanship"],
			["remg", "Research Moon Glaive"],
			["resc", "Research Sentinel"],
			["repb", "Research Vorpal Blades"],
			["cmdrally", "Set Rally Point"],
			["aro1", "Uproot"]
		]
	},
	edob: {
		name: "Hunter’s Hall",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["resm", "Upgrade Strength of the Moon"],
			["rema", "Upgrade Moon Armor"],
			["resw", "Upgrade Strength of the Wild"],
			["rerh", "Upgrade Reinforced Hides"],
			["reuv", "Research Ultravision"],
			["rews", "Research Well Spring"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	etrp: {
		name: "Ancient Protector",
		race: NIGHT_ELF,
		type: TOWER,
		commands: [
			["aro2", "Uproot"]
		]
	},
	emow: {
		name: "Moon Well",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["ambt", "Replenish Mana and Life"],
			["aews", "Well Spring"]
		]
	},
	eate: {
		name: "Altar of Elders",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["edem", "Summon Demon Hunter"],
			["ekee", "Summon Keeper of the Grove"],
			["emoo", "Summon Priestess of the Moon"],
			["ewar", "Summon Warden"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	eate_campaign: {
		name: "Altar of Elders",
		suffix: "Campaign",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["etyr", "Tyrande"],
			["efur", "Furion"],
			["emns", "Malfurion"],
			["emfr", "Malfurion (with Stag)"],
			["eill", "Illidan"],
			["ewrd", "Maiev"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	eaoe: {
		name: "Ancient of Lore",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["edry", "Train Dryad"],
			["edoc", "Train Druid of the Claw"],
			["emtg", "Train Mountain Giant"],
			["resi", "Research Abolish Magic"],
			["redc", "Druid of the Claw Training"],
			["rers", "Research Resistant Skin"],
			["rehs", "Research Hardened Skin"],
			["reeb", "Research Mark of the Claw"],
			["cmdrally", "Set Rally Point"],
			["aro1", "Uproot"]
		]
	},
	eaow: {
		name: "Ancient of Wind",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["ehip", "Train Hippogryph"],
			["edot", "Train Druid of the Talon"],
			["efdr", "Train Faerie Dragon"],
			["redt", "Druid of the Talon Training"],
			["reec", "Research Mark of the Talon"],
			["cmdrally", "Set Rally Point"],
			["aro1", "Uproot"]
		]
	},
	eaow_campaign: {
		name: "Ancient of Wind",
		suffix: "Campaign",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["ehip", "Train Hippogryph"],
			["edot", "Train Druid of the Talon"],
			["efdr", "Train Faerie Dragon"],
			["reht", "Hippogryph Taming"],
			["redt", "Druid of the Talon Training"],
			["reec", "Research Mark of the Talon"],
			["cmdrally", "Set Rally Point"],
			["aro1", "Uproot"]
		]
	},
	edos: {
		name: "Chimaera Roost",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["echm", "Train Chimaera"],
			["cmdrally", "Set Rally Point"],
			["recb", "Research Corrosive Breath"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	eden: {
		name: "Ancient of Wonders",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["aro1", "Uproot"],
			["moon", "Purchase Moonstone"],
			["plcl", "Purchase Lesser Clarity Potion"],
			["dust", "Purchase Dust of Appearance"],
			["phea", "Purchase Potion of Healing"],
			["pman", "Purchase Potion of Mana"],
			["stwp", "Purchase Scroll of Town Portal"],
			["spre", "Purchase Staff of Preservation"],
			["oven", "Purchase Orb of Venom"],
			["pams", "Purchase Anti-magic Potion"],
			["anei", "Select User"]
		]
	},
	eshy: {
		name: "Night Elf Shipyard",
		race: NIGHT_ELF,
		type: BUILDING,
		commands: [
			["etrs", "Hire Transport Ship"],
			["edes", "Hire Frigate"],
			["ebsh", "Hire Battleship"],
			["ane2", "Select User"]
		]
	},
	etrs: {
		name: "Night Elf Transport Ship",
		race: NIGHT_ELF,
		type: NO_ATTACK,
		commands: [
			["slo3", "Load"],
			["sdro", "Unload"]
		]
	},
	edes: {
		name: "Night Elf Frigate",
		race: NIGHT_ELF,
		type: UNIT
	},
	ebsh: {
		name: "Night Elf Battleship",
		race: NIGHT_ELF,
		type: UNIT
	},
	efon: {
		name: "Treant",
		race: NIGHT_ELF,
		type: SUMMON
	},
	nowl: {
		name: "Owl Scout",
		suffix: "Level 1",
		race: NIGHT_ELF,
		type: SUMMON,
		commands: [
			["acmi", "Spell Immunity"],
			["adtg", "True Sight"]
		]
	},
	now2: {
		name: "Owl Scout",
		suffix: "Level 2",
		race: NIGHT_ELF,
		type: SUMMON,
		commands: [
			["acmi", "Spell Immunity"],
			["adtg", "True Sight"]
		]
	},
	now3: {
		name: "Owl Scout",
		suffix: "Level 3",
		race: NIGHT_ELF,
		type: SUMMON,
		commands: [
			["acmi", "Spell Immunity"],
			["adtg", "True Sight"]
		]
	},
	espv: {
		name: "Avatar of Vengeance",
		race: NIGHT_ELF,
		type: SUMMON,
		commands: [
			["avng", "Spirit of Vengeance"],
			["acmi", "Spell Immunity"],
			["acrk", "Resistant Skin"]
		]
	},
	even: {
		name: "Spirit of Vengeance",
		race: NIGHT_ELF,
		type: SUMMON
	},
	enec: {
		name: "Night Elf Runner",
		race: NIGHT_ELF,
		type: NO_ATTACK,
		commands: [
			["ahea", "Heal"]
		]
	},
	nwat: {
		name: "Sentry",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["acbl", "Bloodlust"]
		]
	},
	nssn: {
		name: "Warden",
		suffix: "Campaign",
		race: NIGHT_ELF,
		type: UNIT
	},
	eshd: {
		name: "Shandris",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["ashm", "Shadowmeld"]
		]
	},
	ensh: {
		name: "Naisha",
		race: NIGHT_ELF,
		type: UNIT,
		commands: [
			["aesr", "Sentinel"],
			["ashm", "Shadowmeld"],
			["amgr", "Moon Glaive"]
		]
	},
	eill: {
		name: "Illidan",
		race: NAGA,
		type: HERO,
		commands: [
			["aemb", "Mana Burn"],
			["aeim", "Immolation"],
			["aeev", "Evasion"],
			["aell", "Metamorphosis"]
		]
	},
	ecen: {
		name: "Cenarius",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aeer", "Entangling Roots"],
			["aefn", "Force of Nature"],
			["aeah", "Thorns Aura"],
			["aetq", "Tranquility"],
			["scc1", "Cyclone"]
		]
	},
	efur: {
		name: "Furion",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aeer", "Entangling Roots"],
			["aefn", "Force of Nature"],
			["aeah", "Thorns Aura"],
			["aetq", "Tranquility"]
		]
	},
	emns: {
		name: "Malfurion",
		suffix: "Expansion",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aeer", "Entangling Roots"],
			["aefn", "Force of Nature"],
			["aeah", "Thorns Aura"],
			["aetq", "Tranquility"]
		]
	},
	emfr: {
		name: "Malfurion",
		suffix: "with Stag",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aeer", "Entangling Roots"],
			["aefn", "Force of Nature"],
			["aeah", "Thorns Aura"],
			["aetq", "Tranquility"]
		]
	},
	etyr: {
		name: "Tyrande",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aest", "Scout"],
			["ahfa", "Searing Arrows"],
			["aear", "Trueshot Aura"],
			["aesf", "Starfall"],
			["ashm", "Shadowmeld"]
		]
	},
	etyr_instant: {
		name: "Tyrande",
		suffix: "Mission 2",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aest", "Scout"],
			["ahfa", "Searing Arrows"],
			["aear", "Trueshot Aura"],
			["aesf", "Starfall"],
			["sshm", "Shadowmeld (Instant)"]
		]
	},
	ewrd: {
		name: "Maiev",
		race: NIGHT_ELF,
		type: HERO,
		commands: [
			["aefk", "Fan of Knives"],
			["aebl", "Blink"],
			["aesh", "Shadow Strike"],
			["aesv", "Vengeance"],
			["ashm", "Shadowmeld"]
		]
	},
	eevi: {
		name: "Illidan",
		suffix: "Expansion",
		race: NAGA,
		type: HERO,
		commands: [
			["aemb", "Mana Burn"],
			["aeim", "Immolation"],
			["aeev", "Evasion"],
			["aevi", "Metamorphosis"]
		]
	},
	hvsh: {
		name: "Lady Vashj",
		race: NAGA,
		type: HERO,
		commands: [
			["anfl", "Forked Lightning"],
			["anfa", "Frost Arrows"],
			["anms", "Mana Shield"],
			["anto", "Tornado"]
		]
	},
	nmpe: {
		name: "Mur’gul Slave",
		race: NAGA,
		type: UNIT,
		commands: [
			["anha", "Gather"],
			["arep", "Repair"],
			["cmdbuildnaga", "Build Structure"],
			["cmdcancelbuild", "Cancel"]
		],
		build: "cmdbuildnaga"
	},
	cmdbuildnaga: {
		name: "Build Structure",
		race: NAGA,
		type: OTHER,
		commands: [
			["nntt", "Build Temple of Tides"],
			["nnsg", "Build Spawning Grounds"],
			["nnfm", "Build Coral Bed"],
			["nntg", "Build Tidal Guardian"],
			["nnsa", "Build Shrine of Azshara"],
			["nnad", "Build Altar of the Depths"],
			["cmdcancel", "Cancel"]
		]
	},
	nnmg: {
		name: "Mur’gul Reaver",
		race: NAGA,
		type: UNIT
	},
	nmyr: {
		name: "Naga Myrmidon",
		race: NAGA,
		type: UNIT,
		commands: [
			["anen", "Ensnare"],
			["asb1", "Submerge"]
		]
	},
	nnrg: {
		name: "Naga Royal Guard",
		race: NAGA,
		type: UNIT,
		commands: [
			["asb2", "Submerge"],
			["accv", "Crushing Wave"],
			["accb", "Frost Bolt"],
			["acwe", "Summon Sea Elemental"],
			["acsk", "Resistant Skin"],
		]
	},
	nsnp: {
		name: "Snap Dragon",
		race: NAGA,
		type: UNIT,
		commands: [
			["aspo", "Slow Poison"],
			["asb3", "Submerge"]
		]
	},
	nhyc: {
		name: "Dragon Turtle",
		race: NAGA,
		type: UNIT,
		commands: [
			["acdv", "Devour"],
			["anth", "Spiked Shell"],
			["ansk", "Hardened Skin"]

		]
	},
	nnsw: {
		name: "Naga Siren",
		race: NAGA,
		type: UNIT,
		commands: [
			["acny", "Cyclone"],
			["acfu", "Frost Armor"],
			["anpa", "Parasite"]
		]
	},
	nwgs: {
		name: "Couatl",
		race: NAGA,
		type: UNIT,
		commands: [
			["andm", "Abolish Magic"]
		]
	},
	nntt: {
		name: "Temple of Tides",
		race: NAGA,
		type: BUILDING,
		commands: [
			["nmpe", "Train Mur’gul Slave"],
			["nnmg", "Train Mur’gul Reaver"],
			["cmdrally", "Set Rally Point"],
			["rnat", "Upgrade Blades"],
			["rnam", "Upgrade Scales"],
			["rnsb", "Research Submerge"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	nnsg: {
		name: "Spawning Grounds",
		race: NAGA,
		type: BUILDING,
		commands: [
			["nmyr", "Train Myrmidon"],
			["nsnp", "Train Snap Dragon"],
			["nhyc", "Train Dragon Turtle"],
			["cmdrally", "Set Rally Point"],
			["rnen", "Research Ensnare"],
			["cmdcancelbuild", "Cancel"]
		]
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
		commands: [
			["nnsw", "Train Naga Siren"],
			["nwgs", "Train Couatl"],
			["rnsw", "Naga Siren Training"],
			["rnsi", "Research Abolish Magic"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	nnad: {
		name: "Altar of the Depths",
		race: NAGA,
		type: BUILDING,
		commands: [
			["eevi", "Illidan (Expansion)"],
			["hvsh", "Lady Vashj"],
			["cmdrally", "Set Rally Point"],
			["cmdcancelbuild", "Cancel"]
		]
	},
	nsel: {
		name: "Sea Elemental",
		race: NAGA,
		type: SUMMON,
		commands: [
			["acbh", "Bash"]
		]
	},
	ncfs: {
		name: "Watery Minion",
		suffix: "Level 1",
		race: NAGA,
		type: SUMMON
	},
	ntws: {
		name: "Watery Minion",
		suffix: "Level 2",
		race: NAGA,
		type: SUMMON
	},
	nsns: {
		name: "Watery Minion",
		suffix: "Level 3",
		race: NAGA,
		type: SUMMON,
		commands: [
			["acsw", "Slow"],
			["acdm", "Abolish Magic"]
		]
	},
	nngs: {
		name: "Naga Sea Witch",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["anfl", "Forked Lightning"],
			["anfa", "Frost Arrows"],
			["anms", "Mana Shield"],
			["anto", "Tornado"]
		]
	},
	nbrn: {
		name: "Dark Ranger",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["ansi", "Silence"],
			["anba", "Black Arrow"],
			["andr", "Life Drain"],
			["anch", "Charm"]
		]
	},
	npbm: {
		name: "Pandaren Brewmaster",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["anbf", "Breath of Fire"],
			["andh", "Drunken Haze"],
			["andb", "Drunken Brawler"],
			["anef", "Storm, Earth, and Fire"]
		]
	},
	nbst: {
		name: "Beastmaster",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["ansg", "Summon Bear"],
			["ansq", "Summon Quilbeast"],
			["answ", "Summon Hawk"],
			["anst", "Stampede"]
		]
	},
	nplh: {
		name: "Pit Lord",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["anrf", "Rain of Fire"],
			["anht", "Howl of Terror"],
			["anca", "Cleaving Attack"],
			["ando", "Doom"]
		]
	},
	ntin: {
		name: "Goblin Tinker",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["ansy", "Pocket Factory"],
			["ancs", "Cluster Rockets"],
			["aneg", "Engineering Upgrade"],
			["anrg", "Robo-Goblin"],
			["ande", "Demolish"]
		]
	},
	ntin1: {
		name: "Goblin Tinker",
		suffix: "Engineering Upgrade 1",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["ans1", "Pocket Factory"],
			["anc1", "Cluster Rockets"],
			["aneg", "Engineering Upgrade"],
			["ang1", "Robo-Goblin"],
			["and1", "Demolish"]
		]
	},
	ntin2: {
		name: "Goblin Tinker",
		suffix: "Engineering Upgrade 2",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["ans2", "Pocket Factory"],
			["anc2", "Cluster Rockets"],
			["aneg", "Engineering Upgrade"],
			["ang2", "Robo-Goblin"],
			["and2", "Demolish"]
		]
	},
	ntin3: {
		name: "Goblin Tinker",
		suffix: "Engineering Upgrade 3",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["ans3", "Pocket Factory"],
			["anc3", "Cluster Rockets"],
			["aneg", "Engineering Upgrade"],
			["ang3", "Robo-Goblin"],
			["and3", "Demolish"]
		]
	},
	nalc: {
		name: "Goblin Alchemist",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["anhs", "Healing Spray"],
			["ancr", "Chemical Rage"],
			["anab", "Acid Bomb"],
			["antm", "Transmute"]
		]
	},
	nfir: {
		name: "Firelord",
		race: NEUTRAL,
		type: HERO,
		commands: [
			["anso", "Soul Burn"],
			["anlm", "Summon Lava Spawn"],
			["ania", "Incinerate"],
			["anvc", "Volcano"]
		]
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
		commands: [
			["anpi", "Permanent Immolation"],
			["acrk", "Resistant Skin"]
		]
	},
	npn2: {
		name: "Storm",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["anwk", "Wind Walk"],
			["accy", "Cyclone"],
			["adsm", "Dispel Magic"],
			["acrk", "Resistant Skin"]
		]
	},
	npn3: {
		name: "Earth",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["anta", "Taunt"],
			["acpv", "Pulverize"],
			["acmi", "Spell Immunity"],
			["acrk", "Resistant Skin"]
		]
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
		commands: [
			["acbh", "Bash"]
		]
	},
	ngz3: {
		name: "Spirit Bear",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["anbl", "Blink"],
			["acbh", "Bash"]
		]
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
		commands: [
			["afzy", "Frenzy"]
		]
	},
	nqb3: {
		name: "Raging Quilbeast",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["afzy", "Frenzy"]
		]
	},
	nqb4: {
		name: "Berserk Quilbeast",
		suffix: "Level 4",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["afzy", "Frenzy"]
		]
	},
	nwe1: {
		name: "Hawk",
		suffix: "Level 1",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["antr", "True Sight"]
		]
	},
	nwe2: {
		name: "Thunder Hawk",
		suffix: "Level 2",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["antr", "True Sight"]
		]
	},
	nwe3: {
		name: "Spirit Hawk",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["antr", "True Sight"]
		]
	},
	nba2: {
		name: "Doom Guard",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["acrf", "Rain of Fire"],
			["awrs", "War Stomp"],
			["adsm", "Dispel Magic"],
			["accr", "Cripple"],
			["acsk", "Resistant Skin"]
		]
	},
	nfac: {
		name: "Pocket Factory",
		suffix: "Level 1",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["cmdrally", "Set Rally Point"]
		]
	},
	nfa1: {
		name: "Pocket Factory",
		suffix: "Level 2",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["cmdrally", "Set Rally Point"]
		]
	},
	nfa2: {
		name: "Pocket Factory",
		suffix: "Level 3",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["cmdrally", "Set Rally Point"]
		]
	},
	ncgb: {
		name: "Clockwerk Goblin",
		suffix: "Level 1",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["asdg", "Kaboom!"]
		]
	},
	ncg1: {
		name: "Clockwerk Goblin",
		suffix: "Level 2",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["asd2", "Kaboom!"]
		]
	},
	ncg2: {
		name: "Clockwerk Goblin",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["asd3", "Kaboom!"]
		]
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
	clsd: {
		name: "Cloak of Shadows",
		race: NEUTRAL,
		type: ITEM,
		commands: [
			["aihm", "Hide"]
		]
	},
	ngsp: {
		name: "Goblin Sappers",
		race: NEUTRAL,
		type: NO_ATTACK,
		commands: [
			["asds", "Kaboom!"]
		]
	},
	ngir: {
		name: "Goblin Shredder",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["ahr3", "Gather"]
		]
	},
	nzep: {
		name: "Goblin Zeppelin",
		race: NEUTRAL,
		type: NO_ATTACK,
		commands: [
			["aloa", "Load"],
			["adro", "Unload All"]
		]
	},
	ngme: {
		name: "Goblin Merchant",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["bspd", "Purchase Boots of Speed"],
			["prvt", "Purchase Periapt of Vitality"],
			["cnob", "Purchase Circlet of Nobility"],
			["dust", "Purchase Dust of Appearance"],
			["spro", "Purchase Scroll of Protection"],
			["pinv", "Purchase Potion of Invisibility"],
			["stwp", "Purchase Scroll of Town Portal"],
			["stel", "Purchase Staff of Teleportation"],
			["tret", "Purchase Tome of Retraining"],
			["shea", "Purchase Scroll of Healing"],
			["pnvl", "Purchase Potion of Lesser Invulnerability"],
			["anei", "Select User"]
		]
	},
	ngme_original: {
		name: "Goblin Merchant",
		suffix: "Original",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["phea", "Purchase Potion of Healing"],
			["pman", "Purchase Potion of Mana"],
			["pinv", "Potion of Invisibility"],
			["shea", "Purchase Scroll of Healing"],
			["spro", "Purchase Scroll of Protection"],
			["wneg", "Wand of Negation"],
			["gemt", "Gem of True Seeing"],
			["stwp", "Purchase Scroll of Town Portal"],
			["anei", "Select User"]
		]
	},
	nmrk: {
		name: "Marketplace",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["anei", "Select User"]
		]
	},
	ngad: {
		name: "Goblin Laboratory",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["ngsp", "Hire Goblin Sapper"],
			["nzep", "Hire Goblin Zeppelin"],
			["ngir", "Hire Goblin Shredder"],
			["andt", "Reveal"]
		]
	},
	nshp: {
		name: "Goblin Shipyard",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nbot", "Hire Transport Ship"]
		]
	},
	ntav: {
		name: "Tavern",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nngs", "Summon Naga Sea Witch"],
			["nbrn", "Summon Dark Ranger"],
			["npbm", "Summon Pandaren Brewmaster"],
			["nfir", "Summon Firelord"],
			["nplh", "Summon Pit Lord"],
			["nbst", "Summon Beastmaster"],
			["ntin", "Summon Tinker"],
			["nalc", "Summon Alchemist"]
		]
	},
	ndrr: {
		name: "Red Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nrdk", "Summon Red Dragon Whelp"],
			["nrdr", "Summon Red Drake"],
			["nrwm", "Summon Red Dragon"]
		]
	},
	ndrg: {
		name: "Green Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["ngrw", "Summon Green Dragon Whelp"],
			["ngdk", "Summon Green Drake"],
			["ngrd", "Summon Green Dragon"]
		]
	},
	ndru: {
		name: "Blue Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nadw", "Summon Blue Dragon Whelp"],
			["nadk", "Summon Blue Drake"],
			["nadr", "Summon Blue Dragon"]
		]
	},
	ndrz: {
		name: "Bronze Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nbzw", "Summon Bronze Dragon Whelp"],
			["nbzk", "Summon Bronze Drake"],
			["nbzd", "Summon Bronze Dragon"]
		]
	},
	ndrk: {
		name: "Black Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nbdr", "Summon Black Dragon Whelp"],
			["nbdk", "Summon Black Drake"],
			["nbwm", "Summon Black Dragon"]
		]
	},
	ndro: {
		name: "Nether Dragon Roost",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nnht", "Summon Nether Dragon Hatchling"],
			["nndk", "Summon Nether Drake"],
			["nndr", "Summon Nether Dragon"]
		]
	},
	nmer: {
		name: "Mercenary Camp",
		suffix: "Lordaeron Summer",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nfsp", "Hire Forest Troll Shadow Priest"],
			["nftb", "Hire Forest Troll Berserker"],
			["ngrk", "Summon Mud Golem"],
			["nogm", "Hire Ogre Mauler"]
		]
	},
	nmr2: {
		name: "Mercenary Camp",
		suffix: "Lordaeron Fall",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["ngnb", "Hire Gnoll Brute"],
			["ngnw", "Hire Gnoll Warden"],
			["ngrk", "Summon Mud Golem"],
			["nomg", "Hire Ogre Magi"]
		]
	},
	nmr3: {
		name: "Mercenary Camp",
		suffix: "Lordaeron Winter",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nitp", "Hire Ice Troll Priest"],
			["nits", "Hire Ice Troll Berserker"],
			["ngrk", "Summon Mud Golem"],
			["nogm", "Hire Ogre Mauler"]
		]
	},
	nmr4: {
		name: "Mercenary Camp",
		suffix: "Barrens",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["ncea", "Hire Centaur Archer"],
			["ncen", "Hire Centaur Outrunner"],
			["nhrw", "Hire Harpy Windwitch"],
			["nqbh", "Hire Quillboar Hunter"]
		]
	},
	nmr5: {
		name: "Mercenary Camp",
		suffix: "Ashenvale",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["ndtp", "Hire Dark Troll Shadow Priest"],
			["ndtb", "Hire Dark Troll Berserker"],
			["nsts", "Hire Satyr Shadowdancer"],
			["nwlg", "Summon Giant Wolf"]
		]
	},
	nmr6: {
		name: "Mercenary Camp",
		suffix: "Felwood",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nmfs", "Hire Murloc Flesheater"],
			["nsln", "Summon Sludge Monstrosity"],
			["nsts", "Hire Satyr Shadowdancer"],
			["nssp", "Summon Spitting Spider"]
		]
	},
	nmr7: {
		name: "Mercenary Camp",
		suffix: "Northrend",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nnwa", "Hire Nerubian Warrior"],
			["nits", "Hire Ice Troll Berserker"],
			["nnwr", "Hire Nerubian Seer"],
			["nrvs", "Summon Frost Revenant"]
		]
	},
	nmr8: {
		name: "Mercenary Camp",
		suffix: "Cityscape",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nass", "Hire Assassin"],
			["nrog", "Hire Rogue"],
			["nkog", "Hire Kobold Geomancer"],
			["nfsh", "Hire Forest Troll High Priest"]
		]
	},
	nmr9: {
		name: "Mercenary Camp",
		suffix: "Dalaran",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nass", "Hire Assassin"],
			["nrog", "Hire Rogue"],
			["nkog", "Hire Kobold Geomancer"],
			["nfsh", "Hire Forest Troll High Priest"]
		]
	},
	nmr0: {
		name: "Mercenary Camp",
		suffix: "Village",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nkot", "Hire Kobold Tunneler"],
			["nass", "Hire Assassin"],
			["nkog", "Hire Kobold Geomancer"],
			["nkol", "Hire Kobold Taskmaster"]
		]
	},
	nmra: {
		name: "Mercenary Camp",
		suffix: "Dungeon",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nskf", "Hire Burning Archer"],
			["nowb", "Summon Wildkin"],
			["nkog", "Hire Kobold Geomancer"],
			["nrvs", "Summon Frost Revenant"]
		]
	},
	nmrb: {
		name: "Mercenary Camp",
		suffix: "Underground",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nskf", "Hire Burning Archer"],
			["nowb", "Summon Wildkin"],
			["nkog", "Hire Kobold Geomancer"]
		]
	},
	nmrc: {
		name: "Mercenary Camp",
		suffix: "Sunken Ruins",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nmbg", "Hire Mur’gul Blood-Gill"],
			["nmsn", "Hire Mur’gul Snarecaster"],
			["nsrh", "Hire Stormreaver Hermit"],
			["nsog", "Hire Skeletal Orc Grunt"]
		]
	},
	nmrd: {
		name: "Mercenary Camp",
		suffix: "Icecrown Glacier",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["nbdw", "Hire Blue Dragonspawn Warrior"],
			["nits", "Hire Ice Troll Berserker"],
			["nubw", "Hire Unbroken Darkweaver"],
			["ntkh", "Hire Tuskarr Healer"]
		]
	},
	nmre: {
		name: "Mercenary Camp",
		suffix: "Outland",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["npfl", "Summon Fel Beast"],
			["ndrm", "Hire Draenei Disciple"],
			["nvdw", "Hire Voidwalker"],
			["ndrd", "Hire Draenei Darkslayer"]
		]
	},
	nmrf: {
		name: "Mercenary Camp",
		suffix: "Black Citadel",
		race: NEUTRAL,
		type: BUILDING,
		commands: [
			["ndrm", "Hire Draenei Disciple"],
			["nfgb", "Summon Bloodfiend"],
			["nvdw", "Hire Voidwalker"],
			["nsog", "Hire Skeletal Orc Grunt"]
		]
	},
	nanm: {
		name: "Barbed Arachnathid",
		suffix: "Mercenary",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["abu5", "Burrow"]
		]
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
		commands: [
			["acvs", "Envenomed Weapons"],
			["acss", "Shadow Strike"]
		]
	},
	nano: {
		name: "Overlord Arachnathid",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acac", "Command Aura"]
		]
	},
	nban: {
		name: "Bandit",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["ashm", "Shadowmeld"]
		]
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
		commands: [
			["ashm", "Shadowmeld"]
		]
	},
	nass: {
		name: "Assassin",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["ashm", "Shadowmeld"],
			["acvs", "Envenomed Weapons"]
		]
	},
	nenf: {
		name: "Enforcer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["ashm", "Shadowmeld"],
			["acev", "Evasion"]
		]
	},
	nbld: {
		name: "Bandit Lord",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["ashm", "Shadowmeld"],
			["acav", "Devotion Aura"],
			["acds", "Divine Shield"]
		]
	},
	nbdm: {
		name: "Blue Dragonspawn Meddler",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acev", "Evasion"]
		]
	},
	nbda: {
		name: "Blue Dragonspawn Apprentice",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acrj", "Rejuvenation"],
			["acev", "Evasion"]
		]
	},
	nbdw: {
		name: "Blue Dragonspawn Warrior",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acev", "Evasion"]
		]
	},
	nbds: {
		name: "Blue Dragonspawn Sorcerer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acfn", "Frost Nova"],
			["acev", "Evasion"]
		]
	},
	nbdo: {
		name: "Blue Dragonspawn Overseer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acev", "Evasion"],
			["acav", "Devotion Aura"],
			["acbf", "Breath of Frost"]
		]
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
		commands: [
			["acsa", "Searing Arrows"]
		]
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
		commands: [
			["acbl", "Bloodlust"],
			["acdm", "Abolish Magic"]
		]
	},
	ncnk: {
		name: "Centaur Khan",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["scae", "Endurance Aura"],
			["acrn", "Reincarnation"],
			["awrs", "War Stomp"]
		]
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
		commands: [
			["anh1", "Heal"]
		]
	},
	ndtt: {
		name: "Dark Troll Trapper",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acen", "Ensnare"]
		]
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
		commands: [
			["anh2", "Heal"],
			["acsl", "Sleep"]
		]
	},
	ndtw: {
		name: "Dark Troll Warlord",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acat", "Trueshot Aura"]
		]
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
		commands: [
			["anh1", "Heal"]
		]
	},
	ndrp: {
		name: "Draenei Protector",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acen", "Ensnare"]
		]
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
		commands: [
			["acim", "Immolation"]
		]
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
		commands: [
			["acdv", "Devour"],
			["acmi", "Spell Immunity"]
		]
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
		commands: [
			["acdv", "Devour"],
			["acmi", "Spell Immunity"]
		]
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
		commands: [
			["acdv", "Devour"],
			["acmi", "Spell Immunity"]
		]
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
		commands: [
			["acdv", "Devour"],
			["acmi", "Spell Immunity"]
		]
	},
	nadw: {
		name: "Blue Dragon Whelp",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["afrc", "Frost Attack"]
		]
	},
	nadk: {
		name: "Blue Drake",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["afrc", "Frost Attack"]
		]
	},
	nadr: {
		name: "Blue Dragon",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["afrc", "Frost Attack"],
			["acdv", "Devour"],
			["acmi", "Spell Immunity"]
		]
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
		commands: [
			["accr", "Cripple"],
			["acmi", "Spell Immunity"]
		]
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
		commands: [
			["acmi", "Spell Immunity"]
		]
	},
	nelb: {
		name: "Berserk Elemental",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmi", "Spell Immunity"],
			["acfn", "Frost Nova"]
		]
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
		commands: [
			["aenr", "Entangling Roots"],
			["acvs", "Envenomed Weapons"]
		]
	},
	nepl: {
		name: "Plague Treant",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["aenr", "Entangling Roots"],
			["aap3", "Disease Cloud"]
		]
	},
	ners: {
		name: "Eredar Sorcerer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acdm", "Abolish Magic"],
			["acsl", "Sleep"]
		]
	},
	nerd: {
		name: "Eredar Diabolist",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acpa", "Parasite"],
			["anfb", "Firebolt"]
		]
	},
	nerw: {
		name: "Eredar Warlock",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acbh", "Bash"],
			["acfd", "Finger of Pain"],
			["acmf", "Mana Shield"]
		]
	},
	nfor: {
		name: "Faceless One Trickster",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["accs", "Curse"],
			["acpu", "Purge"]
		]
	},
	nfot: {
		name: "Faceless One Terror",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acsl", "Sleep"],
			["acmf", "Mana Shield"]
		]
	},
	nfod: {
		name: "Faceless One Deathbringer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acad", "Animate Dead"],
			["acsi", "Silence"]
		]
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
		commands: [
			["acce", "Cleaving Attack"]
		]
	},
	nfov: {
		name: "Overlord",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acht", "Howl of Terror"],
			["acce", "Cleaving Attack"],
			["acvp", "Vampiric Aura"]
		]
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
		commands: [
			["ambb", "Mana Burn"]
		]
	},
	npfm: {
		name: "Fel Ravager",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acbk", "Black Arrow"],
			["acde", "Devour Magic"]
		]
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
		commands: [
			["anh1", "Heal"],
			["acdm", "Abolish Magic"]
		]
	},
	nftt: {
		name: "Forest Troll Trapper",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acen", "Ensnare"]
		]
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
		commands: [
			["anh2", "Heal"],
			["acif", "Inner Fire"],
			["acd2", "Abolish Magic"]
		]
	},
	nftk: {
		name: "Forest Troll Warlord",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acat", "Trueshot Aura"]
		]
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
		commands: [
			["acr2", "Rejuvenation"]
		]
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
		commands: [
			["acff", "Faerie Fire"]
		]
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
		commands: [
			["acr2", "Rejuvenation"],
			["acls", "Lightning Shield"]
		]
	},
	nfra: {
		name: "Furbolg Ursa Warrior",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["awrs", "War Stomp"],
			["acac", "Command Aura"]
		]
	},
	ngh1: {
		name: "Ghost",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acps", "Possession"]
		]
	},
	ngh2: {
		name: "Wraith",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acps", "Possession"],
			["accs", "Curse"]
		]
	},
	nsgn: {
		name: "Sea Giant",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acpv", "Pulverize"]
		]
	},
	nsgh: {
		name: "Sea Giant Hunter",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acpv", "Pulverize"],
			["acen", "Ensnare"]
		]
	},
	nsgb: {
		name: "Sea Giant Behemoth",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["actb", "Hurl Boulder"],
			["acpv", "Pulverize"],
			["awrs", "War Stomp"]
		]
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
		commands: [
			["acvs", "Envenomed Weapons"]
		]
	},
	nsgt: {
		name: "Giant Spider",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acvs", "Envenomed Weapons"],
			["acen", "Ensnare"]
		]
	},
	nsbm: {
		name: "Brood Mother",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acvs", "Envenomed Weapons"],
			["acen", "Ensnare"]
		]
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
		commands: [
			["acvs", "Envenomed Weapons"]
		]
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
		commands: [
			["acpu", "Purge"]
		]
	},
	ngnv: {
		name: "Gnoll Overseer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acac", "Command Aura"]
		]
	},
	ngrk: {
		name: "Mud Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmi", "Spell Immunity"],
			["acsw", "Slow"]
		]
	},
	ngst: {
		name: "Rock Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmi", "Spell Immunity"],
			["actb", "Hurl Boulder"]
		]
	},
	nggr: {
		name: "Granite Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmi", "Spell Immunity"],
			["actb", "Hurl Boulder"],
			["actc", "Slam"]
		]
	},
	narg: {
		name: "Battle Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmi", "Spell Immunity"]
		]
	},
	nwrg: {
		name: "War Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmi", "Spell Immunity"]
		]
	},
	nsgg: {
		name: "Siege Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmi", "Spell Immunity"]
		]
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
		commands: [
			["acff", "Faerie Fire"]
		]
	},
	nhrh: {
		name: "Harpy Storm-hag",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["accs", "Curse"],
			["acsl", "Sleep"]
		]
	},
	nhrq: {
		name: "Harpy Queen",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acr2", "Rejuvenation"],
			["accy", "Cyclone"]
		]
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
		commands: [
			["accs", "Curse"]
		]
	},
	nhhr: {
		name: "Heretic",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acrd", "Raise Dead"],
			["acca", "Carrion Swarm"]
		]
	},
	nhyh: {
		name: "Hydra Hatchling",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["aspo", "Slow Poison"]
		]
	},
	nhyd: {
		name: "Hydra",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["aspo", "Slow Poison"]
		]
	},
	nehy: {
		name: "Elder Hydra",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acff", "Faerie Fire"]
		]
	},
	nahy: {
		name: "Ancient Hydra",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["aspo", "Slow Poison"],
			["awrh", "War Stomp"],
			["acdv", "Devour"]
		]
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
		commands: [
			["anh1", "Heal"]
		]
	},
	nitt: {
		name: "Ice Troll Trapper",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acen", "Ensnare"]
		]
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
		commands: [
			["anh2", "Heal"],
			["acf2", "Frost Armor"],
			["acd2", "Abolish Magic"]
		]
	},
	nitw: {
		name: "Ice Troll Warlord",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acat", "Trueshot Aura"]
		]
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
		commands: [
			["acbc", "Breath of Fire"]
		]
	},
	nina: {
		name: "Infernal Juggernaut",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["anin", "Inferno"]
		]
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
		commands: [
			["acsw", "Slow"],
			["acdm", "Abolish Magic"]
		]
	},
	nkot: {
		name: "Kobold Tunneler",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acbh", "Bash"]
		]
	},
	nkol: {
		name: "Kobold Taskmaster",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acac", "Command Aura"],
			["acbh", "Bash"]
		]
	},
	nltl: {
		name: "Lightning Lizard",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acpu", "Purge"]
		]
	},
	nthl: {
		name: "Thunder Lizard",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["act2", "Slam"]
		]
	},
	nstw: {
		name: "Storm Wyrm",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acls", "Lightning Shield"],
			["accl", "Chain Lightning"],
			["acdv", "Devour"]
		]
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
		commands: [
			["anh1", "Heal"],
			["acf2", "Frost Armor"]
		]
	},
	nlds: {
		name: "Makrura Deepseer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["aenw", "Entangling Roots"],
			["aslp", "Summon Prawns"]
		]
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
		commands: [
			["acce", "Cleaving Attack"],
			["acav", "Devotion Aura"]
		]
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
		commands: [
			["acf2", "Frost Armor"]
		]
	},
	nwzg: {
		name: "Renegade Wizard",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acpu", "Purge"],
			["acls", "Lightning Shield"]
		]
	},
	nwzd: {
		name: "Dark Wizard",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acrd", "Raise Dead"],
			["acba", "Brilliance Aura"],
			["acpy", "Polymorph"]
		]
	},
	nmgw: {
		name: "Magnataur Warrior",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmi", "Spell Immunity"]
		]
	},
	nmgr: {
		name: "Magnataur Reaver",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmi", "Spell Immunity"],
			["accb", "Frost Bolt"]
		]
	},
	nmgd: {
		name: "Magnataur Destroyer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmi", "Spell Immunity"],
			["accb", "Frostbolt"],
			["actc", "Slam"]
		]
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
		name: "Mur’gul Cliffrunner",
		race: NEUTRAL,
		type: UNIT
	},
	nmbg: {
		name: "Mur’gul Blood-Gill",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["anh1", "Heal"]
		]
	},
	nmtw: {
		name: "Mur’gul Tidewarrior",
		race: NEUTRAL,
		type: UNIT
	},
	nmsn: {
		name: "Mur’gul Snarecaster",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acsw", "Slow"],
			["acdm", "Abolish Magic"]
		]
	},
	nmrv: {
		name: "Mur’gul Marauder",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acac", "Command Aura"]
		]
	},
	nmsc: {
		name: "Mur’gul Shadowcaster",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["achx", "Hex"],
			["accs", "Curse"]
		]
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
		commands: [
			["acen", "Ensnare"]
		]
	},
	nmpg: {
		name: "Murloc Plaguebearer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["aap3", "Disease Cloud"]
		]
	},
	nmfs: {
		name: "Murloc Flesheater",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["accn", "Cannibalize"]
		]
	},
	nmrm: {
		name: "Murloc Nightcrawler",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acvs", "Envenomed Weapons"],
			["ashm", "Shadowmeld"]
		]
	},
	nmmu: {
		name: "Murloc Mutant",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["accr", "Cripple"]
		]
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
		commands: [
			["acwb", "Web"],
			["acrd", "Raise Dead"]
		]
	},
	nnwr: {
		name: "Nerubian Seer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acrd", "Raise Dead"],
			["acdm", "Abolish Magic"]
		]
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
		commands: [
			["acua", "Unholy Aura"],
			["acca", "Carrion Swarm"],
			["acrd", "Raise Dead"]
		]
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
		commands: [
			["acbb", "Bloodlust"]
		]
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
		commands: [
			["acav", "Devotion Aura"],
			["acsh", "Shockwave"]
		]
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
		commands: [
			["acbh", "Bash"],
			["awrs", "War Stomp"]
		]
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
		commands: [
			["acf2", "Frost Armor"],
			["acdm", "Abolish Magic"]
		]
	},
	nfpt: {
		name: "Polar Furbolg Tracker",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acsw", "Slow"]
		]
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
		commands: [
			["achv", "Healing Wave"],
			["acfn", "Frost Nova"]
		]
	},
	nfpu: {
		name: "Polar Furbolg Ursa Warrior",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["awrs", "War Stomp"],
			["acac", "Command Aura"]
		]
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
		commands: [
			["acev", "Evasion"]
		]
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
		commands: [
			["achw", "Healing Ward"],
			["acs9", "Feral Spirit"]
		]
	},
	nrzg: {
		name: "Razormane Chieftain",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acah", "Thorns Aura"],
			["actb", "Hurl Boulder"]
		]
	},
	nrvf: {
		name: "Fire Revenant",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acim", "Immolation"]
		]
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
		commands: [
			["acbz", "Blizzard"]
		]
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
		commands: [
			["acpu", "Purge"],
			["accl", "Chain Lightning"]
		]
	},
	nrvi: {
		name: "Ice Revenant",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acvp", "Vampiric Aura"],
			["acfn", "Frost Nova"]
		]
	},
	ndrv: {
		name: "Revenant of the Depths",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acwe", "Summon Sea Elemental"]
		]
	},
	nrvd: {
		name: "Death Revenant",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acrd", "Raise Dead"],
			["acdc", "Death Coil"],
			["acad", "Animate Dead"]
		]
	},
	nlrv: {
		name: "Deeplord Revenant",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["accv", "Crushing Wave"],
			["acf2", "Frost Armor"]
		]
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
		commands: [
			["acim", "Immolation"],
			["acfb", "Firebolt"]
		]
	},
	nslv: {
		name: "Salamander Vizier",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acbl", "Bloodlust"],
			["ambd", "Mana Burn"],
			["acdm", "Abolish Magic"]
		]
	},
	nsll: {
		name: "Salamander Lord",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acim", "Immolation"],
			["acrf", "Rain of Fire"],
			["acdv", "Devour"]
		]
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
		commands: [
			["acbh", "Bash"],
			["acfr", "Force of Nature"]
		]
	},
	nsqo: {
		name: "Sasquatch Oracle",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acrj", "Rejuvenation"],
			["acro", "Roar"]
		]
	},
	nsqa: {
		name: "Ancient Sasquatch",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["actc", "Slam"],
			["acfr", "Force of Nature"],
			["acrn", "Reincarnation"]
		]
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
		commands: [
			["acpu", "Purge"]
		]
	},
	nsts: {
		name: "Satyr Shadowdancer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["accs", "Curse"],
			["ashm", "Shadowmeld"]
		]
	},
	nstl: {
		name: "Satyr Soulstealer",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["ambd", "Mana Burn"],
			["acrd", "Raise Dead"]
		]
	},
	nsth: {
		name: "Satyr Hellcaller",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acbl", "Bloodlust"],
			["acua", "Unholy Aura"],
			["acad", "Animate Dead"]
		]
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
		commands: [
			["acdc", "Death Coil"]
		]
	},
	nslm: {
		name: "Sludge Minion",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acsw", "Slow"]
		]
	},
	nslf: {
		name: "Sludge Flinger",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acsw", "Slow"]
		]
	},
	nsln: {
		name: "Sludge Monstrosity",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acsw", "Slow"]
		]
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
		commands: [
			["acpu", "Purge"]
		]
	},
	nsrn: {
		name: "Stormreaver Necrolyte",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acbl", "Bloodlust"],
			["accl", "Chain Lightning"]
		]
	},
	nsrw: {
		name: "Stormreaver Warlock",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acmo", "Monsoon"],
			["acad", "Animate Dead"]
		]
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
		commands: [
			["acsi", "Silence"]
		]
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
		commands: [
			["acdr", "Life Drain"],
			["acss", "Shadow Strike"]
		]
	},
	ndqs: {
		name: "Queen of Suffering",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acdc", "Death Coil"],
			["acua", "Unholy Aura"],
			["acch", "Charm"]
		]
	},
	ntrh: {
		name: "Sea Turtle Hatchling",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["anth", "Spiked Shell"]
		]
	},
	ntrs: {
		name: "Sea Turtle",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["anth", "Spiked Shell"]
		]
	},
	ntrt: {
		name: "Giant Sea Turtle",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["anth", "Spiked Shell"]
		]
	},
	ntrg: {
		name: "Gargantuan Sea Turtle",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["anth", "Spiked Shell"]
		]
	},
	ntrd: {
		name: "Dragon Turtle",
		suffix: "Creep",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acc2", "Crushing Wave"],
			["acdv", "Devour"],
			["ant2", "Spiked Shell"]
		]
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
		commands: [
			["acdm", "Abolish Magic"],
			["anh1", "Heal"]
		]
	},
	ntkt: {
		name: "Tuskarr Trapper",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acen", "Ensnare"]
		]
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
		commands: [
			["acif", "Inner Fire"]
		]
	},
	ntkc: {
		name: "Tuskarr Chieftain",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acac", "Command Aura"]
		]
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
		commands: [
			["acen", "Ensnare"]
		]
	},
	nubw: {
		name: "Unbroken Darkweaver",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acuf", "Unholy Frenzy"]
		]
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
		commands: [
			["accw", "Cold Arrows"]
		]
	},
	nvdg: {
		name: "Greater Voidwalker",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acf2", "Frost Armor"],
			["accl", "Chain Lightning"]
		]
	},
	nvde: {
		name: "Elder Voidwalker",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acfl", "Forked Lightning"],
			["acde", "Devour Magic"]
		]
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
		commands: [
			["acbh", "Bash"]
		]
	},
	nwns: {
		name: "Wendigo Shaman",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acrj", "Rejuvenation"],
			["acro", "Roar"]
		]
	},
	nwna: {
		name: "Ancient Wendigo",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["awrs", "War Stomp"],
			["acbh", "Bash"],
			["acrn", "Reincarnation"]
		]
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
		commands: [
			["acct", "Critical Strike"]
		]
	},
	nwlg: {
		name: "Giant Wolf",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acct", "Critical Strike"]
		]
	},
	nwwd: {
		name: "Dire Frost Wolf",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acct", "Critical Strike"],
			["acro", "Roar"]
		]
	},
	nwld: {
		name: "Dire Wolf",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acct", "Critical Strike"],
			["acro", "Roar"]
		]
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
		commands: [
			["acsa", "Searing Arrows"]
		]
	},
	nskm: {
		name: "Skeletal Marksman",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["accw", "Cold Arrows"]
		]
	},
	nbal: {
		name: "Doom Guard",
		suffix: "Creep",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["accr", "Cripple"],
			["adsm", "Dispel Magic"],
			["awrs", "War Stomp"],
			["acrf", "Rain of Fire"],
			["acsk", "Resistant Skin"]
		]
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
		commands: [
			["actc", "Slam"]
		]
	},
	nfgl: {
		name: "Flesh Golem",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acsh", "Shockwave"],
			["accr", "Cripple"]
		]
	},
	nogn: {
		name: "Stonemaul Magi",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acro", "Roar"]
		]
	},
	nogo: {
		name: "Stonemaul Ogre",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["acen", "Ensnare"]
		]
	},
	noga: {
		name: "Stonemaul Warchief",
		race: NEUTRAL,
		type: UNIT,
		commands: [
			["scae", "Endurance Aura"],
			["anta", "Taunt"],
			["acbh", "Bash"]
		]
	},
	nsw1: {
		name: "Lesser Spirit Beast",
		suffix: "Level 1",
		race: NEUTRAL,
		type: SUMMON
	},
	nsw2: {
		name: "Spirit Beast",
		suffix: "Level 2",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["afbb", "Feedback"]
		]
	},
	nsw3: {
		name: "Greater Spirit Beast",
		suffix: "Level 3",
		race: NEUTRAL,
		type: SUMMON,
		commands: [
			["afbb", "Feedback"],
			["ambb", "Mana Burn"]
		]
	},
	nspp: {
		name: "Spirit Pig",
		race: NEUTRAL,
		type: SUMMON
	}
};

data.icons = {
	classic: {
		extension: ".png",
		commands: {
			cmdattack: "btnattack",
			cmdattackground: "btnattackground",
			cmdbuildhuman: "btnhumanbuild",
			cmdbuildnaga: "btnbasicstruct",
			cmdbuildnightelf: "btnnightelfbuild",
			cmdbuildorc: "btnbasicstruct",
			cmdbuildundead: "btnscourgebuild",
			cmdcancel: "btncancel",
			cmdcancelbuild: "btncancel",
			cmdholdpos: "btnholdposition",
			cmdmove: "btnmove",
			cmdpatrol: "btnpatrol",
			cmdrally: "btnrallypoint",
			cmdselectskill: "btnskillz",
			cmdstop: "btnstop",
			a000: "btnspiritwalker",
			a009: "btnchestofgold",
			aabs: "btnabsorbmagic",
			aadm: "btndryaddispelmagicoff",
			aaha: "btngathergold",
			aakb: "pasbtndrum",
			aam2: "btnantimagicshell",
			aamk: "pasbtnstatup",
			aams: "btnantimagicshell",
			aap1: "pasbtnplaguecloud",
			aap3: "pasbtnplaguecloud",
			aast: "btnancestralspirit",
			aave: "btndestroyer",
			ablo: "btnbloodlustoff",
			abof: "pasbtnfirerocks",
			abrf: "btnbearform",
			absk: "btnberserkfortrolls",
			abtl: "btnbattlestations",
			abu2: "btncryptfiendburrow",
			abu3: "btncryptfiendburrow",
			abu5: "btncryptfiendburrow",
			abur: "btncryptfiendburrow",
			acac: "pasbtngnollcommandaura",
			acad: "btnanimatedead",
			acah: "pasbtnthorns",
			acam: "btnantimagicshell",
			acan: "btncannibalize",
			acat: "pasbtntrueshot",
			acav: "pasbtndevotion",
			acba: "pasbtnbrilliance",
			acbb: "btnbloodlustoff",
			acbc: "btnbreathoffire",
			acbf: "btnbreathoffrost",
			acbh: "pasbtnbash",
			acbk: "btntheblackarrowoff",
			acbl: "btnbloodlustoff",
			acbz: "btnblizzard",
			acc2: "btncrushingwave",
			acc3: "btncrushingwave",
			acca: "btncarrionswarm",
			accb: "btnfrostbolt",
			acce: "pasbtncleavingattack",
			acch: "btncharm",
			accl: "btnchainlightning",
			accn: "btncannibalize",
			accr: "btncripple",
			accs: "btncurseoff",
			acct: "pasbtncriticalstrike",
			accv: "btncrushingwave",
			accw: "btncoldarrowsoff",
			accy: "btncyclone",
			acd2: "btndryaddispelmagicoff",
			acdb: "pasbtndrunkendodge",
			acdc: "btndeathcoil",
			acde: "btndevourmagic",
			acdh: "btnstrongdrink",
			acdm: "btndryaddispelmagicoff",
			acdr: "btnlifedrain",
			acds: "btndivineintervention",
			acdv: "btnreddragondevour",
			acef: "btnstormearthfire",
			acen: "btnensnare",
			acev: "pasbtnevasion",
			acf2: "btnfrostarmoroff",
			acf3: "btncorpseexplode",
			acfb: "btnfirebolt",
			acfd: "btncorpseexplode",
			acff: "btnfaeriefireoff",
			acfl: "btnmonsoon",
			acfn: "btnglacier",
			acfr: "btnent",
			acfu: "btnfrostarmoroff",
			ache: "btnwandofneutralization",
			acht: "btnhowlofterror",
			achv: "btnhealingwave",
			achw: "btnhealingward",
			achx: "btnhex",
			acif: "btninnerfireoff",
			acim: "btnimmolationon",
			aclf: "btncloudoffog",
			acls: "btnlightningshield",
			acm2: "pasbtngenericspellimmunity",
			acmf: "btnneutralmanashield",
			acmg: "btncontrolmagic",
			acmi: "pasbtngenericspellimmunity",
			acmo: "btnmonsoon",
			acn2: "btncannibalize",
			acny: "btncyclone",
			aco2: "btnhippogriffrider",
			aco3: "btnhippogriffrider",
			acoa: "btnhippogriffrider",
			acoh: "btnarcher",
			acor: "pasbtncorrosivebreath",
			acpa: "btnparasiteoff",
			acpf: "btnspiritwalker",
			acps: "btnpossession",
			acpu: "btnpurge",
			acpv: "pasbtnseagiantpulverize",
			acpy: "btnpolymorph",
			acr2: "btnrejuvenation",
			acrd: "btnraisedeadoff",
			acrf: "btnfire",
			acri: "btncripple",
			acrj: "btnrejuvenation",
			acrk: "pasbtnthickfur",
			acrn: "pasbtnreincarnation",
			acro: "btnbattleroar",
			acrs: "btncurseoff",
			acs7: "btnspiritwolf",
			acs9: "btnrazorback",
			acsa: "btnsearingarrowsoff",
			acsh: "btnshockwave",
			acsi: "btnsilence",
			acsk: "pasbtnthickfur",
			acsl: "btnsleep",
			acss: "btnshadowstrike",
			acsw: "btnslowoff",
			act2: "btngolemthunderclap",
			actb: "btngolemstormbolt",
			actc: "btngolemthunderclap",
			acua: "pasbtnunholyaura",
			acuf: "btnunholyfrenzy",
			acvp: "pasbtnvampiricaura",
			acvs: "pasbtnenvenomedspear",
			acwb: "btnweboff",
			acwe: "btnseaelemental",
			acyc: "btncyclone",
			adcn: "btndisenchant",
			adec: "btnarcher",
			adef: "btndefend",
			adev: "btndevour",
			adis: "btndispelmagic",
			adri: "btnunload",
			adro: "btnunload",
			adsm: "btndispelmagic",
			adtg: "pasbtnscout",
			adtn: "btnwispsplode",
			adts: "pasbtnmagicalsentry",
			advm: "btndevourmagic",
			aeah: "pasbtnthorns",
			aear: "pasbtntrueshot",
			aeat: "btneattree",
			aebl: "btnblink",
			aebu: "btnnightelfbuild",
			aeer: "btnentanglingroots",
			aeev: "pasbtnevasion",
			aefk: "btnfanofknives",
			aefn: "btnent",
			aegr: "pasbtnelunesblessing",
			aeib: "pasbtnimprovedbows",
			aeim: "btnimmolationon",
			aell: "btnmetamorphosis",
			aemb: "btnmanaburn",
			aeme: "btnmetamorphosis",
			aemk: "pasbtnmarksmanship",
			aenc: "btnload",
			aenr: "btnentanglingroots",
			aens: "btnensnare",
			aent: "btngoldmine",
			aenw: "btnentanglingroots",
			aesf: "btnstarfall",
			aesh: "btnshadowstrike",
			aesn: "btnsentinel",
			aesr: "btnsentinel",
			aest: "btnscout",
			aesv: "btnspiritofvengeance",
			aetf: "btnspiritwalker",
			aetq: "btntranquility",
			aevi: "btnmetamorphosis",
			aews: "pasbtnwellspring",
			aexh: "pasbtnexhumecorpses",
			aeye: "btnsentryward",
			afa2: "btnfaeriefireoff",
			afae: "btnfaeriefireoff",
			afak: "btnorbofdeathoff",
			afbb: "pasbtnfeedback",
			afbk: "pasbtnfeedback",
			afbt: "pasbtnfeedback",
			afla: "btnflare",
			aflk: "pasbtnflakcannons",
			afr2: "pasbtnfrost",
			afra: "pasbtnfrost",
			afrc: "pasbtnfrost",
			afrz: "pasbtnfreezingbreath",
			afsh: "pasbtnfragmentationbombs",
			afzy: "btnbloodlustoff",
			agbu: "btnbasicstruct",
			agra: "btngrabtree",
			agyb: "pasbtnhumanartilleryupone",
			agyv: "pasbtnflyingmachinetruesight",
			ahab: "pasbtnbrilliance",
			ahad: "pasbtndevotion",
			ahan: "pasbtnanimalwartraining",
			ahar: "btngathergold",
			ahav: "btnavatar",
			ahbh: "pasbtnbash",
			ahbn: "btnbanish",
			ahbu: "btnhumanbuild",
			ahbz: "btnblizzard",
			ahca: "btncoldarrowsoff",
			ahdr: "btnmanadrain",
			ahds: "btndivineintervention",
			ahea: "btnhealoff",
			ahfa: "btnsearingarrowsoff",
			ahfs: "btnwalloffire",
			ahhb: "btnholybolt",
			ahid: "btnambush",
			ahlh: "pasbtnhumanlumberupgrade1",
			ahmt: "btnmassteleport",
			ahpe: "pasbtnmarkoffire",
			ahpx: "btnmarkoffire",
			ahr3: "btngathergold",
			ahre: "btnresurrection",
			ahri: "pasbtndwarvenlongrifle",
			ahrl: "btngathergold",
			ahrp: "btnrepairoff",
			ahsb: "pasbtnsunderingblades",
			ahta: "btnreveal",
			ahtb: "btnstormbolt",
			ahtc: "btnthunderclap",
			ahwd: "btnhealingward",
			ahwe: "btnsummonwaterelemental",
			aihm: "btncloak",
			aimp: "pasbtnvorpalblades",
			ainf: "btninnerfireoff",
			aivs: "btninvisibility",
			alam: "btnsacrifice",
			aliq: "pasbtnliquidfire",
			aloa: "btnload",
			alsh: "btnlightningshield",
			ambb: "btnmanaburn",
			ambd: "btnmanaburn",
			ambt: "btnmanarechargeoff",
			amed: "btnundeadunload",
			amel: "btnundeadloadoff",
			amfl: "btnmanaflare",
			amgl: "pasbtnupgrademoonglaive",
			amgr: "pasbtnupgrademoonglaive",
			amic_: "btnbacktowork",
			amic: "btncalltoarms",
			amil_: "btnbacktowork",
			amil: "btncalltoarms",
			amim: "pasbtnmagicimmunity",
			amls: "btnmagiclariet",
			amrf: "btnravenform",
			anab: "btnacidbomb",
			anav: "btnavatar",
			anb2: "pasbtnbash",
			anba: "btntheblackarrowoff",
			anbf: "btnbreathoffire",
			anbh: "pasbtnbash",
			anbl: "btnbearblink",
			anc1: "btnclusterrockets",
			anc2: "btnclusterrockets",
			anc3: "btnclusterrockets",
			anca: "pasbtncleavingattack",
			ancf: "btnbreathoffire",
			anch: "btncharm",
			ancr: "btnchemicalrage",
			ancs: "btnclusterrockets",
			and1: "pasbtndemolish",
			and2: "pasbtndemolish",
			and3: "pasbtndemolish",
			andb: "pasbtndrunkendodge",
			andc: "btnsleep",
			ande: "pasbtndemolish",
			andh: "btnstrongdrink",
			andm: "btndryaddispelmagicoff",
			ando: "btndoom",
			andp: "btndizzy",
			andr: "btnlifedrain",
			andt: "btnreveal",
			ane2: "btnselectunit",
			anef: "btnstormearthfire",
			aneg: "pasbtnengineeringupgrade",
			anei: "btnselectunit",
			anen: "btnensnare",
			anfa: "btncoldarrowsoff",
			anfb: "btnfirebolt",
			anfd: "btncorpseexplode",
			anfl: "btnmonsoon",
			ang1: "btnrobogoblin",
			ang2: "btnrobogoblin",
			ang3: "btnrobogoblin",
			anh1: "btnhealoff",
			anh2: "btnhealoff",
			anha: "btngathergold",
			anhs: "btnhealingspray",
			anht: "btnhowlofterror",
			anhw: "btnhealingwave",
			anhx: "btnhex",
			ania: "btnincinerateoff",
			anin: "btninfernal",
			anlm: "btnlavaspawn",
			anms: "btnneutralmanashield",
			anpa: "btnparasiteoff",
			anpi: "pasbtnimmolation",
			anr2: "pasbtnreincarnation",
			anr3: "btninfernalstone",
			anrc: "btninfernalstone",
			anrf: "btnfire",
			anrg: "btnrobogoblin",
			anrn: "pasbtnreincarnation",
			ans1: "btnpocketfactory",
			ans2: "btnpocketfactory",
			ans3: "btnpocketfactory",
			ansb: "btnstormbolt",
			ansg: "btngrizzlybear",
			ansh: "btnshockwave",
			ansi: "btnsilence",
			ansk: "pasbtnhardenedskin",
			ansl: "btnsleep",
			anso: "btnsoulburn",
			ansq: "btnquillbeast",
			anst: "btnstampede",
			answ: "btnwareagle",
			ansy: "btnpocketfactory",
			ant2: "pasbtnthornshield",
			anta: "btnpandataunt",
			anth: "pasbtnthornshield",
			antm: "btntransmute",
			anto: "btntornado",
			antr: "pasbtnscout",
			anvc: "btnvolcano",
			anwk: "btnwindwalkon",
			aoae: "pasbtncommand",
			aobk: "pasbtnheadhunterberserker",
			aobs: "pasbtnberserk",
			aobu: "btnbasicstruct",
			aocl: "btnchainlightning",
			aocr: "pasbtncriticalstrike",
			aoeq: "btnearthquake",
			aofs: "btnfarsight",
			aohw: "btnhealingwave",
			aohx: "btnhex",
			aols: "btnlocustswarm",
			aomi: "btnmirrorimage",
			aor2: "pasbtncommand",
			aor3: "pasbtnreincarnation",
			aorb: "pasbtnreinforcedburrows",
			aore: "pasbtnreincarnation",
			aos2: "btnshockwave",
			aosf: "btnspiritwolf",
			aosh: "btnshockwave",
			aosp: "pasbtnspikedbarricades",
			aosw: "btnserpentward",
			aotr: "pasbtnregenerate",
			aovd: "btnbigbadvoodoospell",
			aow2: "btnwarstomp",
			aowk: "btnwindwalkon",
			aows: "btnwarstomp",
			aoww: "btnwhirlwind",
			apg2: "btnpurge",
			aply: "btnpolymorph",
			apos: "btnpossession",
			aprg: "btnpurge",
			aps2: "btnpossession",
			apsh: "btnphaseshiftoff",
			apts: "pasbtnplaguecloud",
			ara2: "btnbattleroar",
			arai: "btnraisedeadoff",
			arav: "btnravenform",
			arej: "btnrejuvenation",
			aren: "btnwisphealoff",
			arep: "btnrepairoff",
			aro1: "btnuproot",
			aro2: "btnuproot",
			aroa: "btnbattleroar",
			aroc: "pasbtnscatterrockets",
			aroo: "btnuproot",
			arpl: "btnreplenishhealthoff",
			arpm: "btnreplenishmanaoff",
			arsc: "btnbansheeadept",
			arsg: "btngrizzlybear",
			arsk: "pasbtnresistantskin",
			arsp: "btnstampede",
			arsq: "btnquillbeast",
			arst: "btnrepairoff",
			arsw: "btnserpentward",
			asac: "btnsacrifice",
			asal: "pasbtnpillage",
			asb1: "btnnagaburrow",
			asb2: "btnnagaburrow",
			asb3: "btnnagaburrow",
			asd2: "btnselfdestructoff",
			asd3: "btnselfdestructoff",
			asdg: "btnselfdestructoff",
			asds: "btnselfdestructoff",
			ashm: "btnambush",
			aslo: "btnslowoff",
			aslp: "btnlobstrokkred",
			aspl: "btnspiritlink",
			aspo: "pasbtnslowpoison",
			asps: "btnspellstealoff",
			assk: "pasbtnhardenedskin",
			asta: "btnstasistrap",
			astd: "btnbacktowork",
			asth: "pasbtnstormhammer",
			astn: "btnstoneform",
			atau: "btntaunt",
			atru: "pasbtnshadetruesight",
			auan: "btnanimatedead",
			auau: "pasbtnunholyaura",
			auav: "pasbtnvampiricaura",
			aubu: "btnscourgebuild",
			aucb: "btncarrionscarabsoff",
			auco: "btnunstableconcoction",
			aucs: "btncarrionswarm",
			audc: "btndeathcoil",
			audd: "btndeathanddecay",
			audp: "btndeathpact",
			audr: "btndarkritual",
			aufn: "btnglacier",
			aufu: "btnfrostarmoroff",
			augf: "pasbtnghoulfrenzy",
			augh: "pasbtnshade",
			auhf: "btnunholyfrenzy",
			auim: "btnimpale",
			auin: "btninfernal",
			auls: "btnlocustswarm",
			auns: "btnunsummonbuilding",
			ausl: "btnsleep",
			ausm: "pasbtnskeletonmage",
			auts: "pasbtnthornshield",
			auuf: "btnunholyfrenzy",
			aven: "pasbtnenvenomedspear",
			avng: "btnavengingwatcheroff",
			awar: "pasbtnsmash",
			aweb: "btnweboff",
			awfb: "btnfirebolt",
			awha: "btngathergold",
			awrg: "btnseagiantwarstomp",
			awrh: "btnhydrawarstomp",
			awrs: "btnwarstomp",
			belv: "btnboots",
			bspd: "btnbootsofspeed",
			ckng: "btnhelmutpurple",
			clsd: "btncloak",
			cnob: "btncirclet",
			dust: "btndustofappearance",
			eaoe: "btnancientoflore",
			eaom: "btnancientoftheearth",
			eaow_campaign: "btnancientofthemoon",
			eaow: "btnancientofthemoon",
			earc: "btnarcher",
			eate_campaign: "btnaltarofelders",
			eate: "btnaltarofelders",
			ebal: "btnglaivethrower",
			ebsh: "btnnightelfbattlecruiser",
			ecen: "btnkeeperofthegrove",
			echm: "btnchimaera",
			edcm: "btnbearform",
			edem: "btnherodemonhunter",
			eden: "btnancientofwonders",
			edes: "btnnightelfdestroyer",
			edob: "btnhuntershall",
			edoc: "btndruidoftheclaw",
			edos: "btnchimaeraroost",
			edot: "btndruidofthetalon",
			edry: "btndryad",
			edtm: "btnravenform",
			eevi: "btnevilillidan",
			efdr: "btnfaeriedragon",
			efon: "btnent",
			efur: "btnfurion",
			egol: "btngoldmine",
			ehip: "btnhippogriff",
			ehpr: "btnhippogriffrider",
			eill: "btnherodemonhunter",
			ekee: "btnkeeperofthegrove",
			emfr: "btnfurion",
			emns: "btnfurion",
			emoo: "btnpriestessofthemoon",
			emow: "btnmoonwell",
			emtg: "btnmountaingiant",
			enec: "btnnightelfrunner",
			ensh: "btnhuntress",
			esen: "btnhuntress",
			eshd: "btnshandris",
			eshy: "btnnightelfshipyard",
			espv: "btnspiritofvengeance",
			etoa: "btntreeofages",
			etoe: "btntreeofeternity",
			etol: "btntreeoflife",
			etrp: "btntreant",
			etrs: "btnnightelftransport",
			etyr_instant: "btnpriestessofthemoon",
			etyr: "btnpriestessofthemoon",
			even: "btnavengingwatcher",
			evtl: "btntalisman",
			ewar: "btnherowarden",
			ewrd: "btnwarden2",
			ewsp: "btnwisp",
			gemt: "btngem",
			halt_campaign: "btnaltarofkings",
			halt: "btnaltarofkings",
			hamg: "btnheroarchmage",
			hant: "btnheroarchmage",
			hapm: "btnproudmoore",
			harf: "btnarthas",
			harm_barrage: "btnworkshop",
			harm: "btnworkshop",
			hars: "btnarcanesanctum",
			hart: "btnarthas",
			hatw: "btnhumanarcanetower",
			hbar_campaign: "btnhumanbarracks",
			hbar: "btnhumanbarracks",
			hbla: "btnblacksmith",
			hblm: "btnherobloodelfprince",
			hbot: "btnhumantransport",
			hbsh: "btnhumanbattleship",
			hc00: "btnelfvillager",
			hcas: "btncastle",
			hcth: "btnthecaptain",
			hctw: "btncannontower",
			hcun: "btnhoodofcunning",
			hdes: "btnhumandestroyer",
			hdgo: "btnheropaladin",
			hdhw: "btndragonhawk",
			hfoo: "btnfootman",
			hgra: "btngryphonaviary",
			hgry: "btngryphonrider",
			hgtw: "btnguardtower",
			hgyr: "btnflyingmachine",
			hhes: "btnthecaptain",
			hhkl: "btnheropaladin",
			hhou: "btnfarm",
			hjai: "btnjaina",
			hkal: "btnbloodmage2",
			hkee: "btnkeep",
			hkni: "btnknight",
			hlgr: "btngarithos",
			hlst: "btnhealthstone",
			hlum: "btnhumanlumbermill",
			hmbr: "btnheromountainking",
			hmgd: "btnheropaladin",
			hmil: "btnmilitia",
			hmkg: "btnheromountainking",
			hmpr: "btnpriest",
			hmtm: "btnmortarteam",
			hmtt: "btnseigeengine",
			hpal: "btnheropaladin",
			hpb1: "btnheropaladin",
			hpb2: "btnheropaladin",
			hpea: "btnpeasant",
			hphx: "btnmarkoffire",
			hrif: "btnrifleman",
			hrtt: "btnseigeenginewithmissles",
			hshy: "btnhumanshipyard",
			hslv: "btnhealingsalve",
			hsor: "btnsorceress",
			hspt: "btnspellbreaker",
			htow_campaign: "btntownhall",
			htow: "btntownhall",
			huth: "btnheropaladin",
			hvlt: "btnarcanevault",
			hvsh: "btnnagaseawitch",
			hvwd: "btnsylvanuswindrunner",
			hwat: "btnsummonwaterelemental",
			hwt2: "btnsummonwaterelemental",
			hwt3: "btnsummonwaterelemental",
			hwtw: "btnhumanwatchtower",
			mcri: "btnmechanicalcritter",
			mlst: "btnhammer",
			mnsf: "btnbrilliance",
			mnst: "btnmanastone",
			moon: "btnmoonstone",
			n000: "btnbarracks",
			n002: "btnbarracks",
			n003: "btnblackmarket",
			n004: "btnmerchant",
			n005: "btnblackmarket",
			nadk: "btnazuredragon",
			nadr: "btnazuredragon",
			nadw: "btnazuredragon",
			nahy: "btngreenhydra",
			naka: "btndranaiakama",
			nalc: "btnheroalchemist",
			nanb: "btnarachnathid",
			nanc: "btnarachnathidgreen",
			nane: "btnarachnathid",
			nanm: "btnarachnathid",
			nano: "btnarachnathidpurple",
			nanw: "btnarachnathidgreen",
			narg: "btnarmorgolem",
			nass: "btnbanditspearthrower",
			nba2: "btndoomguard",
			nbal: "btndoomguard",
			nban: "btnbandit",
			nbda: "btngreendragonspawn",
			nbdk: "btnblackdragon",
			nbdm: "btnbluedragonspawn",
			nbdo: "btnpurpledragonspawn",
			nbdr: "btnblackdragon",
			nbds: "btngreendragonspawn",
			nbdw: "btnbluedragonspawn",
			nbee: "btnbloodelfpeasant",
			nbel: "btnthecaptain",
			nbld: "btnbanditlord",
			nbot: "btntransport",
			nbrg: "btnbanditspearthrower",
			nbrn: "btnbansheeranger",
			nbst: "btnbeastmaster",
			nbt1: "btnrocktower",
			nbt2: "btnadvancedrocktower",
			nbwm: "btnblackdragon",
			nbzd: "btnbronzedragon",
			nbzk: "btnbronzedragon",
			nbzw: "btnbronzedragon",
			ncat: "btndemolisher",
			ncea: "btncentaurarcher",
			ncen: "btncentaur",
			ncer: "btncentaur",
			ncfs: "btnmurgultidewarrior",
			ncg1: "btnclockwerkgoblin",
			ncg2: "btnclockwerkgoblin",
			ncgb: "btnclockwerkgoblin",
			nchg: "btnchaosgrunt",
			nchp: "btnbanditmage",
			nchr: "btnchaoswolfrider",
			nchw: "btnchaoswarlock",
			ncim: "btncentaurarcher",
			nckb: "btnchaoskodobeast",
			ncks: "btncentaurkhan",
			ncnk: "btncentaurkhan",
			ncpn: "btnchaospeon",
			ndh2: "btndranaichiefhut",
			ndh3: "btndranaihut",
			ndh4: "btndranaihut",
			ndmu: "btndalaranmutant",
			ndqn: "btndemoness",
			ndqp: "btnbluedemoness",
			ndqs: "btnbluedemoness",
			ndqt: "btndemoness",
			ndqv: "btnbluedemoness",
			ndr1: "btnskeletonwarrior",
			ndr2: "btnskeletonwarrior",
			ndr3: "btnskeletonwarrior",
			ndrd: "btndranai",
			ndrd2: "btndranai",
			ndrf: "btndranai",
			ndrg: "btngreendragonroost",
			ndrh: "btndranaimage",
			ndrj: "btndalaranreject",
			ndrk: "btnblackdragonroost",
			ndrl: "btndranai",
			ndrm: "btndranaimage",
			ndrn: "btndranai",
			ndro: "btnblackdragonroost",
			ndrp: "btndranai",
			ndrr: "btndragonroost",
			ndrs: "btndranaimage",
			ndrs2: "btndranaimage",
			ndrt: "btndranai",
			ndru: "btnbluedragonroost",
			ndrv: "btnrevenant",
			ndrw: "btndranai",
			ndrz: "btndragonroost",
			ndsa: "btnthunderlizardvizier",
			ndt1: "btncoldtower",
			ndt2: "btnadvancedfrosttower",
			ndtb: "btndarktroll",
			ndth: "btndarktrollshadowpriest",
			ndtp: "btndarktrollshadowpriest",
			ndtr: "btndarktroll",
			ndtt: "btndarktrolltrapper",
			ndtw: "btndarktrolltrapper",
			negf: "btnelvenguardtower",
			negm: "btnelvenguardtower",
			negt: "btnelvenguardtower",
			negz: "btngoblinsapper",
			nehy: "btngreenhydra",
			nelb: "btnsummonwaterelemental",
			nele: "btnsummonwaterelemental",
			nemi: "btnbanditmage",
			nenc: "btncorruptedent",
			nenf: "btnbandit",
			nenp: "btncorruptedent",
			nepl: "btncorruptedent",
			nerd: "btneredarwarlockpurple",
			ners: "btneredarwarlockpurple",
			nerw: "btneredarwarlockpurple",
			net1: "btnenergytower",
			net2: "btnadvancedenergytower",
			nfa1: "btnpocketfactory",
			nfa2: "btnpocketfactory",
			nfac: "btnpocketfactory",
			nfel: "btnfelhound",
			nfgb: "btnfelguard",
			nfgl: "btnfleshgolem",
			nfgu: "btnfelguard",
			nfir: "btnheroavatarofflame",
			nfod: "btnfacelessone",
			nfor: "btnfacelessone",
			nfot: "btnfacelessone",
			nfov: "btnfelguardblue",
			nfpc: "btnpolarfurbolg",
			nfpe: "btnpolarfurbolgshaman",
			nfpl: "btnpolarfurbolg",
			nfps: "btnpolarfurbolgshaman",
			nfpt: "btnpolarfurbolgelder",
			nfpu: "btnpolarfurbolgtracker",
			nfra: "btnfurbolgelder",
			nfrb: "btnfurbolgtracker",
			nfre: "btnfurbolgshaman",
			nfrg: "btnfurbolg",
			nfrl: "btnfurbolg",
			nfrp: "btnfurbolgpanda",
			nfrs: "btnfurbolgshaman",
			nfsh: "btnforesttrollshadowpriest",
			nfsp: "btnforesttrollshadowpriest",
			nft1: "btnflametower",
			nft2: "btnadvancedflametower",
			nftb: "btnforesttroll",
			nftk: "btnforesttroll",
			nftr: "btnforesttroll",
			nftt: "btnforesttrolltrapper",
			ngad: "btnammodump",
			ngdk: "btngreendragon",
			nggr: "btnrockgolem",
			ngh1: "btnghost",
			ngh2: "btnghost",
			ngir: "btnjunkgolem",
			ngme_original: "btnmerchant",
			ngme: "btnmerchant",
			ngna: "btngnollarcher",
			ngnb: "btngnoll",
			ngno: "btngnoll",
			ngns: "btngnollarcher",
			ngnv: "btngnollking",
			ngnw: "btngnollwarden",
			ngrd: "btngreendragon",
			ngrk: "btnrockgolem",
			ngrw: "btngreendragon",
			ngsp: "btngoblinsapper",
			ngst: "btnrockgolem",
			ngz1: "btngrizzlybear",
			ngz2: "btngrizzlybear",
			ngz3: "btngrizzlybear",
			ngz4: "btngrizzlybear",
			ngza: "btngrizzlybear",
			ngzc: "btngrizzlybear",
			ngzd: "btngrizzlybear",
			nhar: "btnharpy",
			nhdc: "btnacolyte",
			nhea: "btnhighelvenarcher",
			nheb: "btnmagetower",
			nhew: "btnelfvillager",
			nhfp: "btnacolyte",
			nhhr: "btnacolyte",
			nhrh: "btnharpywitch",
			nhrq: "btnharpyqueen",
			nhrr: "btnharpy",
			nhrw: "btnharpywitch",
			nhyc: "btnseaturtlered",
			nhyd: "btngreenhydra",
			nhyh: "btngreenhydra",
			nhym: "btnbanditmage",
			nina: "btninfernalflamecannon",
			ninc: "btninfernalcannon",
			ninf: "btninfernal",
			ninm: "btninfernalcannon",
			nith: "btnicetrollshaman",
			nitp: "btnicetrollshadowpriest",
			nitr: "btnicetroll",
			nits: "btnicetrollberserker",
			nitt: "btnicetroll",
			nitw: "btnicetroll",
			njg1: "btnjunglebeast",
			njga: "btnjunglebeast",
			njgb: "btnjunglebeast",
			njks: "btnbandit",
			nkob: "btnkobold",
			nkog: "btnkoboldgeomancer",
			nkol: "btnkobold",
			nkot: "btnkobold",
			nlds: "btnlobstrokkgreen",
			nlkl: "btnlobstrokkblue",
			nlpd: "btnlobstrokkred",
			nlpr: "btnlobstrokkred",
			nlrv: "btndeeplordrevenant",
			nlsn: "btnlobstrokkred",
			nltc: "btnlobstrokkgreen",
			nltl: "btnthunderlizard",
			nlv1: "btnlavaspawn",
			nlv2: "btnlavaspawn",
			nlv3: "btnlavaspawn",
			nmag: "btnpitlord",
			nmam: "btnmammoth",
			nman: "btnmannoroth",
			nmbg: "btnmurgulbloodgill",
			nmcf: "btnmurgultidewarrior",
			nmdm: "btnmedivh",
			nmdr: "btnblackmammoth",
			nmed: "btnmedivh",
			nmer: "btnmercenarycamp",
			nmfs: "btnmurlocflesheater",
			nmgd: "btnbluemagnataur",
			nmgr: "btnmagnataurbrown",
			nmgw: "btnmagnataur",
			nmit: "btnmammoth",
			nmmu: "btnmurlocmutant",
			nmpe: "btnmurgalslave",
			nmpg: "btnmurlocmutant",
			nmr0: "btnmercenarycamp",
			nmr2: "btnmercenarycamp",
			nmr3: "btnmercenarycamp",
			nmr4: "btnmercenarycamp",
			nmr5: "btnmercenarycamp",
			nmr6: "btnmercenarycamp",
			nmr7: "btnmercenarycamp",
			nmr8: "btnmercenarycamp",
			nmra: "btnmercenarycamp",
			nmrc: "btnmercenarycamp",
			nmrd: "btnmercenarycamp",
			nmrf: "btnmercenarycamp",
			nmrk: "btnblackmarket",
			nmrl: "btnmurloc",
			nmrm: "btnmurlocnightcrawler",
			nmrr: "btnmurloc",
			nmrv: "btnmurgulbloodgill",
			nmsc: "btnmurgulshadowcaster",
			nmsn: "btnmurgulshadowcaster",
			nmtw: "btnmurgultidewarrior",
			nmyr: "btnnagamyrmidon",
			nnad: "btnaltarofdepths",
			nndk: "btnnetherdragon",
			nndr: "btnnetherdragon",
			nnfm: "btncoralbed",
			nngs: "btnnagaseawitch",
			nnht: "btnnetherdragon",
			nnmg: "btnmurgultidewarrior",
			nnrg: "btnnagamyrmidonroyalguard",
			nnsa: "btnshrineofaszhara",
			nnsg: "btnspawninggrounds",
			nnsw: "btnseawitch",
			nntg: "btntidalguardian",
			nntt: "btntempleoftides",
			nnwa: "btnnerubian",
			nnwl: "btnnerubianqueen",
			nnwq: "btnnerubianqueen",
			nnwr: "btnnerubianspiderlord",
			nnws: "btnnerubianspiderlord",
			noga: "btnarmoredogre",
			nogl: "btnogrelord",
			nogm: "btnogre",
			nogn: "btnoneheadedogre",
			nogo: "btnoneheadedogre",
			nogr: "btnarmoredogre",
			nomg: "btnogremagi",
			now2: "btnscout",
			now3: "btnscout",
			nowb: "btnowlbear",
			nowe: "btnowlbear",
			nowk: "btnowlbear",
			nowl: "btnscout",
			npbm: "btnpandarenbrewmaster",
			npfl: "btnpurplefelhound",
			npfm: "btnpurplefelhound",
			nplb: "btnfrostbear",
			npld: "btnpitlord",
			nplg: "btnfrostbear",
			nplh: "btnpitlord",
			npn1: "btnfirebrewmaster",
			npn2: "btnstormbrewmaster",
			npn3: "btnearthbrewmaster",
			nqb1: "btnquillbeast",
			nqb2: "btnquillbeast",
			nqb3: "btnquillbeast",
			nqbh: "btnrazorback",
			nrdk: "btnreddragon",
			nrdr: "btnreddragon",
			nrel: "btnseaelemental",
			nrob: "btnherotinker",
			nrog: "btnbandit",
			nrvd: "btnrevenant",
			nrvf: "btnrevenant",
			nrvi: "btnrevenant",
			nrvl: "btnrevenant",
			nrvs: "btnrevenant",
			nrwm: "btnreddragon",
			nrzb: "btnrazorback",
			nrzg: "btnrazormanechief",
			nrzm: "btnrazormanechief",
			nrzs: "btnrazorback",
			nrzt: "btnrazorback",
			nsat: "btnsatyrtrickster",
			nsbm: "btnspiderblue",
			nsc2: "btnspidercrab",
			nsc3: "btnspidercrab",
			nscb: "btnspidercrab",
			nsel: "btnseaelemental",
			nsgb: "btnseagiant",
			nsgg: "btnarmorgolem",
			nsgh: "btnseagiantgreen",
			nsgn: "btnseagiant",
			nsgt: "btnspider",
			nshp: "btngoblinshipyard",
			nsjs_wyvern: "btnpandarenbrewmaster",
			nsjs: "btnpandarenbrewmaster",
			nska: "btnskeletonarcher",
			nske: "btnskeletonwarrior",
			nskf: "btnskeletonarcher",
			nskg: "btnskeletonwarrior",
			nskm: "btnskeletonarcher",
			nsko: "btnskeletalorc",
			nslf: "btnsludgecreature",
			nslh: "btnthunderlizardsalamander",
			nsll: "btnthunderlizardsalamander",
			nslm: "btnsludgecreature",
			nsln: "btnsludgecreature",
			nslr: "btnthunderlizardsalamander",
			nslv: "btnthunderlizardvizier",
			nsnp: "btnsnapdragon",
			nsns: "btnmurgulshadowcaster",
			nsoc: "btnskeletalorcchampion",
			nsog: "btnskeletalorcgrunt",
			nspb: "btnspiderblack",
			nspd: "btnnerubian",
			nspg: "btnspidergreen",
			nspp: "btnrazorback",
			nspr: "btnspider",
			nsqa: "btnsasquatch",
			nsqe: "btnsasquatchshaman",
			nsqo: "btnsasquatch",
			nsqt: "btnsasquatch",
			nsra: "btnorcwarlock",
			nsrh: "btnorcwarlock",
			nsrn: "btnorcwarlock",
			nsrv: "btnrevenant",
			nsrw: "btnorcwarlock",
			nssn: "btnassassin",
			nssp: "btnspiderblue",
			nsth: "btnsatyr",
			nstl: "btnsatyr",
			nsts: "btnsatyrtrickster",
			nstw: "btnthunderlizard",
			nsty: "btnsatyr",
			nsw1: "btnfelhound",
			nsw2: "btnfelhound",
			nsw3: "btnfelhound",
			ntav: "btntavern",
			nthl: "btnthunderlizard",
			ntin: "btnherotinker",
			ntin1: "btnherotinker",
			ntin2: "btnherotinker",
			ntin3: "btnherotinker",
			ntka: "btntuskaargold",
			ntkc: "btntuskaarblack",
			ntkf: "btntuskaarbrown",
			ntkh: "btntuskaarbrown",
			ntks: "btntuskaarbrown",
			ntkt: "btntuskaargold",
			ntkw: "btntuskaarbrown",
			ntrd: "btnseaturtlered",
			ntrg: "btnseaturtlegreen",
			ntrh: "btnseaturtlegreen",
			ntrs: "btnseaturtlegreen",
			ntrt: "btnseaturtlegreen",
			ntrv: "btnrevenant",
			ntt1: "btndeathtower",
			ntws: "btnmurgultidewarrior",
			ntx2: "btnadvanceddeathtower",
			nubk: "btnunbroken",
			nubr: "btnunbroken",
			nubw: "btnunbroken",
			nvde: "btnvoidwalker",
			nvdg: "btnvoidwalker",
			nvdl: "btnvoidwalker",
			nvdw: "btnvoidwalker",
			nw2w: "btnchaoswarlockgreen",
			nwat: "btnhuntress",
			nwe1: "btnwareagle",
			nwe2: "btnwareagle",
			nwe3: "btnwareagle",
			nwen: "btnwendigo",
			nwgs: "btnwindserpent",
			nwiz: "btnbanditmage",
			nwld: "btndirewolf",
			nwlg: "btntimberwolf",
			nwlt: "btntimberwolf",
			nwna: "btnwendigo",
			nwnr: "btnwendigo",
			nwns: "btnwendigo",
			nwrg: "btnarmorgolem",
			nws1: "btndragonhawk",
			nwwd: "btntimberwolf",
			nwwf: "btntimberwolf",
			nwwg: "btntimberwolf",
			nwzd: "btnbanditmage",
			nwzg: "btnbanditmage",
			nwzr: "btnbanditmage",
			nzep: "btngoblinzeppelin",
			nzom: "btnzombie",
			o001: "btnvoodoolounge",
			o002: "btnriderlesskodo",
			o004: "btnspiritwalker",
			o006: "btnetherealformon",
			oalt_campaign: "btnaltarofstorms",
			oalt: "btnaltarofstorms",
			obar_chaos: "btnbarracks",
			obar: "btnbarracks",
			obea_chaos: "btnbeastiary",
			obea: "btnbeastiary",
			obla: "btnheroblademaster",
			obot: "btnorctransport",
			ocat: "btndemolisher",
			ocb2: "btnherotaurenchieftain",
			ocbh: "btnherotaurenchieftain",
			ocor: "btnorbofcorruption",
			odes: "btnorcdestroyer",
			odoc: "btnwitchdoctor",
			odrt: "btnherofarseer",
			oeye: "btnsentryward",
			ofar: "btnherofarseer",
			ofir: "btnorboffire",
			ofor: "btnforge",
			ofr2: "btnorboffire",
			ofro: "btnorboffrost",
			ofrt: "btnfortress",
			ogld: "btnguldan",
			ogre_chaos: "btngreathall",
			ogre: "btngreathall",
			ogrh: "btnhellscream",
			ogrk: "btngrunt",
			ogru: "btngrunt",
			ohun: "btnheadhunter",
			ohwd: "btnhealingward",
			ojgn: "btnjuggernaut",
			okod: "btnkodobeast",
			oli2: "btnorboflightning",
			omtg: "btnchaoswarlord",
			onzg: "btnraider",
			oosc: "btnriderlesskodo",
			opeo: "btnpeon",
			opgh: "btnchaosgrom",
			orai: "btnraider",
			orbr: "btnreinforcedburrows",
			orex_wyvern: "btnbeastmaster",
			orex: "btnbeastmaster",
			orkn_wyvern: "btnshadowhunter",
			orkn: "btnshadowhunter",
			osam: "btnheroblademaster",
			oshd: "btnshadowhunter",
			oshm_campaign: "btnshaman",
			oshm: "btnshaman",
			oshy: "btngoblinshipyard",
			osld_chaos: "btnspiritlodge",
			osld: "btnspiritlodge",
			oslo: "btnorbofslowness",
			osp1: "btnserpentward",
			osp2: "btnserpentward",
			osp3: "btnserpentward",
			osp4: "btnserpentward",
			ospm: "btnetherealformon",
			ospw: "btnspiritwalker",
			ostr: "btnstronghold",
			osw1: "btnspiritwolf",
			osw2: "btnspiritwolf",
			osw3: "btnspiritwolf",
			otau: "btntauren",
			otbk: "btnheadhunterberserker",
			otbr: "btntrollbatrider",
			otch: "btnherotaurenchieftain",
			othr: "btnthrall",
			otot: "btnstasistrap",
			otrb: "btntrollburrow",
			otto: "btntaurentotem",
			oven: "btnorbofvenom",
			ovlj: "btnwitchdoctor",
			ovln_campaign: "btnvoodoolounge",
			ovln: "btnvoodoolounge",
			owar: "btnchaoswarlord",
			owtw: "btnorctower",
			owyv: "btnwyvernrider",
			pams: "btnsnazzypotion",
			pgma: "btnpotionbluebig",
			phea: "btnpotiongreensmall",
			pinv: "btnlesserinvisibility",
			plcl: "btnlesserclaritypotion",
			pman: "btnpotionbluesmall",
			pnvl: "btnlesserinvulneralbility",
			prvt: "btnperiapt",
			rde2: "btnringgreen",
			recb: "btncorrosivebreath",
			redc: "btndocadepttraining",
			redt: "btndotadepttraining",
			reeb: "btnenchantedbears",
			reec: "btnenchantedcrows",
			rehs: "btnhardenedskin",
			reht: "btntamehippogriff",
			reib: "btnimprovedbows",
			rema: "btnmoonarmor",
			remg: "btnupgrademoonglaive",
			remk: "btnmarksmanship",
			renb: "btnnaturesblessing",
			repb: "btnvorpalblades",
			repm: "btnpackbeast",
			rerh: "btnreinforcedhides",
			rers: "btnhardenedskin",
			resc: "btnsentinel",
			resi: "btndryaddispelmagic",
			resm: "btnstrengthofthemoon",
			resw: "btnstrengthofthewild",
			reuv: "btnultravision",
			rews: "btnwellspring",
			rhac: "btnstonearchitecture",
			rhan: "btnanimalwartraining",
			rhar: "btnhumanarmorupone",
			rhcd: "btncloudoffog",
			rhde: "btndefend",
			rhfc: "btnflakcannons",
			rhfl: "btnflare",
			rhfs: "btnfragmentationbombs",
			rhgb: "btnhumanartilleryupone",
			rhhb: "btnstormhammer",
			rhla: "btnleatherupgradeone",
			rhlh: "btnhumanlumberupgrade1",
			rhme: "btnsteelmelee",
			rhpm: "btnpackbeast",
			rhpt: "btnpriestadept",
			rhra: "btnhumanmissileupone",
			rhri: "btndwarvenlongrifle",
			rhrt: "btnscatterrockets",
			rhsb: "btnsunderingblades",
			rhse: "btnmagicalsentry",
			rhss: "btncontrolmagic",
			rhst: "btnsorceressadept",
			rin1: "btnmantleofintelligence",
			ritd: "btnsacrificialdagger",
			rnam: "btnnagaarmorup1",
			rnat: "btnnagaweaponup1",
			rnec: "btnrodofnecromancy",
			rnen: "btnensnare",
			rnsb: "btnnagaburrow",
			rnsi: "btndryaddispelmagic",
			rnsw: "btnsirenadept",
			roar: "btnsteelarmor",
			robf: "btnfirerocks",
			robk: "btnberserkfortrolls",
			robs: "btnberserk",
			roen: "btnensnare",
			rolf: "btnliquidfire",
			rome: "btnorcmeleeupone",
			ropg: "btnpillage",
			ropm: "btnpackbeast",
			rora: "btnsteelranged",
			rorb: "btnreinforcedburrows",
			rosp: "btnspikedbarricades",
			rost: "btnshamanadept",
			rotr: "btnregenerate",
			rovs: "btnenvenomedspear",
			rowd: "btnwitchdoctoradept",
			rows: "btnsmash",
			rowt: "btnspiritwalkeradepttraining",
			rspd: "btnrune",
			rst1: "btngauntletsofogrepower",
			ruac: "btncannibalize",
			ruar: "btnunholyarmor",
			ruba: "btnbansheeadept",
			rubu: "btncryptfiendburrow",
			rucr: "btncreaturecarapace",
			ruex: "btnexhumecorpses",
			rufb: "btnfreezingbreath",
			rugf: "btnghoulfrenzy",
			rume: "btnunholystrength",
			rune: "btnnecromanceradept",
			rupc: "btnplaguecloud",
			rupm: "btnpackbeast",
			rura: "btncreatureattack",
			rusf: "btnstoneform",
			rusl: "btnskeletallongevity",
			rusm: "btnskeletonmage",
			rusp: "btndestroyer",
			ruwb: "btnweboff",
			rwdm: "btndrum",
			rwiz: "btnsobimask",
			scae: "pasbtncommand",
			scc1: "btncyclone",
			scri: "btncripple",
			sdro: "btnunload",
			shas: "btnscrollofhaste",
			shea: "btnscrolloftownportal",
			shen: "btnthoriumarmor",
			shrs: "btnmonsterlure",
			skul: "btnsacrificialskull",
			slo2: "btnload",
			slo3: "btnload",
			sman: "btnscrollofprotection",
			sneg: "btnstaffofnegation",
			spre: "btnstaffofpreservation",
			spro: "btnscroll",
			sreg: "btnscrollofregenerationgreen",
			sror: "btnsnazzyscrollgreen",
			ssan: "btnstaffofsanctuary",
			sshm: "btnambush",
			stel: "btnstaffofteleportation",
			stwa: "btnorcmeleeupone",
			stwp: "btnscrolluber",
			suhf: "btnunholyfrenzy",
			tdex: "btntome",
			texp: "btntomebrown",
			tgrh: "btngreathall",
			tint: "btntome",
			tret: "btntomeofretraining",
			tsct: "btnhumanwatchtower",
			tstr: "btntome",
			uabo: "btnabomination",
			uaco: "btnacolyte",
			uanb: "btnherocryptlord",
			uaod_campaign: "btnaltarofdarkness",
			uaod: "btnaltarofdarkness",
			uarb: "btnundeadairbarge",
			ubal: "btntichondrius",
			uban: "btnbanshee",
			ubdd: "btnfrostwyrm",
			ubdr: "btnazuredragon",
			ubon: "btnboneyard",
			ubot: "btnundeadtransport",
			ubsp: "btndestroyer",
			ucrl: "btnherocryptlord",
			ucry: "btncryptfiend",
			ucs1: "btncarrionscarabs",
			ucs2: "btncarrionscarabs",
			ucs3: "btncarrionscarabs",
			udea: "btnherodeathknight",
			udes: "btnundeaddestroyer",
			udre: "btnherodreadlord",
			udth: "btnherodreadlord",
			uear: "btnherodeathknight",
			ufro: "btnfrostwyrm",
			ugar: "btngargoyle",
			ugho: "btnghoul",
			ugol: "btnhauntedmine",
			ugrm: "btnstoneform",
			ugrv: "btngraveyard",
			uktl: "btnherolich",
			ulic: "btnlichversion2",
			umal: "btnherodreadlord",
			umtw: "btnmeatwagon",
			unec_campaign: "btnnecromancer",
			unec: "btnnecromancer",
			unp1: "btnhallofthedead",
			unp2: "btnblackcitadel",
			unpl: "btnnecropolis",
			uobs: "btnobsidianstatue",
			usap: "btnsacrificialpit",
			usep: "btncrypt",
			ushd: "btnshade",
			ushp: "btnundeadshipyard",
			uske: "btnskeletonwarrior",
			uskm: "btnskeletonmage",
			uslh: "btnslaughterhouse",
			uswb: "btnghost",
			usyl_reforged: "btnbansheeranger",
			usyl: "btnbansheeranger",
			utic: "btntichondrius",
			utod_campaign: "btntempleofthedamned",
			utod: "btntempleofthedamned",
			utom: "btntombofrelics",
			uubs: "btnundeadbattleship",
			uvar: "btnherodreadlord",
			uvng: "btnherodreadlord",
			uwar: "btnarchimonde",
			uzg1: "btnzigguratupgrade",
			uzg2: "btnfrosttower",
			wneg: "btnwandskull",
			wneu: "btnwandofneutralization",
			uzig: "btnziggurat"
		}
	},
	reforged: {
		extension: ".jpg",
		commands: {
			acef: "btnstormearth&fire",
			aell: "btnillidandemonform",
			aevi: "btnillidandemonform",
			anef: "btnstormearth&fire",
			arsg: "btnmishalv1",
			ecen: "btncenarius",
			eill: "btnillidan",
			emfr: "btnmalfurion",
			emns: "btnmalfurionwithoutstag",
			ensh: "btnnaisha",
			espv: "btnvengeanceincarnate",
			etyr_instant: "btntyrande",
			etyr: "btntyrande",
			hant: "btnantonidas",
			harf: "btnarthasfrost",
			hc00: "btnhighelfrunner",
			hdgo: "btndagrentheorcslayer",
			hdhw: "btndragonhawkrider",
			nhea: "btnhighelvenarcher_v1",
			hhes: "btnswordsman_v1",
			hhkl: "btnhalahkthelifebringer",
			hmbr: "btnmuradinbronzebeard",
			hmgd: "btnlordnicholasbuzan",
			hpb1: "btnmagroththedefender",
			hpb2: "btnsirgregoryedmunson",
			hphx: "btnphoenix",
			huth: "btnuther",
			hvsh: "btnladyvashj",
			hwat: "btnwaterelemental",
			hwt2: "btnwaterelementallv2",
			hwt3: "btnwaterelementallv3",
			nadk: "btnazuredrake",
			nadw: "btnazuredragonwhelp",
			nahy: "btnancienthydra",
			nane: "btnarachnathidearthborer",
			nanw: "btnwarriorarachnathid",
			nbdk: "btnblackdrake",
			nbdo: "btndragonspawnoverseer",
			nbdr: "btnblackdragonwhelp",
			nbds: "btngreendragonspawnsorcerer",
			nbdw: "btnpurpledragonspawn",
			nbel: "btnbloodelflieutenant",
			nbrg: "btnbrigand",
			nbzk: "btnbronzedrake",
			nbzw: "btnbronzedragonwhelp",
			ncat: "btndranaidemolisher",
			ncen: "btncentauroutrunner",
			ncfs: "btnwateryminion",
			nchp: "btnchaplain",
			ncim: "btncentaurimpaler",
			ncks: "btncentaursorcerer",
			ndh2: "btndranaihaven",
			ndh3: "btndranaibarracks",
			ndh4: "btnseersden",
			ndqp: "btnmaidenofpain",
			ndqs: "btnqueenofsuffering",
			ndqt: "btnviletemptress",
			ndr1: "btnlesserdarkminion",
			ndr2: "btndarkminion",
			ndr3: "btngreaterdarkminion",
			ndrd: "btndranaidarkslayer",
			ndrh: "btndranaiharbinger",
			ndrl: "btndranailaborer",
			ndrn: "btndranaivindicator",
			ndro: "btnnetherdragonroost",
			ndrp: "btndranaiprotocter",
			ndrs: "btndranaiseer",
			ndrt: "btndranaistalker",
			ndrv: "btndepthsrevenant",
			ndrw: "btndranaiwatcher",
			ndrz: "btnbronzedragonroost",
			ndtb: "btndarktrollberserker",
			ndth: "btndarktrollhighpriest",
			ndtw: "btndarktrollwarlord",
			negf: "btnearthfurytower",
			negm: "btnskyfurytower",
			negz: "btnengineergazlowe",
			nehy: "btnelderhydra",
			nelb: "btnberserkelemental",
			nele: "btnenragedelemental",
			nemi: "btnemissary",
			nenf: "btnenforcer",
			nenp: "btnpoisonent",
			nepl: "btnplagueent",
			ners: "btneredarsorcerer",
			nerw: "btneredarwarlock",
			nfa1: "btnpocketfactorylv2",
			nfa2: "btnpocketfactorylv3",
			nfgb: "btnbloodfiend",
			nfod: "btnfacelessonedeathbringer",
			nfot: "btnfacelessoneterror",
			nfpc: "btnpolarfurbolgchampion",
			nfpe: "btnpolarfurbolgeldershaman",
			nfre: "btnfurbolgeldershaman",
			nfrg: "btnfurblogchampion",
			nfsh: "btnforesttrollhighpriest",
			nftb: "btnforesttrollberserker",
			nftk: "btnforesttrollwarlord",
			ngdk: "btngreendrake",
			nggr: "btngranitegolem",
			ngh2: "btnwraith",
			ngnb: "btngnollbrute",
			ngns: "btngnollassassin",
			ngrk: "btnmudgolem",
			ngrw: "btngreendragonwhelp",
			ngz2: "btnragingbear",
			ngz3: "btnspiritbear",
			ngz4: "btnmishalv4",
			ngza: "btnmishalv3",
			ngzc: "btnmishalv1",
			ngzd: "btnmishalv2",
			nhdc: "btndeceiver",
			nhew: "btnbloodelfworker",
			nhfp: "btnfallenpriest",
			nhhr: "btnheretic",
			nhrh: "btnharpystormhag",
			nhrr: "btnharpyrogue",
			nhyc: "btndragonturtlered",
			nhym: "btnhydromancer",
			ninm: "btninfernalmachine",
			nits: "btnicetrollbeserker",
			nitt: "btnicetrolltrapper",
			nitw: "btnicetrollwarlord",
			njga: "btnelderjunglebeast",
			njgb: "btnenragedjunglebeast",
			njks: "btnjailorkassan",
			nkol: "btnkoboldtaskmaster",
			nkot: "btnkoboldtunneler",
			nlds: "btnlobstrokkdeepseer",
			nlpd: "btnlobstrokkredpooldweller",
			nlsn: "btnlobstrokkredsnapper",
			nltl: "btnlightninglizard",
			nlv2: "btnlavaspawnlv2",
			nlv3: "btnlavaspawnlv3",
			nmag: "btnmagtheridon",
			nmcf: "btnmurgulcliffrunner",
			nmdm: "btnmedivhravenform",
			nmit: "btnicetuskmammoth",
			nmpg: "btnmurlocplaguebearer",
			nmrr: "btnmurlochuntsman",
			nmrv: "btnmurgulmarauder",
			nmsn: "btnmurgulsnarecaster",
			nndk: "btnnetherdrake",
			nnht: "btnnetherdragonwhelp",
			nnmg: "btnmurgulreaver",
			nnwa: "btnnerubianwarrior",
			nnwl: "btnnerubianwebspinner",
			nnwr: "btnnerubianseer",
			nogm: "btnogremauler",
			nogn: "btnoneheadedogremagi",
			now2: "btnowlscoutlv2",
			now3: "btnowlscoutlv3",
			nowe: "btnenragedwildkin",
			nowk: "btnberserkwildkin",
			nowl: "btnowlscoutlv1",
			npld: "btnazgalor",
			nplg: "btngiantfrostbear",
			nqb2: "btnquillbeastlv2",
			nqb3: "btnquillbeastlv3",
			nqb4: "btnquillbeastlv4",
			nqbh: "btnquillboarhunter",
			nrdk: "btnreddragonwhelp",
			nrdr: "btnreddrake",
			nrel: "btnreefelemental",
			nrog: "btnrogue",
			nrvd: "btndeathrevenant",
			nrvf: "btnfirerevenant",
			nrvi: "btnicerevenant",
			nrvl: "btnlightningrevenant",
			nrvs: "btnfrostrevenant",
			nrzb: "btnrazorbackbrute",
			nrzm: "btnrazormanemedicineman",
			nrzt: "btnquillboar",
			nsbm: "btnbroodmother",
			nsc2: "btnspidercrablimbripper",
			nsc3: "btnspidercrabbehemoth",
			nsgb: "btnseagiantbehemoth",
			nsgg: "btnsiegegolem",
			nsgt: "btngiantspider",
			nsjs_wyvern: "btnchenstormstout",
			nsjs: "btnchenstormstout",
			nske: "btnskeletonminion",
			nskf: "btnburningarcher",
			nskg: "btngiantskeletonwarrior",
			nskm: "btnskeletalmarskman",
			nslf: "btnsludgeflinger",
			nslh: "btnsalamanderhatchling",
			nsll: "btnsalamanderlord",
			nsln: "btnsludgemontrosity",
			nsns: "btnwateryminioncaster",
			nspp: "btnspiritpig",
			nsqa: "btnsasquatchancient",
			nsqo: "btnsasquatchoracle",
			nsra: "btnorcwarlockapprentice",
			nsrh: "btnorcwarlockhermit",
			nsrn: "btnorcwarlocknecrolyte",
			nsrv: "btnseasrevenant",
			nsth: "btnsatyrhellcaller",
			nstl: "btnsatyrsoulstealer",
			nsts: "btnsatyrshadowdancer",
			nstw: "btnstormwyrm",
			nsw1: "btnlesserspiritbeast",
			nsw2: "btnspiritbeast",
			nsw3: "btngreaterspiritbeast",
			ntkh: "btntuskaarbrownhealer",
			ntks: "btntuskaarsorcerer",
			ntkt: "btntuskaartrapper",
			ntkw: "btntuskaarwarrior",
			ntrg: "btnseaturtlegreengargantuan",
			ntrh: "btnseaturtlegreenhatchling",
			ntrt: "btnseaturtlegreengiant",
			ntrv: "btntidesrevenant",
			ntws: "btnwateryminionlv2",
			nubr: "btnunbrokenrager",
			nubw: "btnunbrokendarkweaver",
			nvde: "btneldervoidwalker",
			nvdg: "btngreatervoidwalker",
			nvdl: "btnlesservoidwalker",
			nwad: "btnwatcherward",
			nwat: "btnsentry",
			nwe2: "btnthunderhawk",
			nwe3: "btnspirithawk",
			nwlg: "btngiantwolf",
			nwna: "btnwendigoelder",
			nwnr: "btnwendigoelder",
			nwns: "btnwendigoshaman",
			nwrg: "btnwargolem",
			nws1: "btndragonhawkriderv0",
			nwzg: "btnrenegadewizard",
			nwzr: "btnroguewizard",
			ocb2: "btncairnebloodhoof",
			ocbh: "btncairnebloodhoof",
			odrt: "btndrekthar",
			ogrk: "btngarthok",
			omtg: "btnmathog",
			onzg: "btnnazgrel",
			orex_wyvern: "btnrexxar",
			orex: "btnrexxar",
			orkn_wyvern: "btnrokhan",
			orkn: "btnrokhan",
			osam: "btnsamuro",
			osp2: "btnserpentwardlv2",
			osp3: "btnserpentwardlv3",
			osp4: "btnserpentwardlv4",
			osw2: "btndirewolflv2",
			osw3: "btnshadowwolflv3",
			ovlj: "btnvoljin",
			uanb: "btnanubarak",
			ubal: "btnbalnazzar",
			ubdd: "btnsapphironundead",
			ubdr: "btnsapphironliving",
			ucs1: "btncarrionscarabslv1",
			ucs2: "btncarrionscarabslv2",
			ucs3: "btncarrionscarabslv3",
			udth: "btndetheroc",
			uear: "btnarthasevil",
			umal: "btnmalganis",
			uswb: "btnsylvanasghost",
			usyl_reforged: "btnsylvanasghost",
			usyl: "btnsylvanas",
			uvar: "btnvarimathras",
			uvng: "btndalvengyr"
		}
	}
};