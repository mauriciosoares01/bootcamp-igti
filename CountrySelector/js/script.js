window.addEventListener("load", start);

let tabFavorites = null;
let tabCountries = null;

let allCountries = [];
let allFavorites = [];

let countCountries = 0;
let countFavorites = 0;

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
  console.log(allCountries);
}
