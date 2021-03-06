/*----- constants -----*/

/*----- app's state (variables) -----*/
let board, winner;

/*----- cached element references -----*/
// const cellEl = document.querySelectorAll('#board > div')

/*----- event listeners -----*/
document.querySelectorAll('#board > div')

/*----- functions -----*/
init();

function init(){
    board = new Array(400).fill().map(u => ({mine: false, adjMines: 0, revealed: false, flagged: false}))
    // console.log(board)
    setBombs(50);
    setAdj();
    render()
}
function setBombs(num){
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

}

function render(){
    board.forEach(function(object, index) {
       const cell = document.getElementById(`b${index}`);
       if (object.mine === true){
           cell.style.backgroundColor = 'red';
       } else {
           cell.style.backgroundColor = 'blue';
       }
    })
}


console.log(board)
