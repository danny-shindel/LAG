<img src="https://i.imgur.com/iKGK9WJ.png" width="115vmin">&nbsp;&nbsp;&nbsp;
<img src="https://i.imgur.com/TPJhyY5.png" width="115vmin">&nbsp;&nbsp;&nbsp;
<img src="https://i.imgur.com/Zd8eUHQ.png" width="115vmin"> &nbsp;&nbsp;&nbsp;
<img  src="https://i.imgur.com/TTxdJXR.png" width="115vmin">


# MINESWEEPER BY DANIEL SHINDEL

``General Assembly Cohort SEIR-02-22-21 Project 1``

## Project Description

- MineSweeper Background
    - Created by Curt Johnson, orginally for IBM's OS/2, MineSweeper was ported to Microsoft Windows by Robert Donner and offically released as part of the Microsoft Entertainment Pack 1 in 1990. As a standard install, it was first included as a part of Windows 3.1 in 1992.
- Project Requirments
    - A game of your choice, from a set list, that includes win/loss logic coupled with win/loss rendering that is playable in a browser. Must be coded using separate HTML,CSS, & JavaScript files, be properly indented, have no remaining dead and/or commented out code, sensibly named function and variables, be coded in a consistent manner, and deployed online using GitHub Pages.
- Execution
    - My motivation in developmet for this game was to create, as close as possible, a perfect clone of 90's era MineSweeper. From the different win/loss logic combinations of flagged/mine/revealed square relationships to render details such as the smiling face button press style, you will be hard pressed to find many difference between mine and the original game, both in function and style. As an homage to Curt Johnson's original MineSweeper, and an excerise in precision I think this project's execution was a success.

## Game Screenshots
<img  src="https://i.imgur.com/i2742Ms.png" width="450vmin">

> Inital Board: Board initiates with all squares unrevealed and mines placed randomly, left mine/flag counter at total number of mines, and right timer has not begun.

<img  src="https://i.imgur.com/nJYGvDc.png" width="450vmin">

> Gameplay Board: Board floods when needed, counts down mines as flags are place in left number count, right side timer times round, and board displays all necessary information for gameplay.

<img  src="https://i.imgur.com/FbWsNli.png" width="450vmin">

> Losing Board: Smiling face turns to frowning face to indicate loss, all unflagged mines are revealed, mines flagged correctly remain flags, squares flagged incorrectly render mines with red x, timer stops.

<img  src="https://i.imgur.com/nkR5wgf.png" width="450vmin">

> Winning Board: Smiling face turn into cool glasses face to indicate win, there are no more square to reveal that arent mines, timer stops.

## Technologies Used

- HTML
- CSS
- JavaScript

## Getting Started

### Rules

Left click any square to begin playing. Left clicking a square reveals what's under that square. If there is a mine under a square, you lose. The numbers shown on revealed squares represent how many squares, that are touching that square, have bombs. The bombs can be above, below, right, left, or diagonal to the square. Avoid all the mines and expose all non-mine squares to win.
> Hint: Use the numbers to determine where the bombs are.

> Hint: You can place flags on unrevealed squares, that you think are mines, using right click. A flag placed on a square will not allow you to reveal that square. The number on the left side of the screen indicated how many mines exist on the board and decreases with each flag placement. Right click a flag to remove it.


### Link to Game

[MineSweeper](https://danny-shindel.github.io/MineSweeper/)

## Planned Future Enhancements

- Full Mobile Compatibility
    - In its' current state the game is able to be played on a mobile browser, however, you are not able to flag squares.
- Board Manipulation
    - Implementation of features that allow player to choose difficulty levels that correspond with different board sizes and mine counts.
- Sounds
    - Implementing period correct (90's) sounds during gameplay that enhance, and don't overshadow or distract from, gameplay.



