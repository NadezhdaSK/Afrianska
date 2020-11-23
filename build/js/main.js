"use strict";

// Меню навигации

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

// Форма на главной странице

const btnOpenForm = document.querySelector('.footer__btn-talk'),
      modalFormWrap = document.querySelector('.footer__form-wrap'),
      modalForm = document.querySelector('.footer__form'),
      formName = document.querySelector('#name'),
      formEmail = document.querySelector('#email'),
      formMessage = document.querySelector('#message');

if (btnOpenForm) {

  btnOpenForm.addEventListener('click', () => {
    modalFormWrap.classList.add('footer__form-wrap--show');
  });

  // Закрытие формы при клике за формой
  modalFormWrap.addEventListener('click', (e) => {
      if (e.target === modalFormWrap) {
          modalFormWrap.classList.remove('footer__form-wrap--show');
      }
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //  Проверяем все ли инпуты заполнены
    if (!formEmail.value || !formMessage.value || !formName.value) {
      if (!formEmail.value) {
        formEmail.classList.add('form__input--error');
      }

      if (!formMessage.value) {
        formMessage.classList.add('form__input--error');
      }

      if (!formName.value) {
        formName.classList.add('form__input--error');
      } 

      } else {

      modalFormWrap.classList.remove('footer__form-wrap--show');

      // Попап при успешной отправке формы
      const messageTanks = document.createElement('div');
      messageTanks.classList.add('footer__modal-message');
      messageTanks.innerHTML = `
          <div class="modal__content">
              <div class="footer__modal-close" data-close>×</div>
              <div class="footer__modal-title">Спасибо, скоро мы с вами свяжемся!</div>
          </div>
      `;
    
      document.querySelector('.footer').append(messageTanks);
    
      setTimeout(() => {
        messageTanks.remove();
      }, 5000);
    
      document.querySelector('[data-close]').addEventListener('click', () => {
        messageTanks.remove();
      });
    }

    // При заполнение инпутов убираем красный бордер
    formName.addEventListener("change", function() {
      if(formName.value.length >= 1) {
        formName.classList.remove("form__input--error");
      }
    });

    formEmail.addEventListener("change", function() {
      if(formEmail.value.length >= 1) {
        formEmail.classList.remove("form__input--error");
      }
    });

    formMessage.addEventListener("change", function() {
      if(formMessage.value.length >= 1) {
        formMessage.classList.remove("form__input--error");
      }
    });

  });
}

