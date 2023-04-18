import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
Notify.init({
  position: 'center-top',
});
const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  debounce(() => {
    if (searchBox.value.length === 0) {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    }

    fetchCountries(searchBox.value)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(countries => {
        if (countries.length > 10) {
          countryList.innerHTML = '';
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        // if (countries.length < 2) countryList.innerHTML = '';
        if (countries.length === 1) {
          countryList.innerHTML = '';
          showCountry(countries[0]);
          return;
        }
        if (countries.length === 0) {
          countryList.innerHTML = '';
          return;
        }
        showCountries(countries);
      })
      .catch(error => {
        console.log(error);
      });
  }, 300)
);

function showCountries(countries) {
  countryInfo.innerHTML = '';
  const arr = countries.reduce((str, country) => {
    return (
      str +
      `<li><img src="${country.flags.svg}"><span> ${country.name.official}</span></li>`
    );
  }, '');
  console.log(arr);
  countryList.innerHTML = arr;
}

function showCountry(country) {
  let { name, flags, capital, population, languages } = country;
  const max = languages.length - 1;
  languages = Object.values(languages).reduce((str, leng, index, array) => {
    return str + (index < array.length - 1 ? `${leng}, ` : `${leng}`);
  }, '');
  countryInfo.innerHTML = `<div class="centerLine"><img src="${country.flags.svg}">
  <span class="countryName">${name.official}</span></div>
  <p><span class="dataStyle">Capital</span>: ${capital[0]}</p>
  <p><span class="dataStyle">Population</span>: ${population}</p>
  <p><span class="dataStyle">Languages</span>: ${languages}</p>`;
}
