"use strict";

const btnNav = document.querySelector('.header__btn-nav'),
      nav = document.querySelector('.header__nav');
  
btnNav.addEventListener('click', () => {
  if (nav.classList.contains('header__nav--closed')) {
    nav.classList.remove('header__nav--closed');
    nav.classList.add('header__nav--opened');
  } else {
    nav.classList.add('header__nav--closed');
    nav.classList.remove('header__nav--opened');
  }
});