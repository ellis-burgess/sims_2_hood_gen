const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');

let dotsNav = document.querySelector('.carousel__nav');
let dots = [];

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange slides next to one another
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

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  let prevSlide = currentSlide.previousElementSibling;
  if (!prevSlide) {
    prevSlide = track.lastElementChild;
  }

  const currentDot = dotsNav.querySelector('.current-slide');
  let prevDot = currentDot.previousElementSibling;
  if (!prevDot) {
    prevDot = dotsNav.lastElementChild;
  }
  const amountToMove = prevSlide.style.left;
  // move to the next slide
  track.style.transform = 'translateX(-' + amountToMove + ')';
  currentSlide.classList.remove('current-slide');
  prevSlide.classList.add('current-slide');
  currentDot.classList.remove('current-slide');
  prevDot.classList.add('current-slide');
})

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  let nextSlide = currentSlide.nextElementSibling;
  if (!nextSlide) {
    nextSlide = track.firstElementChild;
  }

  const currentDot = dotsNav.querySelector('.current-slide');
  let nextDot = currentDot.nextElementSibling;
  if (!nextDot) {
    nextDot = dotsNav.firstElementChild;
  }
  const amountToMove = nextSlide.style.left;
  // move to the next slide
  track.style.transform = 'translateX(-' + amountToMove + ')';
  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');
  currentDot.classList.remove('current-slide');
  nextDot.classList.add('current-slide');
})

// when I click nav indicators, move to that slide

dots.forEach(function(dot) {
  dot.addEventListener("click", e => {
    // on click event
    let currentDot = dotsNav.querySelector('.current-slide');
    let nextDot = e.target;
        
    if (currentDot == nextDot) {
      return 0;
    }
    
    let currentSlide = track.querySelector('.current-slide');
    let nextSlide = slides[dots.indexOf(nextDot)];
    
    const amountToMove = nextSlide.style.left;
    // move to the next slide
    track.style.transform = 'translateX(-' + amountToMove + ')';
    currentSlide.classList.remove('current-slide');
    nextSlide.classList.add('current-slide');
    currentDot.classList.remove('current-slide');
    nextDot.classList.add('current-slide');
  })
})
