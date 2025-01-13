
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
  
  // create a string to store the form data
  var codeText = "";
  
  // store the form data
  for (let i = 1; i < 3; i++) {
    var temp = document.getElementById("data" + i).value;
    
    codeText += temp + " ";
  }
  
  // store the form data 
  codes.push(codeText)
  
  // set the current form displayed to the most recently created one
  codeNumber = codes.length - 1;
  showCurrentCode();
}

// displays the stored qr code of the given number on the page
function showCurrentCode() {
  // make sure that the qr code exists 
  if (codeNumber < 0 || codeNumber >= codes.length) return;
  // remove the previous QR code
  
  // add the code of the given number to the page
  qrCode.makeCode(codes[codeNumber]);
}

// create event listeners

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