var gameTimer = 0.0;
var endTime = 15000;
var gameEnded = false;

var started = true;

function beginGame() {
    // change the start button to the end button
    var startButton = document.getElementById("starter");
    startButton.value = "End Game";
    startButton.onclick = function() { endGame() };

    // make the timer visible
    var timer = document.getElementById("timer");
    timer.style.visibility = "visible";

    // make the timer display the game time
    var timerDisplay = document.getElementById("timerDisplay");
    timerDisplay.innerText = gameTimer;

    // initialize timer value
    gameTimer = 0;

    // begin timer counting up
    gameEnded = false;
    setTimeout(function() { updateTimer() }, 10)
}

function endGame() {
    // change the end button to the start button
    var startButton = document.getElementById("starter");
    startButton.value = "Start Game";
    startButton.onclick = function() { beginGame() };

    // stop the timer from counting up
    gameEnded = true;
}

function updateTimer() {
    // increment timer
    gameTimer += 1;

    // update timer display
    var timerDisplay = document.getElementById("timerDisplay");
    timerDisplay.innerText = gameTimer / 100.0;
    
    // if game is still going, continue 
    if (gameTimer < endTime && !gameEnded) {
        setTimeout(function() { updateTimer() }, 10);
    }
}