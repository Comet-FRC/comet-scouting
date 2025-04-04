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

// ensure that the form is fully filled out
document.getElementById('upload').addEventListener('click', function (event) {
  if (document.getElementById('upload-code').value == '') {
    event.preventDefault();

    document.getElementById('submit').focus();
    alert("Please create a qr code before attempting to upload data!");
  }
});

// form data upload
document.getElementById('upload-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const jsonObject = Object.fromEntries(formData.entries());

  jsonObject.team = Number.parseInt(document.getElementById('team').value);
  jsonObject.match = Number.parseInt(document.getElementById('match').value);

  const response = await fetch("https://ohrghyoie8.execute-api.us-east-1.amazonaws.com/comet-scouting/submit", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(jsonObject),
  });

  if (response.ok) {
    alert("Form submitted successfully");
  }
  else {
    alert("Error submitting form");
    console.log(response.status);
    console.log(response.statusText);
  }
});
