var gameTimer = 0;
var endTime = 15000;
var gameEnded = true;

var codeText = "";

function beginGame() {
    // change the start button to the end button
    var startButton = document.getElementById("starter");
    startButton.value = "End Game";

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

function appendEvent(eventType) {
    // add the event type
    codeText += eventType;

    // add the current time of the event
    codeText += convert(gameTimer);
}

function endGame() {
    // change the end button to the start button
    var startButton = document.getElementById("starter");
    startButton.value = "Start Game";

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

// event listeners

document.getElementById("starter").addEventListener("click", function () {
    if (gameEnded) 
        beginGame();
    else 
        endGame();
});

// coral buttons
for (let i = 1; i <= 4; i++) {
    document.getElementById("l" + i).addEventListener("click", function() {
        if (!gameEnded) {
            appendEvent(i);
        }
    });
}