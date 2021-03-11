<img src="https://i.imgur.com/NRTUWlT.png" width="125vmin">&nbsp;&nbsp;&nbsp;
<img src="https://i.imgur.com/NRTUWlT.png" width="125vmin">&nbsp;&nbsp;&nbsp;
<img src="https://i.imgur.com/NRTUWlT.png" width="125vmin"> &nbsp;&nbsp;&nbsp;
<img  src="https://i.imgur.com/NRTUWlT.png" width="125vmin">


# MINESWEEPER PSEUDOCODE

``General Assembly Cohort SEIR-02-22-21 Project 1``

1. Constants:
    1. none necessary, but may be created to dry out code
2. State Variables:
    1. board: will be update throughout game but created as array of objects in init
    2. winner: null(start) 1(winner) 2(loser)
    3. maybe board size of mines size depending on whether player can choose game difficulty
3. Cached Elements
    1. all board squares must listen for click and double click for flag
    2. replay button must listen for click
4. Init
    1. board must be created
        1. board will be array of object with length = how many squares on the board
        2. each object will contain:
            1. mine: true or false
            2. flagged: true of false
            3. revealed: true of false
            4. number of adjacent mines: 0-8
        3. All properties of object will initialize at false or 0
    2. mines place randomly on board
        1. helper function that randomly selects board array index mine number of times a switched mine to true
    3. set adj number
        1. help function that will iterate through the board and set adj mine number for all qualifying squares
    4. set winner = helper function
        1. if amount of squares unrevealed = total amount of mines winner = 1
5. Gameplay
    1. correspond index of click square with same square index of board array
        1. id divs of board to have index in them
    2. if board index has revealed value of true, return (that element has already been clicked)
    3. check if that board index is mine
        1. if mine winner = 2
    4. check if that board index adj mine - = 0
        1. if true flood
    5. else set board index revealed to true
    6. render
6. Replay
    1. do step 4.1 - 4.4 (init)
7. Icebox
    1. flag counter
        1. total amount of mines - number of flags placed
    2. timer

    

