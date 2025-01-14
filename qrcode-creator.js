
// store the currently shown qr code and all stored code values
var codeNumber = 0;
var codes = [];

// create a placeholder qr code 

var qrCode = new QRCode(document.getElementById("qrcode"), {
  width:150,
  height:150,
  text:""
});

// generates, stores, and displays a qr code that reflects the current data
function generateCode() {
  
  // create a string code that represents the form data
  getFormData();
  
  // store the code created with the form data
  codes.push(codeText)
  
  // set the current form displayed to the most recently created one
  codeNumber = codes.length - 1;
  showCurrentCode();
  
  // clear the current code text
  codeText = "";
}

// stores the prematch and endgame data into the current code
function getFormData() {
  // get the team value
  let temp = parseInt(document.getElementById("team").value);
  
  // store the team value
  let hexString = convert(temp, 1);
  codeText = hexString + codeText;

  // get the match value
  temp = parseInt(document.getElementById("match").value);

  // store the match value
  hexString = convert(temp, 2);
  codeText = hexString + codeText;
}

// displays the stored qr code of the given number on the page
function showCurrentCode() {
  // make sure that the qr code exists 
  if (codeNumber < 0 || codeNumber >= codes.length) return;
  // remove the previous QR code
  
  // add the code of the given number to the page
  qrCode.makeCode(codes[codeNumber]);
}

function convert(convertNum, minLength) {
  // ensure that the value passed is an integer
  convertNum = parseInt(convertNum);

  // create a place to store the converted value
  let basedString = "";

  // create an array to pull values from 
  const base128Chars = Array.from({ length: 128 }, (_, i) => String.fromCharCode(i));

  // handle zero
  if (convertNum == 0 || convertNum == NaN) 
      return '\0';

  // convert number into base 128
  while (convertNum > 0) {
      basedString = base128Chars[convertNum % 128] + basedString;
      
      convertNum = Math.floor(convertNum / 128);
  }   

  // add leading 'zeroes' if length is less than minLength
  while (basedString.length < minLength) {
      basedString = "\0" + basedString;
  }

  return basedString;
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