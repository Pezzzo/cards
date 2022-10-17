'use strict';

const BUTTON_TEXT_HIDDEN_LIST = 'ещё...';
const BUTTON_TEXT_VISIBLE_LIST = 'скрыть';
const list = document.querySelectorAll('.next-flights__list');
const cards = document.querySelector('.section-cards');

list.forEach((el) => {
  if (el.offsetHeight > 38) {
    el.classList.add('next-flights__list--hidden');
    console.log(el);
  }
});

const setButtonsClass = () => {
  const ITEM_NUMBER = 3;
  const hiddenList = document.querySelectorAll('.next-flights__list--hidden');
  let listItems = [];
  let buttons = [];

  hiddenList.forEach((el) => {
    listItems.push(el.childNodes[ITEM_NUMBER]);
  });

  listItems.forEach((el) => {
    buttons.push(el.childNodes[0]);
  });

  buttons.forEach((el) => {
    el.classList.add('next-flights__time--invisible');
    el.setAttribute('data-time', el.textContent);
    el.textContent = BUTTON_TEXT_HIDDEN_LIST;
  });

};

const cardsHandler = (evt) => {
  const hiddenListButton = evt.target.closest('.next-flights__time--invisible');
  const visibleListButton = evt.target.closest('.next-flights__time--visible');

  if (hiddenListButton) {
    const list = hiddenListButton.closest('.next-flights__list');
    list.classList.remove('next-flights__list--hidden');
    hiddenListButton.classList.remove('next-flights__time--invisible');
    hiddenListButton.classList.add('next-flights__time--active');

    list.insertAdjacentHTML('beforeend', `
    <li class="next-flights__item">
      <p class="next-flights__time next-flights__time--visible">${BUTTON_TEXT_VISIBLE_LIST}</p>
    </li>
    `);

    if (hiddenListButton.closest('.next-flights__list--hidden')) {
      hiddenListButton.textContent = BUTTON_TEXT_HIDDEN_LIST;
    } else {
      hiddenListButton.textContent = hiddenListButton.dataset.time;
    }
  }

  if (visibleListButton) {
    const list = visibleListButton.closest('.next-flights__list');
    const delButton = list.querySelector('.next-flights__time--active');

    list.classList.add('next-flights__list--hidden');
    list.removeChild(visibleListButton.parentNode);
    delButton.classList.add('next-flights__time--invisible');
    delButton.textContent = BUTTON_TEXT_HIDDEN_LIST;
  }
};

const init = () => {
  cards.addEventListener('click', cardsHandler);
  setButtonsClass();
};

init();
