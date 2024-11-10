//query selectors
const form = document.querySelector('.my-form');
const question = document.querySelector('.question');
const birthYear = document.querySelector('#birth-year');

//event listeners
form.addEventListener('submit', updateAll);

//global variables
let currentData = '';

//functions
async function updateAll(e) {
  try {
    e.preventDefault();
    currentData = await getZodiacByYear(birthYear.value);
    const markup = generatePersonalMarkup() + (await enerateCompatibleMarkup());
    question.insertAdjacentHTML('afterend', markup);
  } catch (err) {
    console.error(err);
  }
}

function generatePersonalMarkup() {
  const name = currentData.name.toLowerCase();
  const element = currentData.element.toLowerCase();
  const traits = currentData.traits;
  const markup = `
      <div class="your-zodiac">
        <div class="your-zodiac-header">
          <h2><span>"${name.toUpperCase()}"</span> is your zodiac</h2>
        </div>
        <div class="your-zodiac-img">
          <img src="./images/${name}.png">
        </div>
        <div class="your-zodiac-des">
          <p>You are: </p>
          <ul>
            <li>${traits[0]}</li>
            <li>${traits[1]}</li>
            <li>${traits[2]}</li>
            <li>${traits[3]}</li>
          </ul>
        </div>
        <div class="your-zodiac-element">
          <img src="elelments/${element}.png" >
          <p>${element}</p>
        </div>
      </div>
      `;
  return markup;
}

async function generateCompatibleMarkup() {
  zodiacs = currentData.compatibility;
  data1 = await getZodiacByName(zodiacs[0]);
  data2 = await getZodiacByName(zodiacs[1]);
  data3 = await getZodiacByName(zodiacs[3]);

  name1 = data1.name.toLowerCase();
  name2 = data2.name.toLowerCase();
  name3 = data3.name.toLowerCase();

  years1 = data1.years.join(', ');
  years2 = data2.years.join(', ');
  years3 = data3.years.join(', ');

  const markup = `
      <div class="compatible">
        <div class="conpatible-header">
          <h2>You are compatible with: </h2>
        </div>
        <div class="compatibale-content">
        <div class="compatible1">
          <div class="cp1-img"><img src="./images/${name1}.png"></div>
          <div class="cp1-content">
            <h2>${name1.toUpperCase()}</h2>
            <p>You're compatible with people who are born in ${years1}!</p>
          </div>
        </div>
        <div class="compatible2">
          <div class="cp2-img"><img src="./images/${name2}.png"></div>
          <div class="cp2-content">
            <h2>${name2.toUpperCase()}</h2>
            <p>You're compatible with people who are born in ${years2}!</p>
          </div>
        </div>
        <div class="compatible3">
          <div class="cp3-img"><img src="./images/${name3}.png"></div>
          <div class="cp3-content">
            <h2>${name3.toUpperCase()}</h2>
            <p>You're compatible with people who are born in ${years3}!</p>
          </div>
        </div>
      </div>
    </div>
    `;

  return markup;
}

async function getZodiacByName(name) {
  try {
    const response = await fetch(
      `https://chinese-zodiacs-api-1.onrender.com/api/zodiacs/${name}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching zodiac by name:', error);
  }
}

async function getZodiacByYear(year) {
  try {
    const response = await fetch(
      `https://chinese-zodiacs-api-1.onrender.com/api/zodiac?year=${year}`
    );
    const data = await response.json();
    return data; // Output zodiac details for the year
  } catch (error) {
    console.error('Error fetching zodiac by year:', error);
  }
}
