// Import turn_ons and turn_offs from json file
const turn_ons = await fetch('./turn_ons.json');
const turn_ons_data = await turn_ons.json();
console.log(turn_ons_data);

// API URL
const nameApiUrl = 'https://randomuser.me/api/?nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,mx,nl,nz,us';

// Sim variables
const skinTones = ['light', 'medium light', 'medium dark', 'dark'];
const hairColors = ['blonde', 'ginger', 'brown', 'black'];
const eyeColors = ['light blue', 'dark blue', 'green', 'brown', 'grey'];
const weights = ['medium weight', 'heavy weight'];
const personalityTraits = ['Sloppy/Neat', 'Shy/Outgoing', 'Lazy/Active', 'Serious/Playful', 'Grouchy/Nice'];

// DOM Elements
const genButton = document.getElementById("generate-sim");

// Generate name using API
async function getName() {
  const response = await fetch(nameApiUrl);
  const data = await response.json();
  let first = (data["results"][0]["name"]["first"]);
  let second = (data["results"][0]["name"]["last"]);
  let gender = (data["results"][0]["gender"]);

  return {'name': `${first} ${second}`, 'gender': gender};
}

// Generate appearance (skintone, hair colour, eye colour, weight)
function setAppearance() {
  let skin = skinTones[Math.floor(Math.random() * 4)]; 
  let hair = hairColors[Math.floor(Math.random() * 4)];
  let eye = eyeColors[Math.floor(Math.random() * 5)];
  let weight = weights[Math.floor(Math.random() * 2)];

  return {'skin': skin, 'hair': hair, 'eye-color': eye, 'weight': weight};
}

// Generate personality
function setPersonality() {
  let personality = [5, 5, 5, 5, 5];
  let randamount = Math.floor(Math.random() * 50) + 50;
  for (let i = 0; i < randamount; i++) {
    let r1 = 0;
    let r2 = 0;
    let strength = Math.floor(Math.random() * 3) + 1

    while (r1 == r2 || personality[r1] < strength || personality[r2] > (10 - strength)) {
      r1 = Math.floor(Math.random() * 5);
      r2 = Math.floor(Math.random() * 5);  
    }

    personality[r1] -= strength;
    personality[r2] += strength;
  }

  let personality_obj = {}
  for (let i = 0; i < personality.length; i++) {
    personality_obj[personalityTraits[i]] = personality[i];
  }

  return personality_obj;
}

// Generate attractions
function setAttraction() {
  // Determine categories for turn-ons and turn-off
  let turn_on_keys = Object.keys(turn_ons_data);
  let turn_on_categories = [Math.floor(Math.random() * turn_on_keys.length)];
  while (turn_on_categories.length < 3) {
    let cat = Math.floor(Math.random() * turn_on_keys.length);
    if (!turn_on_categories.includes(cat)) {
      turn_on_categories.push(cat);
    }
  }

  let selections = [];

  for (const cat of turn_on_categories) {
    let options = turn_ons_data[turn_on_keys[cat]];
    let selection = ""
    if (options instanceof Array) {
      selection = options[Math.floor(Math.random() * options.length)];
    } else {
      let option_keys = Object.keys(options);
      selection = options[option_keys[Math.floor(Math.random() * option_keys.length)]];
      selection = selection[Math.floor(Math.random() * selection.length)];
    }
    selections.push(selection);
  }

  return {'turn_ons': [selections[0], selections[1]], 'turn_offs': selections[2]};
}


async function generateSim() {
  console.log(await getName());
  console.log(setAppearance());
  console.log(setPersonality());
  console.log(setAttraction());
}

genButton.addEventListener("click", generateSim);