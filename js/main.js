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

const numLookup = {
    0: 'https://i.imgur.com/urvslGR.png',
    1: 'https://i.imgur.com/1wnTUnp.png',
    2: 'https://i.imgur.com/dqoRkIt.png',
    3: 'https://i.imgur.com/I07iOlD.png',
    4: 'https://i.imgur.com/nkPrsn5.png',
    5: 'https://i.imgur.com/8dijaSt.png',
    6: 'https://i.imgur.com/CoSSZqJ.png',
    7: 'https://i.imgur.com/bzsKNwX.png',
    8: 'https://i.imgur.com/VromFWb.png',
    9: 'https://i.imgur.com/HXHgmDl.png',
    '-': 'https://i.imgur.com/Qd1VgCY.png',
};

const faceLookup = {
    true: '<img src="https://i.imgur.com/iKGK9WJ.png">',
    false: '<img src="https://i.imgur.com/TPJhyY5.png">',
    1: '<img src="https://i.imgur.com/Zd8eUHQ.png">',
    2: '<img src="https://i.imgur.com/TTxdJXR.png">'
};

const imageLookup = {
    'flag': '<img height="130%" src="https://i.imgur.com/NwO9zC7.png">',
    'bomb': '<img height="80%" src="https://i.imgur.com/NRTUWlT.png">',
    'bombx': '<img height="80%" src="https://i.imgur.com/M8yFgAA.png">',
}

const sizeLookup = {
    10: [10, '30.5vmin', '6.8vmin'],
    20: [50, '60.5vmin', '12.1vmin'],
    25: [125, '75.5vmin', '15.2vmin'],

}

/*----- app's state (variables) -----*/
let board, winner, mines, timer, hold, size, cellEl;

/*----- cached element references -----*/
const buttonEl = document.getElementById('single');
const difficultyEl = document.querySelectorAll('.difficulty');
const testEl = document.getElementById('board');
const boardEl = document.getElementById('boardborder');
const menuEl = document.getElementById('menu');
const digitalEl = document.getElementById('count');
const timerEl = document.getElementById('timer');
const textEl = document.querySelector('header');



/*----- event listeners -----*/
difficultyEl.forEach(button => {button.addEventListener('click', difficulty)})
difficultyEl.forEach(button => {button.addEventListener('mousedown', function(evt){
    if (evt.ctrlKey || evt.which === 3) return;
    button.classList.toggle('pushed');
})});
difficultyEl.forEach(button => {button.addEventListener('mouseup', function (evt) {
        if (evt.ctrlKey || evt.which === 3) return;
        button.classList.toggle('pushed');
})});

buttonEl.addEventListener('click', init);
buttonEl.addEventListener('contextmenu', difficulty);
buttonEl.addEventListener('mousedown', function(evt){
    if (evt.ctrlKey || evt.which === 3) return;
    buttonEl.classList.toggle('pushed');
});
buttonEl.addEventListener('mouseup', function(evt){
    if (evt.ctrlKey || evt.which === 3) return;
    buttonEl.classList.toggle('pushed');
});

document.querySelector('#board').addEventListener('click', clickCell);
document.querySelector('#board').addEventListener('contextmenu', flagCell);
document.querySelector('#board').addEventListener('mousedown', holdOn); 
document.querySelector('#board').addEventListener('mouseup', holdOn); 

/*----- functions -----*/
init();

function difficulty(evt){
    if (evt.ctrlKey || evt.which === 3){
        buttonEl.style.display = "none";
        difficultyEl.forEach(button => { button.style.display = "flex" });
        if (size === 10){
            digitalEl.style.display = "none";
            timerEl.style.display = "none";
            menuEl.style.justifyContent = "center";
        }
    } else {
        if (digitalEl.style.display === "none") digitalEl.style.display = "flex";
        if (timerEl.style.display === "none") timerEl.style.display = "flex";
        if (menuEl.style.justifyContent === "center") menuEl.style.justifyContent = "space-between";
        buttonEl.style.display = "flex";
        difficultyEl.forEach(button => { button.style.display = "none" });
        if (evt.target.parentElement.id > 0){
            size = parseInt(evt.target.parentElement.id);
        }else size = parseInt(evt.target.id);{

        }
        init(1);
    }
}

