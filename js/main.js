/*----- constants -----*/
const numColor = {
    '1': 'blue',
    '2': 'green',
    '3': 'red',
    '4': 'darkblue',
}

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
    board = new Array(400).fill().map(u => ({mine: false, adjMines: 0, revealed: false, flagged: false}));
    setMines(50);
    setAdj();
    console.log(board);
    render()
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
    if (board[idx] === undefined) return;
    board[idx].revealed = true;
    render();
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
    board.forEach(function(object, index) {
       const cell = document.getElementById(`b${index}`);
       cell.textContent = object.adjMines
       cell.style.color = 'transparent'
    })
    // board.forEach(function(object, index) {
    //    const cell = document.getElementById(`b${index}`);
    //    if (object.mine === true){
    //        cell.style.backgroundColor = 'red';
    //    } else {
    //        cell.style.backgroundColor = 'blue';
    //    }
    // })
    board.forEach(function (object, index) {
        const cell = document.getElementById(`b${index}`);
        if (object.revealed === true){
            cell.style.border = '.1vmin solid rgb(123,123,123)'
            cell.style.backgroundColor = 'rgb(189, 189, 189)'
            cell.style.color = 'white'
        } else if (object.revealed === false && object.flagged === true){
            cell.style.backgroundColor = 'orange'
        }
    });
}
