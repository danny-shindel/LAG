/*----- constants -----*/

/*----- app's state (variables) -----*/
let board, winner;

/*----- cached element references -----*/
const cellEl = [...document.querySelectorAll('#board > div')];

/*----- event listeners -----*/
document.querySelector('section > div')
    addEventListener('click', clickCell),
    addEventListener('contextmenu', flagCell)

/*----- functions -----*/
init();

function init(){
    board = new Array(400).fill().map(u => ({mine: false, adjMines: 0, revealed: false, flagged: false, boom: false}));
    setMines(50);
    setAdj();
    winner = null;
    console.log(board);
    render();
}

function setMines(num){
    let idx;
    while (num>0) {
        idx = Math.floor(Math.random() * board.length);
        while (board[idx].mine) {
            idx = Math.floor(Math.random() * board.length);
        }
        board[idx].mine = true;
        num --;
    }
}

function setAdj(){
    board.forEach(function(object,index){
        if (index === 0){
            let numAdj = 0
            if (board[index + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20 + 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index === 19){
            let numAdj = 0
            if (board[index - 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20 - 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index === 380){
            let numAdj = 0
            if (board[index - 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20 + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index === 399){
            let numAdj = 0
            if (board[index - 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20 - 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index - 20 < 0){
            let numAdj = 0;
            if (board[index].mine === true) return;
            if (board[index + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20 + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20 - 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index + 20 > board.length){
            let numAdj = 0;
            if (board[index].mine === true) return;
            if (board[index + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20 + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20 - 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index % 20 === 0){
            let numAdj = 0;
            if (board[index].mine === true) return;
            if (board[index + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20 + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20 + 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index % 20 === 19){
            let numAdj = 0;
            if (board[index].mine === true) return;
            if (board[index - 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20 - 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20 - 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else {
            let numAdj = 0;
            if (board[index].mine === true) return;
            if (board[index + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20 + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20 - 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20 + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20 - 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        }
    });
}

function clickCell(evt){
    const idx = cellEl.indexOf(evt.target);
    if (winner) return;
    if (board[idx] === undefined) return;
    if (board[idx].mine === true){
        board.forEach(function (object, index) {
            if (board[index].mine === true) {
                board[index].revealed = true;
            }
        })
        board[idx].boom = true;

    } else {
        board[idx].revealed = true;
    }
    winner = getWinner();
    render();
    console.log(winner)
}

function getWinner(){
    let winner = null
    let lose = board.some(cell => cell.boom === true);
    if (lose === true) return 2;
    let win = board.filter(cell => cell.revealed === false);
    if (win.length <= 50) return 1;
}

function flagCell(evt){
    const idx = cellEl.indexOf(evt.target);
    if (board[idx] === undefined || board[idx].revealed){
        return;
    } else if (board[idx].flagged){
        board[idx].flagged = false;
    } else {
        board[idx].flagged = true;
    }
    render();
}

function render(){
    board.forEach(function (object, index) {
        const cell = document.getElementById(`b${index}`);
        if (board[index].adjMines === 1 || board[index].adjMines === 2 || board[index].adjMines === 3 || board[index].adjMines === 4 || board[index].adjMines === 5 || board[index].adjMines === 6 || board[index].adjMines === 7 || board[index].adjMines === 8) {
            cell.textContent = object.adjMines
        }
        if (object.revealed === true){
            cell.style.border = '.1vmin solid rgb(123,123,123)'
            cell.style.backgroundColor = 'rgb(189, 189, 189)'
                if (object.adjMines === 1){
                    cell.style.color = 'blue';
                } else if (object.adjMines === 2){
                    cell.style.color = 'green';
                } else if (object.adjMines === 3){
                    cell.style.color = 'red'
                } else if (object.adjMines === 4){
                    cell.style.color = 'darkblue'
                } else if (object.adjMines === 5){
                    cell.style.color = 'darkred'
                } else if (object.adjMines === 6) {
                    cell.style.color = 'rgb(1,130,128)'
                } else if (object.adjMines === 7) {
                    cell.style.color = 'black'
                } else if (object.adjMines === 8) {
                    cell.style.color = 'gray'
                } else if (object.mine === true && object.boom === true) {
                    cell.innerHTML = '<img height="14vmin" src="https://i.imgur.com/NRTUWlT.png">';
                    cell.style.backgroundColor = 'red';
                } else if (object.mine === true) {
                    cell.innerHTML = '<img height="14vmin" src="https://i.imgur.com/NRTUWlT.png">';
                } else {return}
        } else if (object.revealed === false && object.flagged === true){
            cell.style.backgroundColor = 'orange'
        } 
    });
}

