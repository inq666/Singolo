// HEADER
const SECTION = document.querySelectorAll('.section')
const LINKS = document.querySelectorAll('.header-navigation a');
const HEADER = document.querySelector('.header');

window.addEventListener('scroll', showHeader);
window.addEventListener('scroll', activeLinkScroll);      // Подсветка ссылок при скролле

function showHeader() {
  if (window.pageYOffset > 100) {
    HEADER.classList.add('header-fixed');
  } else {
    HEADER.classList.remove('header-fixed')

  }
};

function activeLinkScroll() {
  let scroll = window.pageYOffset;
  SECTION.forEach(item => {
    if (scroll + 10 >= item.offsetTop) {
      LINKS.forEach(link => {
        link.classList.remove('nav-active');
        if (item.getAttribute('id') === link.getAttribute('href').substring(1)) {
          link.classList.add('nav-active');
        }
        if (scroll + 400 >= document.getElementById('contact').offsetTop) {
          link.classList.remove('nav-active');
          document.getElementById('contactLink').classList.add('nav-active')
        }
      })
    }
  })
};

// SLIDERS
// Переключение слайдов
const SLIDERCONTAINER = document.querySelector('.slider');
const SLIDER = document.querySelector('.slider-switch');
const SLIDEONECLONE = document.querySelector('.slide-one').cloneNode(true);
const SLIDESECONDCLONE = document.querySelector('.slide-second').cloneNode(true);

SLIDEONECLONE.classList.add('firstClone');
SLIDESECONDCLONE.classList.add('lastClone');
SLIDER.append(SLIDEONECLONE);
SLIDER.prepend(SLIDESECONDCLONE);

const SLIDEITEMS = document.querySelectorAll('.slider-item');
let counter = 1;

SLIDER.style.transform = 'translateX(' + -100 * counter + '%)';
document.querySelector('.arrow-right').addEventListener('click', () => transformItem('right'));
document.querySelector('.arrow-left').addEventListener('click', () => transformItem('left'));

function transformItem(direction) {
  if (direction == "right") {
    if (counter >= SLIDEITEMS.length - 1) {
      return;
    }
    counter++;
  }
  if (direction == "left") {
    if (counter <= 0) {
      return;
    }
    counter--;
  }
  SLIDER.style.transition = 'transform 1s ease';
  SLIDER.style.transform = 'translateX(' + (-100 * counter) + '%)';

  if (SLIDEITEMS[counter].classList.contains('slide-second')) {
    SLIDERCONTAINER.style.background = '#648bf0';
    SLIDERCONTAINER.style.borderColor = '#5e87ee'; // синий
  } else if (SLIDEITEMS[counter].classList.contains('slide-one')) {
    SLIDERCONTAINER.style.background = '#f06c64';
    SLIDERCONTAINER.style.borderColor = '#ea676b'; // красный
  }
  document.querySelectorAll('.disable').forEach(item => item.style.opacity = 0);
}

SLIDER.addEventListener('transitionend', () => {
  if (SLIDEITEMS[counter].classList.contains('lastClone')) {
    counter = 2;
    SLIDER.style.transition = 'none';
    SLIDER.style.transform = 'translateX(' + -100 * counter + '%)';
  }
});

SLIDER.addEventListener('transitionend', () => {
  if (SLIDEITEMS[counter].classList.contains('firstClone')) {
    counter = 1;
    SLIDER.style.transition = 'none';
    SLIDER.style.transform = 'translateX(' + -100 * counter + '%)';
  }
});


// Выключение телефонов
const disableLeft = document.querySelector('.display-left');
const disableRight = document.querySelector('.display-right');
const disableSecond = document.querySelector('.display-second');
const phoneLeft = document.querySelector('.phone-vertical');
const phoneRight = document.querySelector('.phone-horizontal');
const phoneSecond = document.querySelector('.three-phones');

