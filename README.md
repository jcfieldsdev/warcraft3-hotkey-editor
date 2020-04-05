# warcraft3-hotkey-editor

A [hotkey editor for *Warcraft III*](https://jcfields.gitlab.io/warcraft3-hotkey-editor/) written in JavaScript. Includes all units and structures from standard multiplayer and the official campaigns. In addition to editing hotkeys, it also allows editing tooltip text with a simplified syntax and repositioning buttons by drag-and-drop.

## Limitations

- The icon order algorithm may not be exactly the same as the game in cases where there are button position conflicts (which, by default, includes several creeps).
- There are some special creeps and other units in the campaign that can potentially be player-controlled (through mind control abilities or otherwise) that may not be available in the editor, though their commands are typically present in the standard multiplayer creeps.

## Acknowledgments

Used [RivSoft's Warcraft III data viewer](https://wc3.rivsoft.net/) for data and assets and [WTii's unit tester map](https://www.hiveworkshop.com/threads/wtiis-unit-tester.239333/) for testing.

## Authors

- J.C. Fields <jcfields+gitlab@gmail.com>
- Uses [Space Mono](https://github.com/googlefonts/spacemono) font by Colophon Foundry
- Includes [QWEASZ hotkey set](https://www.reddit.com/r/WC3/comments/69p3nv/improved_custom_hotkeys_setup_by_wtvr/) by WTVR

## License

- [MIT license](http://opensource.org/licenses/mit-license.php)

## See also

- [*Starcraft II* Hotkey Editor](https://gitlab.com/jcfields/starcraft2-hotkey-editor)—A similar editor derived from this project.
