
// store the currently shown qr code and all stored code values
var codeNumber = 0;
var codes = [];

// create a placeholder qr code

let dimension = Math.min(window.innerWidth, window.innerHeight) / 3;


var qrCode = new QRCode(document.getElementById("qrcode"), {
  width: dimension,
  height: dimension,
  text:""
});

window.addEventListener("resize", function() {
  if (dimension != Math.min(window.innerWidth, window.innerHeight) / 3) {
    dimension = Math.min(window.innerWidth, window.innerHeight) / 3;
    
    // regenerate the current qr code
    showCurrentCode();
  }
})

// generates, stores, and displays a qr code that reflects the current data
function generateCode() {
  // check to see if the form is fully filled out
  let incompleteElem = isCompleted();
  if (incompleteElem != true) {
    alert("Form is not filled out!")
    incompleteElem.focus() 
    return;
  }
  
  // create a string code that represents the form data
  getFormData();
  
  // store the code created with the form data
  codes.push(codeText);
  
  // set the current form displayed to the most recently created one
  codeNumber = codes.length - 1;
  showCurrentCode();
  
  // clear the current code textj
  codeText = "";
}

function isCompleted() {
  // loop through the pregame input
  pregameElem = document.getElementById("pregame")

  for (let i = 0; i < pregameElem.childElementCount; i++) {
    if (pregameElem.children[i].children[1].value == "") {
      return pregameElem.children[i].children[1];
    }
  }

  let allianceSwitch = document.getElementById('alliance-switch');
  if (allianceSwitch.value == "") {
    return allianceSwitch.value;
  }


  return true;
}

// stores the prematch and endgame data into the current code
function getFormData() {
  // get and store the alliance color
  switch(document.getElementById("alliance-switch").value) {
    case "Red":
      codeText = 'r' + codeText;
      break;

    case "Blue":
      codeText = 'b' + codeText;
      break;
  }

  // get and store the auton leave status
  if (document.getElementById('auton-leave').classList.contains('on')) {
    codeText = "y" + codeText;
  }
  else {
    codeText = "n" + codeText;
  }

  // get and store the team value
  let hexString = convert(parseInt(document.getElementById("team").value), 3);
  codeText = hexString + codeText;

  // get and store the match value
  hexString = convert(parseInt(document.getElementById("match").value), 1);
  codeText = hexString + codeText;

  // get and store the scout's initals
  hexString = document.getElementById("scout-id").value.toUpperCase().slice(0, 3);
  codeText = hexString + codeText;


  // convert the end position to to a hex string
  switch (document.getElementById("position-select").options[document.getElementById("position-select").selectedIndex].value) {
    case "none":
      hexString = 'x';
      break;

    case "deep":
      hexString = 'd';
      break;

    case "shallow":
      hexString = 's';
      break;

    case "park":
      hexString = 'k';
      break;   
  }

  // store the value
  codeText += hexString;

  // get the strength display
  var display = document.getElementById("strength-display");

  // loop through the selected strengths and store them
  for (let i = 0; i < display.childElementCount; i++) {
    codeText += convert(parseInt(display.children[i].id), 1);
  }

  // get the weakness display
  display = document.getElementById("weakness-display");

  // loop through the selected weaknesses and store them
  for (let i = 0; i < display.childElementCount; i++) {
    codeText += convert(parseInt(display.children[i].id), 1);
  }
}

function decode(basedString) {
  // Define the base 91 character set
  const base91Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\\";

  // Create a map to quickly look up the index of each character
  const charToValue = {};
  for (let i = 0; i < base91Chars.length; i++) {
    charToValue[base91Chars[i]] = i;
  }

  let num = 0;
  let power = 1;

  // Iterate over the string in reverse order
  for (let i = basedString.length - 1; i >= 0; i--) {
    const char = basedString[i];
    if (charToValue.hasOwnProperty(char)) {
      num += charToValue[char] * power;
      power *= 91;
    } else {
      // Handle invalid characters (optional)
      throw new Error(`Invalid character in base91 string: ${char}`);
    }
  }

  return num;
}