function init(x) {
    if (!x) {
        size = 20;
    }
    genBoard();
    board = new Array(size * size).fill().map(u => ({mine: false, adjMines: 0, revealed: false, flagged: false, boom: false}));
    mines = sizeLookup[size][0];
    setMines(mines);
    setAdj();
    winner = null;
    clearInterval(timer);
    hold = true
    render();
}

function genBoard(){
    while (testEl.firstChild) {
        testEl.removeChild(testEl.lastChild);
    }
    boardArray = new Array(size * size)
    for (let i = 0; i < boardArray.length; i++)
        boardArray[i] = `b${i}`
    boardArray.forEach(function (id) {
        const div = document.createElement('div')
        div.setAttribute('id', id);
        testEl.appendChild(div);
    })
    testEl.classList.remove(...testEl.classList);
    boardEl.classList.remove(...boardEl.classList);
    boardEl.classList.add(`boardborder${size}`)
    testEl.classList.add(`board${size}`)
    menuEl.style.width = sizeLookup[size][1];
    if (size === 10){
        menuEl.style.paddingRight = '2vmin';
        menuEl.style.paddingLeft = '2vmin';
    } else {
        menuEl.style.paddingRight = '3vmin';
        menuEl.style.paddingLeft = '3vmin';
    }
    cellEl = [...document.querySelectorAll('#board > div')];
}

function setMines(num) {
    let idx;
    while (num>0) {
        idx = Math.floor(Math.random() * board.length);
        while (board[idx].mine) {
            idx = Math.floor(Math.random() * board.length);
        };
        board[idx].mine = true;
        num --;
    }
}

function setAdj() {
    board.forEach(function (object, index) {
        if (object.mine) return;
        let numAdj = 0;
        if (index % size !== 0 && (index - size) >= 0) {
            if (board[index - size - 1].mine) numAdj += 1;
        }; //northwest
        if ((index - size) >= 0) {
            if (board[index - size].mine) numAdj += 1;
        }; //north
        if (index % size < (size - 1) && (index - size) >= 0) {
            if (board[index - size + 1].mine) numAdj += 1;
        }; //northeast
        if ((index % size) < (size - 1)) {
            if (board[index + 1].mine) numAdj += 1;
        }; //east
        if ((index % size) < (size - 1) && (index + size) < board.length) {
            if (board[index + size + 1].mine) numAdj += 1;
        }; //southeast
        if ((index + size) < board.length) {
            if (board[index + size].mine) numAdj += 1;
        }; //south
        if ((index + size) < board.length && index % size !== 0) {
            if (board[index + size - 1].mine) numAdj += 1;
        }; //southwest
        if (index % size !== 0) {
            if (board[index - 1].mine) numAdj += 1;
        }; //west
        board[index].adjMines = numAdj;
    });
}

function clickCell(evt) {
    const idx = cellEl.indexOf(evt.target);
    if (board[idx] === undefined) return;
    if (winner) return;
    if (board[idx].flagged) return;
    if (board.filter(cell => cell.revealed).length === 0) startTimer();
    if (board[idx].mine){
        board.forEach(function (object, index) {
            if (object.flagged && object.mine) board[index].revealed = false;
            else if (object.flagged && !object.mine) board[index].mine = true, board[index].revealed = true;
            else if (object.mine) board[index].revealed = true;
        });
        board[idx].boom = true;
    } else { 
        reveal(idx);
    }
    winner = getWinner();
    if (winner) clearInterval(timer);
    render();
}

function startTimer() {
    var sec = 0;
    function pad(val) { return val > 9 ? val : "0" + val; }
    timer = setInterval(function () {
        pad(++sec)
        let array = Array.from(String(`${sec}`.padStart(3, '0')), Number);
        array.forEach(function (number, index) {
            const timerCell = document.getElementById(`tnum${index}`);
            timerCell.style.backgroundImage = `url(${numLookup[number]})`
        })
    }, 1000);
}

