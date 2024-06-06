const track = document.querySelector('.carousel__contents');
const slides = Array.from(track.children);
console.log(slides);

const nextButton = document.querySelector('.carousel__button-right');
const prevButton = document.querySelector('.carousel__button-left');

const dotsNav = document.querySelector('.carousel__nav');
const dots = []
console.log(dots);

const slideWidth = slides[0].getBoundingClientRect().width;

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

nextButton.addEventListener('click', slideOne);
prevButton.addEventListener('click', slideOne);

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
}