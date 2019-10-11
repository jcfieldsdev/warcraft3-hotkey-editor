# warcraft3-hotkey-editor

A [hotkey editor for *Warcraft III*](https://jcfields.gitlab.io/warcraft3-hotkey-editor/) written in JavaScript. Includes all units and structures from standard multiplayer and the official campaigns. In addition to editing hotkeys, it also allows editing tooltip text with a simplified syntax and repositioning buttons by drag-and-drop.

## Limitations

There are a few known limitations of the editor:

- The editor cannot edit button positions for the "learn hero ability" submenu (i.e., the "Researchbuttonpos" attribute). It is also technically possible for there to be a conflict between a "learn" hotkey (i.e., "Researchhotkey") and the cancel button, which the editor will not be able to detect (though this is highly unlikely since most users will leave the cancel button mapped to the escape key).
- The icon order algorithm may not be exactly the same as the game in cases where there are button position conflicts (which, by default, includes several creeps).
- The editor will not display tooltip text color besides the standard white, yellow, and light blue used in the game by default, though other colors will still be saved correctly.
- The default hotkey settings are for *The Frozen Throne* multiplayer; there are a handful of differences with *Reign of Chaos* and the campaigns (including the *Frozen Throne* campaigns) that the editor does not properly reflect. For example, in *Reign of Chaos*, the Far Seer and Beastiary have their commands in a different order and many units have different names. The shops in the *Frozen Throne* campaign have different items. In all of the campaigns, there are three rather than two levels of "Spiked Barricades" in the War Mill and the Necromancer's abilities are in a different order.
- There are many special creeps and other units in the campaign that can potentially be player-controlled (through mind control abilities or otherwise) that may not be available in the editor, though their commands are typically present in the standard multiplayer creeps. The mission "The Dark Lady," for instance, has a bunch of these.

## Acknowledgments

Uses the [QWEASZ hotkey set by WTVR](https://www.reddit.com/r/WC3/comments/69p3nv/improved_custom_hotkeys_setup_by_wtvr/) as one of the sample hotkey sets.

[WTii's Unit Tester map](https://www.hiveworkshop.com/threads/wtiis-unit-tester.239333/) was very handy for testing.

## Authors

- J.C. Fields <jcfields+gitlab@gmail.com>

## License

- [MIT license](http://opensource.org/licenses/mit-license.php)

## See also

- [*Starcraft II* Hotkey Editor](https://gitlab.com/jcfields/starcraft2-hotkey-editor)—A similar editor derived from this project.
