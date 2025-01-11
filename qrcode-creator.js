var codeNumber = 0;
var codes = ["Something"];

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
    // showCode(codes.length - 1);



    // add the form data to the page 
    var qrElem = document.getElementById("qrcode");
    var qrCode = new QRCode(qrElem, { 
      width:window.innerWidth / 4,
      height:window.innerWidth / 4,
      text:codeText
    });
}

// displays the stored qr code of the given number on the page
function showCode(number) {
    // make sure that the qr code exists 
    if (number < 0 || number >= codes.length)
    // remove the previous QR code

    // add the code of the given number to the page
    var qrElem = document.getElementById("qrcode");
    var qrCode = new QRCode(qrElem, {
        width:window.innerWidth / 4,
        height:window.innerWidth / 4,
        text:codes[number]
    });
}