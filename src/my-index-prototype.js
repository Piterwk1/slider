function Slider(slider) {
  if (!(slider instanceof Element)) throw new Error('no slider passed in');

  this.slider = slider;
  // select elements needed for slider
  this.slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  // when this slides is created, run the start slider function

  this.startSlider();
  this.applyClasses();

  // event lsteners
  // this.move = this.move.bind(this) 3 motedo of fixing line 18
  prevButton.addEventListener('click', () => this.move('back'));
  nextButton.addEventListener('click', () => this.move());
}

Slider.prototype.startSlider = function() {
  // console.log(this);

  this.current =
    this.slider.querySelector('.current') || this.slides.firstElementChild;
  this.prev =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.nextElementChild;
  // console.log({ current, prev, next });
};

Slider.prototype.applyClasses = function() {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
};

Slider.prototype.move = function(direction) {
  // remove classes
  // current.classList.remove('current');
  // prev.classList.remove('prev');
  // next.classList.remove('next');

  const classesToRemove = ['prev', 'current', 'next'];
  [this.prev, this.current, this.next].forEach(el =>
    el.classList.remove(...classesToRemove)
  );
  if (direction === 'back') {
    // make a new arrey of the new values and destructure them over into new variables
    [this.prev, this.current, this.next] = [
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }
  this.applyClasses();
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

console.log(mySlider, dogSlider);

window.dogSlider = dogSlider;

window.addEventListener('keyup', function(e) {
  if (e.key === 'ArrowRight') {
    dogSlider.move();
  }
  if (e.key === 'ArrowLeft') {
    dogSlider.move('back');
  }
});
