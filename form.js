// get all dropdowns in the document
var dropdowns = document.getElementsByClassName("tag-dropdown");

function addTag(dropdownItem) {
  // create a variable to store the display that corresponds to this element
  let myDisplay = null;
  
  // find it
  let displays = document.getElementsByClassName("tag-display");
  for (let i = 0; i < displays.length; i++) {
    // check if the current item is the same type as the 
    if (displays.item(i).getAttribute("type") == dropdownItem.parentElement.getAttribute("type")) {
      myDisplay = displays.item(i);
    }
  }

  // move the element to the display we just found
  myDisplay.appendChild(dropdownItem);

  // update the event listener
  dropdownItem.removeEventListener("click", function () { addTag(tag) });
  dropdownItem.addEventListener("click", function () { removeTag(dropdownItem) })
}

function removeTag(tag) {
  // create a variable to store the dropdown that corresponds to this element
  let myDropdown = null;

  // find it
  for (let i = 0; i < dropdowns.length; i++) {
    if (dropdowns.item(i).getAttribute("type") == tag.parentElement.getAttribute("type")) {
      myDropdown = dropdowns.item(i);
    }
  }

  // move the element to the display we just found
  myDropdown.appendChild(tag);

  // update the event listener
  tag.removeEventListener("click", function () { removeTag(dropdownItem) });
  tag.addEventListener("click", function () { addTag(tag) })
}

function showDropdown(currentButton) {
  for (let i = 0; i < dropdowns.length; i++) {
    if (dropdowns.item(i).getAttribute("type") == currentButton.getAttribute("type")) {
      dropdowns.item(i).classList.toggle("show");
    }
  }
}

// tag buttons 
for (let i = 0; i < document.getElementsByClassName("tag-button").length; i++) {
  // get the current button
  let currentButton = document.getElementsByClassName("tag-button").item(i);
  currentButton.addEventListener("click", function () { showDropdown(currentButton) });
}

// add event listeners to all dropdown items
for (let i = 0; i < dropdowns.length; i++) {
  for (let j = 0; j < dropdowns.item(i).childNodes.length; j++) {
    let dropdownItem = dropdowns.item(i).childNodes.item(j);
    dropdownItem.addEventListener("click", function () { addTag(dropdownItem) });
  }
}

// check if anywhere else is clicked
window.onclick = function(event) {
  if (!event.target.matches('.tag-button')) {
    // loop through all dropdowns in the document
    for (let i = 0; i < dropdowns.length; i++) {
      // if the dropdown is shown hide it
      if (dropdowns.item(i).classList.contains("show")) {
        dropdowns.item(i).classList.remove("show");
      }
    }
  }
};