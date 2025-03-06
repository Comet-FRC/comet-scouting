// b1 buttons
for (let i = 0; i < document.getElementsByClassName('b1').length; i++) {
  // add event listeners for when clicked
  let buttonElem = document.getElementsByClassName('b1')[i];

  buttonElem.addEventListener('mousedown', buttonDown = () => {
    buttonElem.classList.add('clicked');
    // console.log("Mouse Down!");

    buttonElem.addEventListener('mouseleave', buttonLeave = () => {
      buttonElem.classList.remove('clicked');
      // console.log("Mouse Left!");

      buttonElem.removeEventListener('mouseleave', buttonLeave);
      buttonElem.removeEventListener('mouseup', buttonUp);
    });

    buttonElem.addEventListener('mouseup', buttonUp = () => {
      buttonElem.classList.remove('clicked');
      // console.log("Mouse Up!");

      buttonElem.removeEventListener('mouseup', buttonUp);
      buttonElem.removeEventListener('mouseleave', buttonLeave);
    });
  });
}


// game buttons
let gameButtons = document.getElementById('game-buttons').getElementsByTagName('button');
for (let i = 0; i < gameButtons.length; i++) {
  // add event listeners for click events
  let buttonElem = gameButtons[i];

  buttonElem.addEventListener('mousedown', buttonDown = () => {
    buttonElem.classList.add('clicked');

    buttonElem.addEventListener('mouseleave', buttonLeave = () => {
      buttonElem.classList.remove('clicked');

      buttonElem.removeEventListener('mouseleave', buttonLeave);
      buttonElem.removeEventListener('mouseup', buttonUp);
    });

    buttonElem.addEventListener('mouseup', buttonUp = () => {
      buttonElem.classList.remove('clicked');

      buttonElem.removeEventListener('mouseup', buttonUp);
      buttonElem.removeEventListener('mouseleave', buttonLeave);
    });
  })
}

function addListeners(elementArr, eventType, eventFunction) {
  for (let i = 0; i < elementArr.length; i++) {
    elementArr.addEventListener(eventType, eventFunction);
  }
}

// number inputs
let inputElems = document.getElementsByTagName('input');
for (let i = 0; i < inputElems.length; i++) {
  if (inputElems[i].type == 'number') {
    inputElems[i].addEventListener('blur', checkInput = () => {
      if (inputElems[i].value != "" && (parseInt(inputElems[i].value) < inputElems[i].min || parseInt(inputElems[i].value) > inputElems[i].max)) {
        alert(`Invalid input! Must be between ${inputElems[i].min} and ${inputElems[i].max}`);
      }
    })
  }
}