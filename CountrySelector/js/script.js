window.addEventListener("load", start);

let tabFavorites = null;
let tabCountries = null;

let allCountries = [];
let allFavorites = [];

let countCountries;
let countFavorites;

let totalPopulationCountries = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

function start() {
  tabCountries = document.querySelector("#tabCountries");
  tabFavorites = document.querySelector("#tabFavorites");

  countCountries = document.querySelector("#countCountries");
  countFavorites = document.querySelector("#countFavorites");

  //prettier-ignore
  totalPopulationCountries = document.querySelector("#totalPopulationCountries");
  //prettier-ignore
  totalPopulationFavorites = document.querySelector("#totalPopulationFavorites");

  numberFormat = Intl.NumberFormat("pt-BR");

  getCountries();
}

async function getCountries() {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const json = await res.json();
  allCountries = json.map((item) => {
    const { numericCode, translations, population, flag } = item;
    return {
      id: numericCode,
      name: translations.br,
      population,
      flag,
    };
  });

  render();
}

function render() {
  renderCountriesList();
  renderFavorites();
  renderSummary();

  handleCountryButtons();
}

function renderCountriesList() {
  let countriesHTML = "<div>";
  allCountries.forEach((country) => {
    const { name, flag, id, population } = country;
    const countryHTML = `
      <div class='country'>
        <div>
          <a id='${id}' class="waves-effect waves-light btn" >+</a>
        </div>
        <img id='flagImage' src="${flag}" alt></img>
        <div id='countryInfo'>
          <ul>
            ${name}
          </ul>
          <ul>
            ${population}
          </ul>
        </div>
      </div>
    `;
    countriesHTML += countryHTML;
  });
  countriesHTML += "</div>";
  tabCountries.innerHTML = countriesHTML;
}

function renderFavorites() {
  let favoritesHTML = "<div>";
  allFavorites.forEach((country) => {
    const { name, flag, id, population } = country;
    const favoriteCountryHTML = `
      <div class='country'>
        <div>
          <a id='${id}' class="waves-effect waves-light btn red" >-</a>
        </div>
        <img id='flagImage' src="${flag}" alt></img>
        <div id='countryInfo'>
          <ul>${name}</ul>
          <ul>${population}</ul>
        </div>
      </div>
    `;
    favoritesHTML += favoriteCountryHTML;
  });
  favoritesHTML += "</div/";
  tabFavorites.innerHTML += favoritesHTML;
}
function renderSummary() {
  countCountries.textContent = `Countries (${allCountries.length})`;
  countFavorites.textContent = `Favorites countries (${allFavorites.length})`;
  const reducer = (acc, curr) => acc + curr.population;
  totalPopulationCountries.textContent = `Total population: ${allCountries.reduce(
    reducer,
    0
  )}`;
  totalPopulationFavorites.textContent = `Total population: ${allFavorites.reduce(
    reducer,
    0
  )}`;
}
function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll(".btn"));
  const favoritesButtons = Array.from(tabFavorites.querySelectorAll(".btn"));

  countryButtons.forEach((button) => {
    button.addEventListener("click", () => addToFavorites(button.id));
  });
  favoritesButtons.forEach((button) => {
    button.addEventListener("click", () => addToFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find((country) => country.id === id);
  allFavorites = allFavorites.concat(countryToAdd);
  allFavorites.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter((country) => country.id !== id);
  render();
}

function removeFromFavorites(id) {}
