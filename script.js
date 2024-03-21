const genButton = document.getElementById("generate-sim");
const skinTones = ['light', 'medium light', 'medium dark', 'dark'];
const hairColors = ['blonde', 'ginger', 'brown', 'black'];
const eyeColors = ['light blue', 'dark blue', 'green', 'brown', 'grey'];
const weights = ['medium weight', 'heavy weight']
const nameApiUrl = 'https://randomuser.me/api/?nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,mx,nl,nz,us'

let simInfo;
clearPrevious();

function generateAppearance() {
  let skin = skinTones[Math.floor(Math.random() * 4)]; 
  let hair = hairColors[Math.floor(Math.random() * 4)];
  let eye = eyeColors[Math.floor(Math.random() * 5)];
  let weight = weights[Math.floor(Math.random() * 2)];

  return [`Skin tone: ${skin}`, `Hair color: ${hair}`, `Eye color: ${eye}`, `${weight}`];
}

function clearPrevious() {
  if (typeof simInfo !== 'undefined') {
    simInfo.remove();
  }
  simInfo = document.createElement("article");
  simInfo.id = "sim-info";
  document.body.appendChild(simInfo);
}

async function getName() {
  const response = await fetch(nameApiUrl);
  const data = await response.json();
  let first = (data["results"][0]["name"]["first"]);
  let second = (data["results"][0]["name"]["last"]);
  let gender = (data["results"][0]["gender"]);
  return `${first} ${second} (${gender})`;
}

async function generateSim() {
  clearPrevious();

  let infoContainer = document.createElement("div");
  infoContainer.id = "generated-info";

  let name = document.createElement("h2");
  name.innerText = await getName();
  infoContainer.append(name);
  simInfo.append(infoContainer);

  let appearance = generateAppearance();
  for (let i = 0; i < appearance.length; i++) {
    let node = document.createElement("p");
    node.innerText = appearance[i];
    infoContainer.append(node);
  }

}

genButton.addEventListener("click", generateSim);