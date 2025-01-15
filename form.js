

// tags button
document.getElementById("tag-select").addEventListener("click", function () {
  
  // show the different tag options
  var tagSelect = document.getElementById("tag-options");
  tagSelect.removeAttribute("hidden");
  tagSelect.size = tagSelect.length;
  
  // record options when clicked
  tagSelect.addEventListener("click", function () {
    
    var tagDisplay = document.getElementById("selected-tags");
    tagDisplay.innerText += (tagSelect.value + " ");
  });
});