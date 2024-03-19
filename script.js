const genButton = document.getElementById("generate-sim");
const simInfo = document.getElementById("sim-info");
const skinTones = ['light', 'medium light', 'medium dark', 'dark'];
const hairColors = ['blonde', 'ginger', 'brown', 'black'];
const eyeColors = ['light blue', 'dark blue', 'green', 'brown', 'grey'];

function generateAppearance() {
  let skin = skinTones[Math.floor(Math.random() * 4)]; 
  let hair = hairColors[Math.floor(Math.random() * 4)];
  let eye = eyeColors[Math.floor(Math.random() * 5)];

  return [`Skin tone: ${skin}`, `Hair color: ${hair}`, `Eye color: ${eye}`];
}

function clearPrevious() {
  let prevGenInfo = document.getElementById('generated-info');
  if (prevGenInfo != null) {
    simInfo.removeChild(prevGenInfo);
  }
}

function generateSim() {
  clearPrevious();

  let appearance = generateAppearance();

  let infoContainer = document.createElement("div");
  infoContainer.id = "generated-info";

  for (let i = 0; i < appearance.length; i++) {
    let node = document.createElement("p");
    node.innerText = appearance[i];
    infoContainer.append(node);
  }

  simInfo.append(infoContainer);
}

genButton.addEventListener("click", generateSim)