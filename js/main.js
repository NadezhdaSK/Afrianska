"use strict";

window.addEventListener('DOMContentLoaded', () => {

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

    // Функция отправки данных на сервер
    const sendData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            const err = new Error(`Адрес ошибки: ${url}, статус ошибки: ${response.status}`);
            console.log(err);
        }

        return await response.json();
    };

    // Функция отправки данных с формы
    const sendForm = (url, formSelector, inputSelectors, errorClass, activClassOfForm, selectorForMessageParent) => {
        const form = document.querySelector(formSelector);

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputsOfForm = document.querySelectorAll(inputSelectors);

            // Проверяем все ли импуты заполнены
            let counter = 0;
            inputsOfForm.forEach(input => {
                if (!input.value) {
                    input.classList.add(errorClass);
                    counter++;
                }

                // Если инпут заполнен, убираем красную рамку
                input.addEventListener('change', () => {
                    if (input.value.length >= 1) {
                        input.classList.remove(errorClass);
                    }
                });
            });

            if (counter == 0) {

                // собираем все данные с формы и отправляем
                const formData = new FormData(form);

                sendData(url, formData)
                    .then(() => {
                        form.reset();
                    })
                    .catch(() => {
                        const err = new Error(`Адрес ошибки: ${url}`);
                        console.log(err);
                    });

                if (modalFormWrap.classList.contains(activClassOfForm)) {
                    modalFormWrap.classList.remove(activClassOfForm);
                }

                // Попап при успешной отправке формы
                const messageThanks = document.createElement('div');
                messageThanks.classList.add('footer__modal-message');
                messageThanks.innerHTML = `
                <div class="modal__content">
                    <div class="footer__modal-close" data-close>×</div>
                    <div class="footer__modal-title">Спасибо, скоро мы с вами свяжемся!</div>
                </div>
            `;

                document.querySelector(selectorForMessageParent).append(messageThanks);

                setTimeout(() => {
                    messageThanks.remove();
                }, 5000);

                document.querySelector('[data-close]').addEventListener('click', () => {
                    messageThanks.remove();
                });
            }
        });
    };

    const btnOpenForm = document.querySelector('.footer__btn-talk'),
        modalFormWrap = document.querySelector('.footer__form-wrap');

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

        sendForm('https://jsonplaceholder.typicode.com/posts',
            '.footer__form',
            '[data-inputForm = "footer"]',
            'form__input--error',
            'footer__form-wrap--show',
            '.footer'
        );
    }

    const contactForm = document.querySelector('.contact-center__form');

    if (contactForm) {
        sendForm('https://jsonplaceholder.typicode.com/posts',
            '.contact-center__form',
            '[data-inputForm = "contact-center"]',
            'form__input--error',
            'footer__form-wrap--show',
            '.contact-center'
        );
    }
});



