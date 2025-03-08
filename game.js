var gameTimer = 0;
const endTime = 1500;
const teleopTime = 150;

var currentScore = 0;

var gameEnded = true;
var isAuton = true;
var undoMode = false;

var autonSwitched = false;

var start;
var timerInterval;

const autonScoreVals = {
  "l1": 3,
  "l2": 4,
  "l3": 6,
  "l4": 7,
  
  "p": 6,
  "n": 4,
  "r": 0,
  "leave": 3
}

const teleopScoreVals = {
  "l1": 2,
  "l2": 3,
  "l3": 4,
  "l4": 5,
  
  "p": 6,
  "n": 4,
  "r": 0
}

var codeText = "";

function beginGame() {
  
  // change the start button to the end button
  var startButton = document.getElementById("starter");
  startButton.innerText = "End Game";
  // pressChange(startButton);
  
  // make the timer visible
  var timer = document.getElementById("timer");
  timer.style.visibility = "visible";
  
  // make the timer start at 0
  var timerDisplay = document.getElementById("timer-display");
  timerDisplay.innerText = 0;
  
  // // make coral points start at 0
  // for (let i = 1; i < 5; i++) {
  //   document.getElementById("l" + i + "-score").innerText = 0;
  // }
  
  // document.getElementById("p-score").innerText = 0;
  // document.getElementById("n-score").innerText = 0;

  // reset the scoring displays
  currentScore = 0;
  document.getElementById('score').innerText = 0;

  let scoreDisplays = document.getElementsByClassName('num-score');
  for (let i = 0; i < scoreDisplays.length; i++) {
    scoreDisplays[i].innerText = 0;
  }
  
  // change game button style to auton
  autonStyle()
  if (!isAuton) {
    switchAuton();
  }
  autonSwitched = false;
  
  // turn off undo mode
  if (undoMode) 
    toggleUndo();
  
  // set autonLeave to false;
  document.getElementById('auton-leave').classList.replace('on', 'off');
  
  // add functionality to the auton switches
  switchOptions = document.getElementById("auton-switch").children;
  switchOptions[0].classList.add("switch-active");
  switchOptions[0].classList.remove('switch-inactive');
  switchOptions[1].classList.add("switch-inactive");
  
  // initialize timer values
  gameTimer = 0;
  gameEnded = false;
  start = Date.now();
  
  // start timer counting
  timerInterval = setInterval(updateTimer, 100)
  start = Date.now();
  
}

function autonStyle() {
  let gameButtons = Array.from(document.getElementsByClassName('inactive'));
  if (gameButtons.length == 0)
    gameButtons = Array.from(document.getElementsByClassName('teleop'));
  
  for (let i = 0; i < gameButtons.length; i++) {
    gameButtons[i].classList.add('auton');
    gameButtons[i].classList.remove('inactive');
    gameButtons[i].classList.remove('teleop');
  }
}

function teleopStyle() {
  let gameButtons = Array.from(document.getElementsByClassName('auton'));
  for (let i = 0; i < gameButtons.length; i++) {
    gameButtons[i].classList.add('teleop');
    gameButtons[i].classList.remove('auton');
  }
}

function inactiveStyle() {
  let gameButtons = Array.from(document.getElementsByClassName('teleop'));
  gameButtons.push(...Array.from(document.getElementsByClassName('auton')));
  
  for (let i = 0; i < gameButtons.length; i++) {
    gameButtons[i].classList.add('inactive');
    gameButtons[i].classList.remove('auton');
    gameButtons[i].classList.remove('teleop');
  }
}

// 
function pressChange(button) {
  let str = "pressed";
  if (Array.from(document.getElementById("algae").children).includes(button))
    str = "pressed-algae";
  button.classList.add(str);
  setTimeout(function() {
    button.classList.remove(str);
  }, 100);
}

