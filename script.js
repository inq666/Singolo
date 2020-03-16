/* let activeLink = document.querySelector('.nav-active');  // активная ссылка
// Подсветка ссылки при нажатии
document.querySelector('.header-navigation').addEventListener('click', event => {
  target = event.target;
  if (!target.matches('a')) {
    return;
  } else if (activeLink) {
    activeLink.classList.remove('nav-active');
  }
  activeLink = target;
  activeLink.classList.add('nav-active');
}); */


// HEADER
window.addEventListener('scroll', showNavigation);        // Выпадающее меню при скролле
window.addEventListener('scroll', activeLinkScroll);      // Подсветка ссылок при скролле

function showNavigation() {
  if (window.pageYOffset > 50) {
    document.querySelector('.header-navigation').classList.add('navigation-fixed');
  } else {
    document.querySelector('.header-navigation').classList.remove('navigation-fixed')
  }
};
let activeLink = document.querySelector('.nav-active');   // Текущая подсвеченная ссылка

function activeLinkScroll() {
  if (pageYOffset >= 0 && pageYOffset < 692) {
    lightLink = document.getElementById('homeLink');
    if (lightLink.classList.contains('nav-active')) {
      return;
    } else {
      checkClass()
    }
  }

  if (pageYOffset > 693 && pageYOffset < 1192) {
    lightLink = document.getElementById('servicesLink');
    if (lightLink.classList.contains('nav-active')) {
      return;
    } else {
      checkClass()
    }
  }

  if (pageYOffset > 1193 && pageYOffset < 2060) {
    lightLink = document.getElementById('portfolioLink');
    if (lightLink.classList.contains('nav-active')) {
      return;
    } else {
      checkClass()
    }
  }

  if (pageYOffset > 2061 && pageYOffset < 2579) {
    lightLink = document.getElementById('aboutLink');
    if (lightLink.classList.contains('nav-active')) {
      return;
    } else {
      checkClass()
    }
  }

  if (pageYOffset > 2580) {
    lightLink = document.getElementById('contactLink')
    if (lightLink.classList.contains('nav-active')) {
      return;
    } else {
      checkClass()
    }
  }

  function checkClass() {                      // Удаляет подсветку с прошлой ссылки и добавляет на новую
    activeLink.classList.remove('nav-active');
    lightLink.classList.add('nav-active');
    activeLink = lightLink;
  }
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
const disableLeft = document.querySelector('.display-disable-left');
const disableRight = document.querySelector('.display-disable-right');
const disableSecond = document.querySelector('.display-disable-second');
const disableLeftAdd = document.querySelector('.display-disable-left-add');
const disableRightAdd = document.querySelector('.display-disable-right-add');
const disableSecondAdd = document.querySelector('.display-disable-second-add');
const phoneLeft = document.querySelector('.phone-vertical');
const phoneRight = document.querySelector('.phone-horizontal');
const phoneSecond = document.querySelector('.three-phones');

SLIDER.addEventListener('click', (event) => {
  if (event.target == disableLeft || event.target == phoneLeft) {
    if (getComputedStyle(disableLeft).opacity == 0) {
      disableLeft.style.opacity = 1;
      disableLeftAdd.style.opacity = 1;
    } else {
      disableLeft.style.opacity = 0;
      disableLeftAdd.style.opacity = 0;
    }
  } else if (event.target == disableRight || event.target == phoneRight) {
    if (getComputedStyle(disableRight).opacity == 0) {
      disableRight.style.opacity = 1;
      disableRightAdd.style.opacity = 1;
    } else {
      disableRight.style.opacity = 0;
      disableRightAdd.style.opacity = 0;
    }
  } else if (event.target == disableSecond || event.target == phoneSecond) {
    if (getComputedStyle(disableSecond).opacity == 0) {
      disableSecond.style.opacity = 1;
      disableSecondAdd.style.opacity = 1;
    } else {
      disableSecond.style.opacity = 0;
      disableSecondAdd.style.opacity = 0;
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
CONTAINERIMAGES.addEventListener('click', (event) => {
  if (!event.target.classList.contains('portfolio-image-item')) {
    return;
  }
  IMAGES.forEach(item => item.classList.remove('portfolio-image-active'));
  event.target.classList.add('portfolio-image-active');

})


//FORM
const MESSAGE = document.getElementById('message-block')
const SUBJECT = document.getElementById('subject')
const DESCRIPTION = document.getElementById('description')

document.getElementById('form').onsubmit = function () {
  if (SUBJECT.value) {
    document.getElementById('subject-message').innerHTML = '<b>Тема: </b>' + SUBJECT.value
  } else {
    document.getElementById('subject-message').innerHTML = 'Без темы'
  }

  if (DESCRIPTION.value) {
    document.getElementById('description-message').innerHTML = '<b>Описание: </b>' + DESCRIPTION.value
  } else {
    document.getElementById('description-message').innerHTML = 'Без описания'
  }
  MESSAGE.classList.remove('hidden-message');
  document.getElementById('form').reset();
  return false;
}

document.getElementById('modal-btn').addEventListener('click', () => {
  MESSAGE.classList.add('hidden-message');
})