SLIDER.addEventListener('click', (event) => {
  if (event.target == disableLeft || event.target == phoneLeft) {
    if (getComputedStyle(disableLeft).opacity == 0) {
      disableLeft.style.opacity = 1;
    } else {
      disableLeft.style.opacity = 0;
    }
  } else if (event.target == disableRight || event.target == phoneRight) {
    if (getComputedStyle(disableRight).opacity == 0) {
      disableRight.style.opacity = 1;
    } else {
      disableRight.style.opacity = 0;
    }
  } else if (event.target == disableSecond || event.target == phoneSecond) {
    if (getComputedStyle(disableSecond).opacity == 0) {
      disableSecond.style.opacity = 1;
    } else {
      disableSecond.style.opacity = 0;
    }
  }
});


// PORTFOLIO
const IMAGES = document.querySelectorAll('.portfolio-image-item');
const CONTAINERIMAGES = document.querySelector('.portfolio-images');
const BUTTONS = document.querySelectorAll('.btn');
const ARRAYIMAGES = [];

IMAGES.forEach(item => ARRAYIMAGES.push(item));

// Подсветка кнопки при нажатии
document.querySelector('.portfolio-buttons').addEventListener('click', event => {
  if (event.target.classList.contains('active-button') ||
    !event.target.matches('button')) {
    return;
  }
  BUTTONS.forEach(item => item.classList.remove('active-button'));
  event.target.classList.add('active-button')

  mixImages(ARRAYIMAGES); // Перемешивание картинок
});

function mixImages(ARRAYIMAGES) {
  ARRAYIMAGES.sort(randomImages);
  CONTAINERIMAGES.innerHTML = "";
  for (i = 0; i < ARRAYIMAGES.length; i++) {
    CONTAINERIMAGES.append(ARRAYIMAGES[i]);
  }
}

function randomImages(arrayImages) {
  return Math.random() - 0.5;
}

// Подсветка при нажатии
let target;
CONTAINERIMAGES.addEventListener('click', (event) => {
  if (event.target.tagName == 'IMG' || event.target.classList.contains('portfolio-image-item')) {
    if (target) {
      target.classList.remove('portfolio-image-active');
    }
    target = event.target;
    target.classList.add('portfolio-image-active');
  } else {
    return;
  }
})


//FORM
const MESSAGE = document.getElementById('message-block')
const SUBJECT = document.getElementById('subject')
const DESCRIPTION = document.getElementById('description')


document.getElementById('form').onsubmit = function () {
  if (SUBJECT.value) {
    document.getElementById('subject-message').textContent = 'Тема: ' + SUBJECT.value
  } else {
    document.getElementById('subject-message').textContent = 'Без темы'
  }

  if (DESCRIPTION.value) {
    document.getElementById('description-message').textContent = 'Описание: ' + DESCRIPTION.value
  } else {
    document.getElementById('description-message').textContent = 'Без описания'
  }
  MESSAGE.classList.remove('hidden-message');
  return false;
}

document.getElementById('modal-btn').addEventListener('click', () => {
  MESSAGE.classList.add('hidden-message');
  document.getElementById('form').reset();
})


//Выпадающее меню
const HAMBURGER = document.querySelector('.hamburger');
const NAVIGATION = document.querySelector('.header-navigation');
const BLACKOUT = document.querySelector('.blackout');

HAMBURGER.addEventListener('click', () => {
  if (NAVIGATION.dataset.mode == 'false') {
    HAMBURGER.style.transform = 'rotate(90deg)';
    NAVIGATION.style.transform = 'translateY(0)';
    NAVIGATION.dataset.mode = 'true';
    BLACKOUT.style.display = 'block';
    document.querySelector('.header-logo-title').classList.add('title-menu');
    return;
  }
  if (NAVIGATION.dataset.mode == 'true') {
    closeMenu();
  }
});

BLACKOUT.addEventListener('click', closeMenu);
NAVIGATION.addEventListener('click', (e) => {
 if(e.target.tagName == 'A') {
   closeMenu();
 }
});

function closeMenu(params) {
  HAMBURGER.style.transform = 'rotate(0deg)';
  NAVIGATION.style.transform = 'translateY(-100%)';
  NAVIGATION.dataset.mode = 'false';
  BLACKOUT.style.display = 'none';
  document.querySelector('.header-logo-title').classList.remove('title-menu');
}
