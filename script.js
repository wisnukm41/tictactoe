const statusDisplay = document.querySelector('.game--status');

let currentPlayer = "X";

let gameStatus = true;

let gameState = ["","","","","","","","",""];

const winningMessage = () => `Player ${currentPlayer} is Won!`

const drawMessage = () => `Game ended in a Draw :c`

const currentPlayerTurn = () => `Now is ${currentPlayer}'s Turn`

const cell = document.querySelectorAll('.cell')
cell.forEach(cell => cell.addEventListener('click',handleClick));

document.querySelector('.btn--restart').addEventListener('click',handleRestart);

statusDisplay.innerHTML = currentPlayerTurn();

function handleClick(e){
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if(!gameStatus || gameState[clickedCellIndex] != ""){
        return
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    validateCondition()
}   

function validateCondition(){
   let isWon = false;

   const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
   ]

   for (let i = 0; i < winCondition.length; i++) {
    const win = winCondition[i]
    let a = gameState[win[0]];
    let b = gameState[win[1]];
    let c = gameState[win[2]];

    if(a === "" || b === "" || c === "") {
        continue
    }

    if(a === b && b === c) {
        isWon = true;
        break
    }
    
   }

   if(isWon){
    statusDisplay.innerHTML = winningMessage();
    gameStatus = false;
    return
   }

   if(!gameState.includes("")){
    statusDisplay.innerHTML = drawMessage();
    gameStatus = false;
    return
   }

   handlePlayerChange()
}

function handlePlayerChange() {
    currentPlayer = currentPlayer == "X" ? "O" : "X"
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestart(){
    currentPlayer = "X";
    gameStatus = true;
    gameState = ["","","","","","","","",""];

    cell.forEach(cell => cell.innerHTML = "")

    statusDisplay.innerHTML = currentPlayerTurn()
}