function buttonPressed( buttonType ) {
  // get the display for number of times button is pressed
  let score = document.getElementById(`${buttonType}-score`);

  // check if we are adding or subtracting
  if (!undoMode) {
    // add one and append the event
    score.innerText = parseInt(score.innerText) + 1;
    appendEvent(buttonType);

    addScore(buttonType);
  }
  else {
    // check to see if the number of scores is already 0
    if (score.innerText > 0) {
      score.innerText = parseInt(score.innerText) - 1;
      subtractScore(buttonType);
    }
    
    // remove the event from  the qr code
    removeEvent("" + buttonType);
  }
}

// adds an event of the given type to the String used to generate the qr code
function appendEvent(eventType) {
  // add the event type
  codeText += eventType;
  
  // add the current time of the event
  codeText += convert(gameTimer, 2);
}

function subtractScore( scoreType ) {
  if (isAuton) {
    currentScore -= autonScoreVals[scoreType];
  }
  else {
    currentScore -= teleopScoreVals[scoreType];
  }
  
  let scoreDisplay = document.getElementById('score');
  scoreDisplay.innerText = currentScore;
}

function addScore( scoreType ) {
  // check if we are currently in auton
  if (isAuton) {
    currentScore += autonScoreVals[scoreType];
  }
  else {
    currentScore += teleopScoreVals[scoreType];
  }
  
  // update the score display
  let scoreDisplay = document.getElementById('score');
  scoreDisplay.innerText = currentScore;
}

// removes an event of the given type to the String used to generate the qr code
function removeEvent(eventType) {
  // find the last event of the given type
  for (var i = codeText.length - 1; i >= 0; i--) {
    if (codeText.charAt(i) == eventType && i % 3 == 0)  {
      // remove the event
      codeText = codeText.substring(0, i) + codeText.substring(i + 3);
      return;
    }
  }
}

function toggleSwitch(id) {
  // get the two switch options
  activeOption = id.getElementsByClassName("switch-active")[0];
  inactiveOption = id.getElementsByClassName("switch-inactive")[0];
  
  
  activeOption.classList.replace("switch-active", "switch-inactive");
  inactiveOption.classList.replace("switch-inactive", "switch-active");
  
  id.value = inactiveOption.value;
}

function switchAuton() {
  autonSwitched = true;
  // check if we are already in auton
  if (isAuton) {
    // add the event ending auton
    appendEvent("t");
    
    // teleop style
    teleopStyle()
    
    
    isAuton = false;
  }
  else {
    // remove the previous call if we aren't in auton
    removeEvent("t");
    
    autonStyle();
    
    isAuton = true;
  }
  
  // toggle the visual button states
  toggleSwitch(document.getElementById("auton-switch"));
  
}

function toggleUndo() {
  let undoButton = document.getElementById('undo');
  if (undoMode) {
    undoButton.classList.replace('on', 'off');
    document.getElementById('game-buttons').classList.remove('undo-mode');
    undoMode = false;
  }
  else {
    undoButton.classList.replace('off', 'on');
    document.getElementById('game-buttons').classList.add('undo-mode');
    undoMode = true;
  }
}


function endGame() {
  // change the end button to the start button
  var startButton = document.getElementById("starter");
  startButton.innerText = "Start Game";
  
  
  
  // change button styling
  inactiveStyle();
  
  // set auton switch to auton and dectivate it
  let autonSwitch = document.getElementById('auton-switch');
  for (let i = 0; i < autonSwitch.childElementCount; i++) {
    autonSwitch.children[i].classList.remove('switch-active');
    autonSwitch.children[i].classList.add('switch-inactive');
  }
  
  autonSwitch.value = "Auton";
  
  // stop the timer from counting up
  gameEnded = true;
  clearInterval(timerInterval);
}

function updateTimer() {
  // keep track of time elapsed since start
  let delta = Date.now() - start;
  gameTimer = Math.floor(delta / 100);
  
  // update timer display
  var timerElem = document.getElementById("timer-display");
  timerElem.innerText = gameTimer / 10.0;
  
  // check if auton period is over
  if (isAuton && gameTimer > teleopTime && !autonSwitched) {
    switchAuton();
  }
  
  // end the game if it's over
  if (gameTimer >= endTime + 600 || gameEnded) {
    endGame();
  }
}


