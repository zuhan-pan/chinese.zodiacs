//query selectors
const imgSlider = document.querySelector('.img-slider');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const allItems = document.querySelectorAll('.img-item');
const allInfos = document.querySelectorAll('.info-item');
const carousel = document.querySelector('.carousel');
const allBackgrounds = [
  'shu',
  'niu',
  'hu',
  'tu',
  'long',
  'she',
  'ma',
  'yang',
  'hou',
  'ji',
  'gou',
  'zhu',
];

//evnet listners
nextBtn.addEventListener('click', toNextSlide);
prevBtn.addEventListener('click', toPrevSlide);

let index = 0;
//functions
function toNextSlide() {
  index++;
  if (index > allInfos.length - 1) index = 0;
  toNextImage();
  toText();
  toBackground();
}

function toPrevSlide() {
  index--;
  if (index < 0) index = allInfos.length - 1;
  toPrevImage();
  toText();
  toBackground();
}

function toNextImage() {
  allItems.forEach(el => {
    el.classList.remove('active');
    let i = +getComputedStyle(el).getPropertyValue('--i');
    if (i % 12 === 2 || i % 12 === -10) {
      el.classList.add('active');
      el.style.setProperty('--i', `${i - 1}`);
    } else {
      el.style.setProperty('--i', `${i - 1}`);
    }
  });
}

function toPrevImage() {
  allItems.forEach(el => {
    el.classList.remove('active');
    let i = +getComputedStyle(el).getPropertyValue('--i');
    if (i % 12 === 0) {
      el.classList.add('active');
      el.style.setProperty('--i', `${i + 1}`);
    } else {
      el.style.setProperty('--i', `${i + 1}`);
    }
  });
}

function toText() {
  document.querySelector('.info-item.active').classList.remove('active');
  allInfos[index].classList.add('active');
}

function toBackground() {
  carousel.style.backgroundImage = `url(backgrounds/${allBackgrounds[index]}.png)`;
}
