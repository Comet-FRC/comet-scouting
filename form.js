// tags button 
document.getElementById("strength-button").addEventListener("click", function () {
  let strengthList = document.getElementById("strength-list");
  strengthList.classList.toggle("show");
});

// check if anywhere else is clicked
window.onclick = function(event) {
  console.log(event.target.id + " clicked!");
  if (!event.target.matches('#strength-button')) {
    let dropdown = document.getElementById("strength-list");

    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  }
};