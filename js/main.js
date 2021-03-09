/*----- constants -----*/
const colorLookup = {
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'darkblue',
    5: 'darkred',
    6: 'rgb(1,130,128)',
    7: 'black',
    8: 'gray',
}

// const styleLookup = {
//     true: ''
// }

/*----- app's state (variables) -----*/
let board, winner, mines, timer;

/*----- cached element references -----*/
const cellEl = [...document.querySelectorAll('#board > div')];
const bombCountEl = document.getElementById('bombs');
const buttonEl = document.querySelector('button');

/*----- event listeners -----*/
document.querySelector('section > div')
    addEventListener('click', clickCell)
    addEventListener('contextmenu', flagCell)
    // addEventListener('mousedown', function(evt){
    //     buttonEl.innerHTML = '<img height="85%" src="https://i.imgur.com/TPJhyY5.png">'
    // })
    // addEventListener('mouseup', function(evt){
    //     buttonEl.innerHTML = '<img height="85%" src="https://i.imgur.com/iKGK9WJ.png">'
    // })

buttonEl.addEventListener('click', init)

/*----- functions -----*/
init();

function init(){
    board = new Array(400).fill().map(u => ({mine: false, adjMines: 0, revealed: false, flagged: false, boom: false}));
    mines = 50;
    setMines(mines);
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
            if (board[index].mine) return;
            if (board[index + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20 + 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index === 19){
            let numAdj = 0
            if (board[index].mine) return;
            if (board[index - 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 20 - 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index === 380){
            let numAdj = 0
            if (board[index].mine) return;
            if (board[index - 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20 + 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index + 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index === 399){
            let numAdj = 0
            if (board[index].mine) return;
            if (board[index - 1].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20].mine === true)
                numAdj = numAdj + 1;
            if (board[index - 20 - 1].mine === true)
                numAdj = numAdj + 1;
            board[index].adjMines = numAdj;
        } else if (index - 20 < 0){
            let numAdj = 0;
            if (board[index].mine) return;
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
            if (board[index].mine) return;
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
            if (board[index].mine) return;
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
            if (board[index].mine) return;
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
            if (board[index].mine) return;
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
    if (winner) return
    if (board[idx].flagged) return;
    if (board.filter(cell => cell.revealed).length === 0) startTimmer();
    if (board[idx].mine){
        board.forEach(function (object, index) {
            if (object.flagged && object.mine) board[index].revealed = false;
            else if (object.flagged && !object.mine) board[index].mine = true, board[index].revealed = true;
            else if (object.mine) board[index].revealed = true;
        });
        board[idx].boom = true;
    } else { 
        reveal(idx)
    }
    winner = getWinner();
    if (winner) clearInterval(timer)
    render();
}

function startTimmer() {
    var sec = 0
    function pad(val) { return val > 9 ? val : "0" + val; }
    timer = setInterval(function () {
        document.getElementById("timmer").innerHTML = pad(++sec);
    }, 1000);
    console.log(startTimmer)
}

function reveal(idx) {
    if (board[idx].flagged) return;
    board[idx].revealed = true;
    if (board[idx].adjMines === 0) {
        const neighbors = getNeighbors(idx);
        neighbors.forEach(function (idx) {
            if (!board[idx].revealed && !board[idx].mine) reveal(idx);
        });
    }
}

function getNeighbors(idx){
    const neighbors = [];
    if (idx % 20 !== 0 && (idx-20) >= 0) neighbors.push(idx - 20 - 1); //northwest
    if ((idx-20) >= 0) neighbors.push(idx-20); //north
    if (idx % 20 <19 && (idx-20) >= 0) neighbors.push(idx - 20 + 1); //northeast
    if (idx % 20 < 19) neighbors.push(idx + 1); //east
    if (idx % 20 < 19 && (idx + 20) < board.length) neighbors.push(idx + 20 + 1) //southeast
    if ((idx + 20) < board.length) neighbors.push(idx + 20) //south
    if ((idx + 20) < board.length && idx % 20 !== 0) neighbors.push(idx + 20 -1) //southwest
    if (idx % 20 !== 0) neighbors.push(idx - 1) //west
    // console.log(neighbors)
    return neighbors
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
        cell.innerHTML = '';
        cell.textContent = '';
        if (board[index].adjMines) cell.textContent = object.adjMines;
        if (!object.revealed){
            cell.classList.add('unrevealed');
            cell.classList.replace('revealed','unrevealed');
            if (object.flagged) cell.style.backgroundColor = 'orange'
            else if (!object.flagged) cell.removeAttribute('style');
        } else if (object.revealed){
            cell.classList.replace('unrevealed','revealed');
            cell.removeAttribute('style');
            cell.style.color = colorLookup[object.adjMines];
            if (object.mine){
                if (object.flagged) cell.style.backgroundColor = 'green', cell.innerHTML = '<img height="80%" src="https://i.imgur.com/NRTUWlT.png">';
                else if (object.boom) cell.style.backgroundColor = 'red', cell.innerHTML = '<img height="80%" src="https://i.imgur.com/NRTUWlT.png">';
                else cell.innerHTML = '<img height="80%" src="https://i.imgur.com/NRTUWlT.png">';
            }
        }
    });
    bombCountEl.textContent = mines - board.filter(cell => cell.flagged).length
    if (winner === null) buttonEl.innerHTML = '<img height="85%" src="https://i.imgur.com/iKGK9WJ.png">'
    else if (winner === 1) buttonEl.innerHTML = '<img height="85%" src="https://i.imgur.com/Zd8eUHQ.png">'
    else if (winner === 2) buttonEl.innerHTML = '<img height="85%" src="https://i.imgur.com/TTxdJXR.png">'
}