window.addEventListener("load", start);

var rangers = Array.from(document.querySelectorAll(".powerRanger"));

function start() {
  for (var i = 0; i < rangers.length; i++) {
    rangers[i].addEventListener("change", changeController);
  }
}

function changeController() {
  setColor(rangers[0].value, rangers[1].value, rangers[2].value);
  setInputValues();
}

function setColor(redValue, greenValue, blueValue) {
  var colorViewer = document.querySelector("#colorViewer");
  colorViewer.style.backgroundColor = `rgba(${redValue}, ${greenValue}, ${blueValue})`;
}

function setInputValues() {
  var rangerViewers = Array.from(document.querySelectorAll(".rangeViewer"));
  for (let i = 0; i < rangerViewers.length; i++) {
    rangerViewers[i].value = rangers[i].value;
  }
}
