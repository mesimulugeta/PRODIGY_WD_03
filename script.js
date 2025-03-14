let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset');
let turnO = true; 
let newGame = document.querySelector('.new');
let messageContainer = document.querySelector('.message');
let message = document.querySelector('.mes');
let currentTurn = document.querySelector('.currentTurn');
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
const updateTurn = () => {
    currentTurn.innerText = turnO ? 'O' : 'X';
};
boxes.forEach((box) => {
    box.addEventListener('click', function () {
        if (turnO) {
            box.innerText = 'O';
            box.style.color = 'black';
            turnO = false;
            box.disabled = true;
            checkWinner();
        } else {
            box.innerText = 'X';
            box.style.color = 'black';
            turnO = true;
            box.disabled = true;
            checkWinner();
        }
        updateTurn();
    });
});
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
const showWinner = (winner) => {
    message.innerText = `The Winner is ${winner}`;
    messageContainer.classList.remove('hide');
    disableBoxes();
    resetBtn.style.display = 'none'; 
};
const checkWinner = () => {
    let hasWin = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val!=="" && pos3Val!=="" 
            && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            hasWin = true;
            return;
        }
    }
    if (!hasWin) {
        const allBoxes = [...boxes].every((box) => box.innerText !== "");
        if (allBoxes) {
            messageContainer.classList.remove('hide');
            message.innerText = 'Match Drawn';
            resetBtn.style.display = 'none'; 
        }
    } else {
        resetBtn.style.display = 'block'; 
    }
};
const resetGame = () => {
    turnO = true;
    enableBoxes();
    messageContainer.classList.add('hide');
    resetBtn.style.display = 'block';
    updateTurn();
};
updateTurn();
newGame.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);