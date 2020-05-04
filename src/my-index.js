function Slider(slider) {
  if (!(slider instanceof Element)) throw new Error('no slider passed in');

  // create variables
  let prev;
  let current;
  let next;
  // select elements needed for slider
  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.nextElementChild;
    console.log({ current, prev, next });
  }

  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  function move(direction) {
    // remove classes
    // current.classList.remove('current');
    // prev.classList.remove('prev');
    // next.classList.remove('next');

    const classesToRemove = ['prev', 'current', 'next'];
    [prev, current, next].forEach(el =>
      el.classList.remove(...classesToRemove)
    );
    if (direction === 'back') {
      // make a new arrey of the new values and destructure them over into new variables
      [prev, current, next] = [
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    applyClasses();
  }

  // when this slides is created, run the start slider function

  startSlider();
  applyClasses();

  // event lsteners
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
