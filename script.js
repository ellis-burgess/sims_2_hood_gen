const turn_ons = await fetch('./turn_ons.json');
const turn_ons_data = await turn_ons.json();
console.log(turn_ons_data);

const genButton = document.getElementById("generate-sim");
const resetButton = document.getElementById("clear-sims");
const skinTones = ['light', 'medium light', 'medium dark', 'dark'];
const hairColors = ['blonde', 'ginger', 'brown', 'black'];
const eyeColors = ['light blue', 'dark blue', 'green', 'brown', 'grey'];
const weights = ['medium weight', 'heavy weight'];
const personalityTraits = ['Sloppy/Neat', 'Shy/Outgoing', 'Lazy/Active', 'Serious/Playful', 'Grouchy/Nice'];
const nameApiUrl = 'https://randomuser.me/api/?nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,mx,nl,nz,us';

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

function setPersonality() {
  let personality = [5, 5, 5, 5, 5];
  let randamount = Math.floor(Math.random() * 50) + 50;
  for (let i = 0; i < randamount; i++) {
    let r1 = 0;
    let r2 = 0;

    while (r1 == r2 || personality[r1] == 0 || personality[r2] == 10) {
      r1 = Math.floor(Math.random() * 5);
      r2 = Math.floor(Math.random() * 5);  
    }

    personality[r1] -= 1;
    personality[r2] += 1;
  }
  return personality;
}

function setAttraction() {

}

function createSectionDisplay(title, className, subheadings = null) {
  let container = document.createElement("section");
  container.classList.add(className);
  let containerTitle = document.createElement("h3");
  containerTitle.innerText = title;
  container.appendChild(containerTitle);
  if (subheadings != null) {
    for (let i = 0; i < subheadings.length; i++) {
      let subList = document.createElement("ul");
      subList.classList.add(subheadings[i].toLowerCase());
      let subListTitle = document.createElement("h4");
      subListTitle.innerText = subheadings[i];
      container.appendChild(subListTitle);
      container.appendChild(subList);
    }
  } else {
    let list = document.createElement("ul");
    container.appendChild(list)
  }

  return container;
}

function createSimDisplay(parent) {
  let appearanceContainer = createSectionDisplay("Appearance", "appearance-info");
  let personalityContainer = createSectionDisplay("Personality", "personality-info");
  let attractionContainer = createSectionDisplay("Turn-Ons and Turn-Offs", "attraction-info", ["Turn-ons", "Turn-offs"]);

  parent.appendChild(appearanceContainer);
  parent.appendChild(personalityContainer);
  parent.appendChild(attractionContainer);

  return [appearanceContainer.getElementsByTagName('ul')[0], personalityContainer.getElementsByTagName('ul')[0]];
}

async function generateSim() {
  let name = document.createElement("h2");
  name.innerText = await getName();
  simInfo.appendChild(name);

  let displayLists = createSimDisplay(simInfo);

  let appearance = generateAppearance();
  for (let i = 0; i < appearance.length; i++) {
    let node = document.createElement("li");
    node.innerText = appearance[i];
    displayLists[0].appendChild(node);
  }

  let personality = setPersonality();
  for (let i = 0; i < personality.length; i++) {
    let node = document.createElement("li");
    node.innerText = `${personalityTraits[i]}: ${personality[i]}`;
    displayLists[1].appendChild(node);
  }
}

genButton.addEventListener("click", generateSim);
resetButton.addEventListener("click", clearPrevious);