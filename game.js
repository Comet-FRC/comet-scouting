var gameTimer = 0;
const endTime = 1500;
var gameEnded = true;
var start;
var timerInterval;

var codeText = "";

function beginGame() {
  // change the start button to the end button
  var startButton = document.getElementById("starter");
  startButton.value = "End Game";
  pressChange(startButton);

  // make the timer visible
  var timer = document.getElementById("timer");
  timer.style.visibility = "visible";

  // make the timer start at 0
  var timerDisplay = document.getElementById("timerDisplay");
  timerDisplay.innerText = 0;

  // make coral points start at 0
  for (let i = 1; i < 5; i++) {
    document.getElementById("l" + i + "-score").innerText = 0;
  }

  // initialize timer values
  gameTimer = 0;
  gameEnded = false;
  start = Date.now();

  // start timer counting
  timerInterval = setInterval(updateTimer, 100)
  start = Date.now();
  
}

function pressChange(button) {
  button.classList.add("pressed");
  setTimeout(function() {
    button.classList.remove("pressed");
  }, 100);
}

// adds an event of the given type to the String used to generate the qr code
function appendEvent(eventType) {
  // add the event type
  codeText += eventType;

  // add the current time of the event
  codeText += convert(gameTimer, 2);
}

function endGame() {
  // change the end button to the start button
  var startButton = document.getElementById("starter");
  startButton.value = "Start Game";
  pressChange(startButton);

  // stop the timer from counting up
  gameEnded = true;
  clearInterval(timerInterval);
}

function updateTimer() {
  // keep track of time elapsed since start
  let delta = Date.now() - start;
  gameTimer = Math.floor(delta / 100);

  // update timer display
  var timerElem = document.getElementById("timerDisplay");
  timerElem.innerText = gameTimer / 10.0;

  // end the game if it's over
  if (gameTimer >= endTime + 600 || gameEnded) {
    endGame();
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
      score = document.getElementById("l" + i + "-score");
      score.innerText = parseInt(score.innerText) + 1;
      appendEvent(i);
      pressChange(document.getElementById("l" + i));
    }
  });
}

// algae buttons
document.getElementById("processor").addEventListener("click", function () {
  if (!gameEnded) 
    appendEvent('p');
});

document.getElementById("net").addEventListener("click", function () {
  if (!gameEnded) 
    appendEvent('n');
});