// const alertText = "Game is not active!";

function gameAlert() {
  alert("Game is not active! Press the start button to begin the game.");
  
  document.getElementById("starter").focus();
}

// event listeners

// alliance switch
var redAlli = document.getElementById("red-alliance");
var blueAlli = document.getElementById("blue-alliance");

// red side
redAlli.addEventListener("click", function () {
  // set red side to active and blue to inactive
  try {
    redAlli.classList.add("switch-active");
    blueAlli.classList.add("switch-inactive");
    redAlli.classList.remove("switch-inactive");
    blueAlli.classList.remove("switch-active");
  }
  finally {
    document.getElementById("alliance-switch").value = "Red";
  }
});

// blue side
blueAlli.addEventListener("click", function () {
  // set blue to active and red to inactive
  try {
    blueAlli.classList.add("switch-active");
    redAlli.classList.add("switch-inactive");
    blueAlli.classList.remove("switch-inactive");
    redAlli.classList.remove("switch-active");
  }
  finally {
    document.getElementById("alliance-switch").value = "Blue";
  }
})

// starter
document.getElementById("starter").addEventListener("click", function () {
  if (gameEnded)
    beginGame();
  else
  endGame();
});

// auton switch
document.getElementById("auton-switch").addEventListener("click", function () {
  if (!gameEnded) 
    switchAuton();
  else
  gameAlert()
})

// auton leave
document.getElementById('auton-leave').addEventListener('click', () => {
  if (!gameEnded) {
    // change the styling 
    let autonLeave = document.getElementById('auton-leave');
    if (autonLeave.classList.contains('on')) {
      autonLeave.classList.remove('on');
      autonLeave.classList.add('off');

      // take away the points recieved
      currentScore -= autonScoreVals["leave"];

      let scoreDisplay = document.getElementById('score');
      scoreDisplay.innerText = currentScore;
    }
    else {
      autonLeave.classList.remove('off');
      autonLeave.classList.add('on');

      // add the points received for leave
      currentScore += autonScoreVals["leave"];

      let scoreDisplay = document.getElementById('score');
      scoreDisplay.innerText = currentScore;
    }


  }
  else {
    gameAlert();
  }
});

// undo button 
document.getElementById('undo').addEventListener('click', () => {
  if (!gameEnded) {
    toggleUndo();
  }
  else {
    gameAlert();
  }
})

// coral buttons
for (let i = 1; i <= 4; i++) {
  document.getElementById("l" + i).addEventListener("click", function() {
    if (!gameEnded) {
      buttonPressed(`l${i}`);
    }
    else {
      gameAlert();
    }
  });
}

// // coral minus buttons
// for (let i = 1; i <= 4; i++) {
//   document.getElementById("minus" + i).addEventListener("click", function() {
//     if (!gameEnded) {
//       // subtract one from the score display
//       let score = document.getElementById("l" + i + "-score");
      
//       // check to see if the number of scores is already 0
//       if (score.innerText > 0) {
//         score.innerText = parseInt(score.innerText) - 1;
//         subtractScore("l" + i);
//       }
      
//       // remove the event from  the qr code
//       removeEvent("" + i);
//     }
//     else {
//       gameAlert()
//     }
//   })
// }

// algae buttons
document.getElementById("processor").addEventListener("click", function () {
  if (!gameEnded) {
    buttonPressed('p');
  }
  else {
    gameAlert();
  }
});

document.getElementById('algae-removed').addEventListener('click', () => {
  if (!gameEnded) {
    buttonPressed('r');
  }
  else {
    gameAlert();
  }
})

document.getElementById("net").addEventListener("click", function () {
  if (!gameEnded) {
    buttonPressed('n');
  }
  else {
    gameAlert();
  }
});

