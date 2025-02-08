var gameTimer = 0;
const endTime = 1500;
const teleopTime = 150;
var gameEnded = true;
var isAuton = true;
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

  document.getElementById("p-score").innerText = 0;
  document.getElementById("n-score").innerText = 0;

  // make auton active and teleop deactive

  // add functionality to the auton switches
  switchOptions = document.getElementById("auton-switch").children;
  switchOptions[0].classList.add("switch-active");
  switchOptions[1].classList.add("switch-inactive");

  // initialize timer values
  gameTimer = 0;
  gameEnded = false;
  start = Date.now();
  
  // start timer counting
  timerInterval = setInterval(updateTimer, 100)
  start = Date.now();
  
}

function pressChange(button) {
    let str = "pressed";
    if (Array.from(document.getElementById("algae").children).includes(button))
      str = "pressed-algae";
    button.classList.add(str);
    setTimeout(function() {
      button.classList.remove(str);
    }, 100);
}

// adds an event of the given type to the String used to generate the qr code
function appendEvent(eventType) {
  // add the event type
  codeText += eventType;
  
  // add the current time of the event
  codeText += convert(gameTimer, 2);
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
  // check if we are already in auton
  if (isAuton) {
    // add the event ending auton
    appendEvent("t");
    
    
    isAuton = false;
  }
  else {
    // remove the previous call if we aren't in auton
    removeEvent("t");
    
    isAuton = true;
  }

  // toggle the visual button states
  toggleSwitch(document.getElementById("auton-switch"));

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

  // check if auton period is over
  if (isAuton && gameTimer > teleopTime) {
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
  // check if either option has been clicked yet
  // if (blueAlli.classList.contains("switch-active") || redAlli.classList.contains("switch-active")) {
  //   toggleSwitch(document.getElementById("alliance-switch"));
  // }
  // else {
  //   redAlli.classList.replace("switch-inactive", "switch-active");
  // }

  // set the currenlt 
  try {
    redAlli.classList.replace("switch-inactive", "switch-active");
    blueAlli.classList.replace("switch-active", "switch-inactive");
  }
  finally {
    document.getElementById("alliance-switch").value = "Red";
  }
});

// blue side
blueAlli.addEventListener("click", function () {
  // check if either option has been clicked 
  // if (redAlli.classList.contains("switch-active") || blueAlli.classList.contains("switch-active")) {
  //   toggleSwitch(document.getElementById("alliance-switch"));
  // }
  // else {
  //   blueAlli.classList.replace("switch-inactive", "switch-active");
  // }

  // try to replace the current inactive and inactive tags 
  try {
    blueAlli.classList.replace("switch-inactive", "switch-active");
    redAlli.classList.replace("switch-active", "switch-inactive");
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

// coral buttons
for (let i = 1; i <= 4; i++) {
  document.getElementById("l" + i).addEventListener("click", function() {
    if (!gameEnded) {
      score = document.getElementById("l" + i + "-score");
      score.innerText = parseInt(score.innerText) + 1;
      appendEvent(i);
      pressChange(document.getElementById("l" + i)); // color change
    }
    else {
      gameAlert()
    }
  });
}

// coral minus buttons
for (let i = 1; i <= 4; i++) {
  document.getElementById("minus" + i).addEventListener("click", function() {
    if (!gameEnded) {
      // subtract one from the score display
      score = document.getElementById("l" + i + "-score");
      score.innerText = Math.max(parseInt(score.innerText) - 1, 0);
      
      // remove the event from  the qr code
      removeEvent("" + i);
    }
    else {
      gameAlert()
    }
  })
}

// algae buttons
document.getElementById("processor").addEventListener("click", function () {
  if (!gameEnded) {
    appendEvent('p');
    score = document.getElementById("p-score");
    score.innerText = parseInt(score.innerText) + 1;
    pressChange(document.getElementById("processor"));
  }
  else {
    gameAlert()
  }
});

document.getElementById("net").addEventListener("click", function () {
  if (!gameEnded) {
    appendEvent('n');
    score = document.getElementById("n-score");
    score.innerText = parseInt(score.innerText) + 1;
    pressChange(document.getElementById("net"));
  }
  else {
    gameAlert()
  }
});