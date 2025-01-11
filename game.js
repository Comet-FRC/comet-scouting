var gameTimer = 0.0;
var endTime = 10;
var started = true;

function beginGame() {
    // change the start button to the end button
    var startButton = document.getElementById("starter");
    startButton.value = "End Game";
    startButton.onclick = function() { endGame() };

    var timer = document.getElementById("timer");
    timer.style.visibility = "visible";

    var timerDisplay = document.getElementById("timerDisplay");
    timerDisplay.innerText = gameTimer;

    gameTimer = 0;

    setTimeout(function() { updateTimer() }, 10)
}

function endGame() {
    // change the end button to the start button
    var startButton = document.getElementById("starter");
    startButton.value = "Start Game";
    startButton.onclick = function() { beginGame() };

    // stop the timer from counting up
    gameTimer = endTime;
}

function updateTimer() {
    gameTimer += 0.01;
    var timerDisplay = document.getElementById("timerDisplay");
    timerDisplay.innerText = gameTimer;
    
    if (gameTimer < endTime) {
        setTimeout(function() { updateTimer() }, 10);
    }
}