// displays the stored qr code of the given number on the page
function showCurrentCode() {
  // remove the previous qr code
  document.getElementById("qrcode").innerText = "";

  // remove code information
  document.getElementById("code-info").style.visibility = "hidden";
  document.getElementById("code-team").innerText = "";
  document.getElementById("code-match").innerText = "";

  
  // check if there is a qr code to display
  if (codes.length != 0) {
    // create a new qr code with the updated dimensions
    qrCode = new QRCode(document.getElementById("qrcode"), {
      width: dimension,
      height: dimension,
      text: codes[codeNumber]
    });
    
    // obtain team and match numbers after decoding the current qrcode
    matchInfo = decode(codes[codeNumber].slice(3, 4));
    teamInfo = decode(codes[codeNumber].slice(5, 7));
    console.log(matchInfo + " " + teamInfo);

    // display team and match numbers
    document.getElementById("code-info").style.visibility = "visible";
    document.getElementById("code-team").innerText = "Team: " + teamInfo;
    document.getElementById("code-match").innerText = "Match: " + matchInfo;

    // add the event listener to the qr code
    document.getElementById("qrcode").childNodes.item(1).addEventListener("click", function () {
      enlargen();
    });
  }
}

// converts the given number into a base 91 string of the given length
function convert(convertNum, minLength) {
  // ensure that the value passed is an integer
  convertNum = parseInt(convertNum);

  // create a place to store the converted value
  let basedString = "";

  // create an array to pull values from 
  const base91Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\\";

  // handle zero
  if (convertNum == 0 || convertNum == NaN) 
      return 'A';

  // convert number into base 91
  while (convertNum > 0) {
      basedString = base91Chars[convertNum % 91] + basedString;
      
      convertNum = Math.floor(convertNum / 91);
  }   

  // add leading 'zeroes' if length is less than minLength
  while (basedString.length < minLength) {
      basedString = 'A' + basedString;
  }

  return basedString;
}

// make a larger qr code in the center of the screen
function enlargen() {
  // create the new code 
  larger_qrcode = new QRCode( document.getElementById("large-qr"), {
    width: dimension * 2,
    height: dimension * 2,
    text: codes[codeNumber]
  });

  // cover the rest of the screen in a white tint
  let container = document.getElementById("large-container");
  container.style.visibility = "visible";
  container.style.display = "flex";
  container.classList.add("cont");

  // if anywhere else is clicked, remove the tint and the qr code
  container.addEventListener("click", function() {
    container.style.visibility = "hidden";
    container.style.display = "none";
    container.classList.remove("cont");

    document.getElementById("large-qr").innerText = "";
  });
}

// submit button
document.getElementById("submit").addEventListener("click", function () {
  // create the new code
  generateCode();
  
  // show the code
  document.getElementById("qrcode").style.visibility = "visible";
  
  // display the previous button if needed
  if (codeNumber != 0) 
    document.getElementById("previous").style.visibility = "visible";
  
});

// previous button
document.getElementById("previous").addEventListener("click", function () {
  // go back one code in the list
  codeNumber--;
  
  // regenerate the current code
  showCurrentCode();
  
  // make the next button visible
  document.getElementById("next").style.visibility = "visible";
  
  // check if previous should remain visible
  if (codeNumber == 0) {
    document.getElementById("previous").style.visibility = "hidden";
  }
});

// next button
document.getElementById("next").addEventListener("click", function () {
  // go forward one code in the list
  codeNumber++;
  
  // regenerate the current code
  showCurrentCode();
  
  // make the previous button visible
  document.getElementById("previous").style.visibility = "visible";
  
  // check if next should remain visible
  if (codeNumber == codes.length - 1) {
    document.getElementById("next").style.visibility = "hidden";
  }
});

document.getElementById("qrcode").childNodes.item(1).addEventListener("click", function () {
  // make the qr code bigger
  enlargen();
});