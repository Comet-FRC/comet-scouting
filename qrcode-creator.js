
// store the currently shown qr code and all stored code values
var codeNumber = 0;
var codes = [];

// create a placeholder qr code 

var qrCode = new QRCode(document.getElementById("qrcode"), {
  width:window.innerWidth / 4,
  height:window.innerWidth / 4,
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
    showCode(codes.length - 1);
  }
  
  // displays the stored qr code of the given number on the page
  function showCode(number) {
    // make sure that the qr code exists 
    if (number < 0 || number >= codes.length) return;
    // remove the previous QR code
    
    // add the code of the given number to the page
    qrCode.makeCode(codes[number]);
  }
  
  // create event listeners
  

  // submit button
  document.getElementById("submit").addEventListener("click", function () {
    // create the new code
    generateCode();
    
    // show the code and submit button
    document.getElementById("codes").style.visibility = "visible";
  });