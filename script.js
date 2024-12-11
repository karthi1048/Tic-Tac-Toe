let boxes = document.querySelectorAll('.box');  //array
let resetBtn = document.querySelector('#reset-btn');
let newBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true; // player X or player O
let count = 0;

// Using 2D array to store winning patterns, but strings could be used also
const winPat = [
    [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";    // removes already present values
    }
}

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add('hide');
}

const draw = () => {
    msg.innerText = 'Game is Draw';
    msgContainer.classList.remove('hide');
}

// to modify the msg after checking for winner
const showWinner = (winnerVal) => {
    msg.innerText = `Winner is ${winnerVal}`;    // winnerVal = pos1Val
    msgContainer.classList.remove('hide');
    disableBoxes();   // calling this ensures there is only one winner
}


// to track the winner, need to check the winning pattern
const checkWin = () => {
    for(let pattern of winPat) {

        // pattern here is a array, so we will use its indices(index) to check for X or O
        // console.log(pattern[0],pattern[1],pattern[2]);
        
        // using the winPat(pattern) array values we will check & get values(text) from boxes(button) array
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);

        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // to ensure that all 3 pos values must be used to decide winner, we use if else
        if(pos1Val != '' && pos2Val != '' && pos3Val != '') {
            // to check if winner
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log('winner is ', pos1Val);
                showWinner(pos1Val);
            }
        }
    }
}


// changing box click into an action
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        // console.log('box clicked');

        count++;      // to count box usage
        if(turnO) { 
            box.innerText = 'O';
            box.style.color = 'red';
            turnO = false;   // leads to turn of X
        } else {
            box.innerText = 'X';
            box.style.color = 'green';
            turnO = true;
        }
        // for checking draw
        if(count === 9){
            draw();
        }
    box.disabled = true;  // disabling box(button) ensures there is no rewriting

    // to track
    checkWin();
    })
})

newBtn.addEventListener('click',resetGame);
resetBtn.addEventListener('click',resetGame);