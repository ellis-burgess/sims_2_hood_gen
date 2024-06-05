// Import turn ons and turn offs from json file
const turnOns = await fetch('./turn_ons.json');
const turnOnsData = await turnOns.json();
console.log(turnOnsData);

// API URL
const nameApiUrl =
  'https://randomuser.me/api/?nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,mx,nl,nz,us';

// Sim variables
const skinTones = ['light', 'medium light', 'medium dark', 'dark'];
const hairColors = ['blonde', 'ginger', 'brown', 'black'];
const eyeColors = ['light blue', 'dark blue', 'green', 'brown', 'grey'];
const weights = ['medium weight', 'heavy weight'];
const personalityTraits = [
  'Sloppy/Neat', 'Shy/Outgoing', 'Lazy/Active', 'Serious/Playful',
  'Grouchy/Nice'
];

// DOM Elements
const genButton = document.getElementById("generate-sim");

// Sim class

class Sim {
  constructor(name, appearance, personality, attractions) {
    this.firstName = name['firstName'];
    this.surname = name['secondName'];
    this.gender = name['gender'];

    this.skintone = appearance['skin'];
    this.hairColor = appearance['hairColor'];
    this.eyeColor = appearance['eyeColor'];
    this.weight = appearance['weight'];

    this.personality = personality;

    this.attractions = attractions;
  }
}

// Generate name using API
async function getName() {
  const response = await fetch(nameApiUrl);
  const data = await response.json();
  let first = (data["results"][0]["name"]["first"]);
  let second = (data["results"][0]["name"]["last"]);
  let gender = (data["results"][0]["gender"]);

  return {'firstName': first, 'secondName': second, 'gender': gender};
}

// Generate appearance (skintone, hair colour, eye colour, weight)
function setAppearance() {
  let skin = skinTones[Math.floor(Math.random() * 4)]; 
  let hair = hairColors[Math.floor(Math.random() * 4)];
  let eye = eyeColors[Math.floor(Math.random() * 5)];
  let weight = weights[Math.floor(Math.random() * 2)];

  return {'skin': skin, 'hairColor': hair, 'eyeColor': eye, 'weight': weight};
}

// Generate personality
function setPersonality() {
  let personality = [5, 5, 5, 5, 5];
  let randamount = Math.floor(Math.random() * 50) + 50;
  for (let i = 0; i < randamount; i++) {
    let r1 = 0;
    let r2 = 0;
    let strength = Math.floor(Math.random() * 3) + 1

    while (
      r1 == r2 ||
      personality[r1] < strength ||
      personality[r2] > (10 - strength)
    ) {
      r1 = Math.floor(Math.random() * 5);
      r2 = Math.floor(Math.random() * 5);  
    }

    personality[r1] -= strength;
    personality[r2] += strength;
  }

  let personalityObj = {}
  for (let i = 0; i < personality.length; i++) {
    personalityObj[personalityTraits[i]] = personality[i];
  }

  return personalityObj;
}

// Generate attractions
function setAttraction() {
  // Determine categories for turn-ons and turn-off
  let turnOnKeys = Object.keys(turnOnsData);
  let turnOnCategories = [Math.floor(Math.random() * turnOnKeys.length)];
  while (turnOnCategories.length < 3) {
    let cat = Math.floor(Math.random() * turnOnKeys.length);
    if (!turnOnCategories.includes(cat)) {
      turnOnCategories.push(cat);
    }
  }

  let selections = [];

  for (const cat of turnOnCategories) {
    let options = turnOnsData[turnOnKeys[cat]];
    let selection = ""
    if (options instanceof Array) {
      selection = options[Math.floor(Math.random() * options.length)];
    } else {
      let optionKeys = Object.keys(options);
      selection =
        options[optionKeys[Math.floor(Math.random() * optionKeys.length)]];
      selection = selection[Math.floor(Math.random() * selection.length)];
    }
    selections.push(selection);
  }

  return {'turnOns': [selections[0], selections[1]], 'turnOffs': selections[2]};
}


async function generateSim() {
  let name = (await getName());
  let appearance = (setAppearance());
  let personality = (setPersonality());
  let attraction = (setAttraction());
  let newSim = new Sim(name, appearance, personality, attraction);
  console.log(newSim);
}

genButton.addEventListener("click", generateSim);