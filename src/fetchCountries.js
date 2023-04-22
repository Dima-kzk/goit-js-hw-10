// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notify.init({
//   position: 'center-top',
// });

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.status === 404) {
      throw new Error(response.status);
    }
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
