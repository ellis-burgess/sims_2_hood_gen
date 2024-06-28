const track = document.querySelector('.carousel__contents');
const slides = Array.from(track.children);
console.log(slides);

const nextButton = document.querySelector('.carousel__button-right');
const prevButton = document.querySelector('.carousel__button-left');

const dotsNav = document.querySelector('.carousel__nav');
const dots = []
console.log(dots);

let slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

const addDot = (slide, index) => {
  if (dots.length > index) {
    return;
  }
  let newDot = document.createElement("button");
  newDot.classList.add("carousel__indicator");
  if (index == 0) {
    newDot.classList.add("current-slide");
  }
  dotsNav.appendChild(newDot);
  dots.push(newDot);
}

slides.forEach(setSlidePosition);
slides.forEach(addDot);
dots.forEach(function (dot) {dot.addEventListener('click', jumpToDot)});

nextButton.addEventListener('click', slideOne);
prevButton.addEventListener('click', slideOne);

window.addEventListener('resize', () => {
  slides.forEach(setSlidePosition);
  slideWidth = slides[0].getBoundingClientRect().width;
  jumpToDot({target: dotsNav.querySelector('.current-slide')});
});

function slideOne(e) {
  let currentSlide = track.querySelector('.current-slide');
  let currentDot = dotsNav.querySelector('.current-slide');
  let nextSlide = null;
  if (e.target.classList.contains('carousel__button-right')) {
    nextSlide = currentSlide.nextElementSibling;
    if (!nextSlide) {
      nextSlide = slides[0];
    }
  } else {
    nextSlide = currentSlide.previousElementSibling
    if (!nextSlide) {
      nextSlide = slides[slides.length-1];
    }
  }
  
  let nextDot = dots[slides.indexOf(nextSlide)];
  
  moveSlides(currentSlide, currentDot, nextSlide, nextDot);
}

// buttons jump to relevant carousel item

function jumpToDot(e) {
  let currentDot = dotsNav.querySelector('.current-slide');
  let nextDot = e.target;
  
  let currentSlide = track.querySelector('.current-slide');
  let nextSlide = slides[dots.indexOf(nextDot)];
  
  moveSlides(currentSlide, currentDot, nextSlide, nextDot);
}

function moveSlides(currentSlide, currentDot, nextSlide, nextDot) {
  let amountToMove = nextSlide.style.left;
  track.style.transform = `translateX(-${amountToMove})`;
  currentSlide.classList.remove('current-slide');
  currentDot.classList.remove('current-slide');
  
  nextSlide.classList.add('current-slide');
  nextDot.classList.add('current-slide');

  let dotIndex = Array.from(dotsNav.children).indexOf(nextDot);
  if (!isElementInViewport(nextDot, dotsNav)) {
      nextDot.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

export default function addCardToCarousel(newCard) {
  track.appendChild(newCard);
  if (slides[0].classList.contains('default')) {
    // remove placeholder slide present while carousel is empty
    track.removeChild(slides[0]);
    slides.shift();
    dotsNav.removeChild(dots[0]);
    dots.shift();
    console.log(dots);
  }
  slides.push(track.lastElementChild);
  if (slides.length == 1) {
    slides[0].classList.add('current-slide');
  }

  slides.forEach(setSlidePosition);
  console.log(slides)
  slides.forEach(addDot);
  dots.forEach(function (dot) {dot.addEventListener('click', jumpToDot)});

  if (dots.length > 8) {
    dotsNav.style.justifyContent = 'flex-start';
  }

  if (slides.length > 1) {
    moveSlides(track.querySelector('.current-slide'),
    dotsNav.querySelector('.current-slide'),
    slides[slides.length - 1],
    dots[dots.length - 1]);
  }
}

// if move to dot outside of viewport, scroll nav to display active dot

function isElementInViewport(el, parent) {
  let rect = el.getBoundingClientRect();
  let parentRect = parent.getBoundingClientRect();
  
  let status = rect.top >= parentRect.top &&
               rect.left >= parentRect.left &&
               rect.bottom <= parentRect.bottom &&
               rect.right <= parentRect.right;

  console.log(status);
  return status;
}