function reveal(idx) {
    if (board[idx].flagged) return;
    board[idx].revealed = true;
    if (!board[idx].adjMines) {
        const neighbors = getNeighbors(idx);
        neighbors.forEach(function (idx) {
            if (!board[idx].revealed && !board[idx].mine) reveal(idx);
        });
    }
}

function getNeighbors(idx) {
    const neighbors = [];
    if (idx % size !== 0 && (idx-size) >= 0) neighbors.push(idx - size - 1); //northwest
    if ((idx - size) >= 0) neighbors.push(idx-size); //north
    if (idx % size <(size - 1) && (idx-size) >= 0) neighbors.push(idx - size + 1); //northeast
    if (idx % size < (size - 1)) neighbors.push(idx + 1); //east
    if (idx % size < (size - 1) && (idx + size) < board.length) neighbors.push(idx + size + 1); //southeast
    if ((idx + size) < board.length) neighbors.push(idx + size); //south
    if ((idx + size) < board.length && idx % size !== 0) neighbors.push(idx + size -1); //southwest
    if (idx % size !== 0) neighbors.push(idx - 1); //west
    return neighbors;
}

function getWinner() {
    if (board.some(cell => cell.boom === true)) return 2;
    if (board.filter(cell => cell.revealed === false).length <= mines) return 1;
}

function flagCell(evt) {
    if (winner) return;
    const idx = cellEl.indexOf(evt.target);
    const idxp = cellEl.indexOf(evt.target.parentElement);
    if (idx >= 0){
        if (board[idx] === undefined || board[idx].revealed) {
            return;
        } else if (board[idx].flagged) {
            board[idx].flagged = false;
        } else {
        board[idx].flagged = true;
        }
    } else {
        board[idxp].flagged = false;
    }
    render();
}

function holdOn(evt) {
    if (evt.ctrlKey || evt.which === 3) return;
    const idx = cellEl.indexOf(evt.target);
    if (!hold) return hold=true
    if (!board[idx]) return;
    else if (!board[idx].revealed) hold = false;
    else return;
    render();
}

function render() {
    board.forEach(function (object, index) {
        const cell = document.getElementById(`b${index}`);
        cell.removeAttribute('style');
        cell.innerHTML = '';
        cell.textContent = '';
        if (board[index].adjMines) cell.textContent = object.adjMines;
        if (!object.revealed){
            cell.classList.add('unrevealed');
            cell.classList.replace('revealed','unrevealed');
            object.flagged ? cell.innerHTML = imageLookup['flag'] : cell.innerHTML = '';
        } else if (object.revealed){
            cell.classList.replace('unrevealed','revealed');
            cell.removeAttribute('style');
            cell.style.color = colorLookup[object.adjMines];
            if (object.mine){
                if (object.flagged) cell.innerHTML = imageLookup['bombx'];
                else if (object.boom) cell.style.backgroundColor = 'red', cell.innerHTML = imageLookup['bomb'];
                else cell.innerHTML = imageLookup['bomb'];
            }
        }
    });
    if ((mines - board.filter(cell => cell.flagged).length) >= 0){
        let array = Array.from(String(`${mines - board.filter(cell => cell.flagged).length}`.padStart(3, '0')), Number);
        array.forEach(function(number, index){
            const bombCell = document.getElementById(`bnum${index}`);
            bombCell.style.backgroundImage = `url(${numLookup[number]})`
        })
    } else if ((mines - board.filter(cell => cell.flagged).length) < 0){
        let array = Array.from(String(`-0${(mines - board.filter(cell => cell.flagged).length)*-1}`, Number));
        array.forEach(function (number, index) {
            const bombCell = document.getElementById(`bnum${index}`);
            bombCell.style.backgroundImage = `url(${numLookup[number]})`
        })
    }
    winner? buttonEl.innerHTML = faceLookup[winner] : buttonEl.innerHTML = faceLookup[hold];
} 
