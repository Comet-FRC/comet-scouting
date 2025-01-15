var tags = [];
var tagsExpanded = false;

// tags button
document.getElementById("tag-select").addEventListener("click", function () {
  
  // show the different tag options
  var tagSelect = document.getElementById("tag-options");
  tagSelect.removeAttribute("hidden");
  tagSelect.size = tagSelect.length;
  
  // expand or contract the tags 
  if (tagsExpanded) {
    tagSelect.hidden = true;
  }
  
  tagsExpanded = !tagsExpanded;
  
  
  // record options when clicked
  tagSelect.addEventListener("click", function () {
    // store the option clicked
    let temp = tagSelect.options[tagSelect.selectedIndex].text;
    
    // check if the option clicked has already been tagged
    if (tags.includes(temp)) {
      // remove it if it does
      let matchesTemp = (element) => element == temp;
      tags.splice(tags.findIndex(matchesTemp), 1);
      
      // mark the tag as untagged
      tagSelect.options[tagSelect.selectedIndex].removeAttribute("class");
    }
    else {
      // otherwise store it in tags
      tags.push(temp);
      
      // mark the selected tag as tagged
      tagSelect.options[tagSelect.selectedIndex].className = "tagged";
    }
    
    // clear currently shown tags
    var tagDisplay = document.getElementById("selected-tags");
    tagDisplay.innerText = "";
    
    
    // get the locations of elements
    let indices = Object.keys(tags);
    
    // for each element add the item to the displayed tags
    indices.forEach(function(item) {
      let elem = document.createElement("span");
      elem.innerText = tags[item];
      
      tagDisplay.appendChild(elem);
    });

    // if there are no tags display "None"
    if (tagDisplay.innerText == "") {
      let elem = document.createElement("span");
      elem.innerText = "None";

      tagDisplay.appendChild(elem);
    }
  });
});

// check if the tags are expanded
if (tagsExpanded) {
  // check if the document is clicked anywhere else
  document.addEventListener("click", event => {
    let isClickInside = document.getElementById("tag-options").contains(event.target);
    
    if (!isClickInside) {
      tagsExpanded = false;
      document.getElementById("tag-options").hidden = "true";
    }
  })
}