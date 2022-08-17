"use strict";

const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".form__input");
const elFormSelect = document.querySelector(".form__select");
const elFormResult = document.querySelector(".form__result");
const elFormBtn = document.querySelector(".form__btn");

fetch("https://nbu.uz/uz/exchange-rates/json/")
  .then((response) => response.json())
  .then((data) => renderValue(data.sort()));

function renderValue(array) {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < array.length; i++) {
    let newOption = document.createElement("option");

    newOption.textContent = array[i].code;
    newOption.setAttribute("class", "bg-info text-dark");

    fragment.appendChild(newOption);
  }
  elFormSelect.appendChild(fragment);
}

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  fetch("https://nbu.uz/uz/exchange-rates/json/")
    .then((response) => response.json())
    .then((data) => renderValue(data.sort()));

  function renderValue(array) {
    let formInput = elFormInput.value;
    let selectValue = elFormSelect.value;

    for (let i = 0; i < array.length; i++) {
        let valueValuta = array[i].cb_price;
        if (selectValue == array[i].code) {
            elFormResult.textContent = (formInput * valueValuta).toFixed(4)
        }
        console.log(valueValuta);
    }
  }
});
