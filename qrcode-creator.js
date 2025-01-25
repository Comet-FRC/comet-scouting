
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
    
    // remove the previous qr code
    document.getElementById("qrcode").innerText = "";
  
    // check if there is a qr code to display
    if (codes.length != 0) {
      // create a new qr code with the updated dimensions
      qrCode = new QRCode(document.getElementById("qrcode"), {
        width: dimension,
        height: dimension,
        text: codes[codeNumber]
      });
    }

    document.getElementById("qrcode").childNodes.item(1).addEventListener("click", function () {
      // copy the current qr code to the clipboard
      enlargen();
    });
  }
})

// generates, stores, and displays a qr code that reflects the current data
function generateCode() {
  
  // create a string code that represents the form data
  getFormData();
  
  // store the code created with the form data
  codes.push(codeText);
  
  // set the current form displayed to the most recently created one
  codeNumber = codes.length - 1;
  showCurrentCode();
  
  // clear the current code text
  codeText = "";
}

// stores the prematch and endgame data into the current code
function getFormData() {
  // get and store the team value
  let hexString = convert(parseInt(document.getElementById("team").value), 3);
  codeText = hexString + codeText;

  // get and store the match value
  hexString = convert(parseInt(document.getElementById("match").value), 1);
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

// displays the stored qr code of the given number on the page
function showCurrentCode() {
  // make sure that the qr code exists 
  if (codeNumber < 0 || codeNumber >= codes.length) return;
  // remove the previous QR code
  
  // add the code of the given number to the page
  qrCode.makeCode(codes[codeNumber]);
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
      console.log(basedString);
      basedString = 'A' + basedString;
  }

  return basedString;
}

function enlargen() {
  larger_qrcode = new QRCode( document.getElementById("large-qr"), {
    width: dimension * 2,
    height: dimension * 2,
    text: codes[codeNumber]
  });
  let container = document.getElementById("large-container");
  container.style.visibility = "visible";
  container.style.display = "flex";
  container.classList.add("cont");

  container.addEventListener("click", function() {
    console.log("HI");
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
  // copy the current qr code to the clipboard
  enlargen();
});