window.addEventListener("load", start);

let usersList = [];
let resultList = [];
let searchInput = document.querySelector("#searchInput");
let tabResults = document.querySelector("#tabResults");
let tabStats = document.querySelector("#tabStats");

function start() {
  fetchData();
  tabResults.innerHTML = "<h4>Nenhum usuário encontrado</h4>";
  tabStats.innerHTML = "<h4>Nada a ser exibido</h4>";
  searchInput.addEventListener("keyup", searchUser);
}

async function fetchData() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();
  usersList = json.results.map((data) => {
    const { name, picture, dob, gender } = data;
    return {
      name: `${name.first} ${name.last}`.toLowerCase(),
      picture,
      dob: dob.date,
      age: dob.age,
      gender,
    };
  });
}

function render() {
  renderResults();
  renderStats();
}

function renderResults() {
  tabResults.innerHTML = "";
  let resultHTML = `<div>
    <h4>${resultList.length} usuário(s) encontrado(s)</h4>
  `;
  if (resultList.length > 0) {
    resultList.forEach((item) => {
      const { picture, name, age } = item;
      const result = `
        <div class="userBox">
          <img src="${picture.medium}" />
          <div class="userInfos">
            <ul>${name}</>
            <ul>${age} anos</>
          </div>
        </div>
      `;
      resultHTML += result;
    });
  } else {
    tabResults.innerHTML += `<h4>Nenhum usuário encontrado</h4>`;
    return;
  }
  resultHTML += "</div>";
  tabResults.innerHTML += resultHTML;
}

function renderStats() {
  const males = resultList.filter((user) => user.gender === "male");
  const females = resultList.filter((user) => user.gender === "female");
  const agesSum = resultList.reduce((acc, curr) => acc + curr.age, 0);
  const averageAge = (agesSum / resultList.length).toFixed(2);

  tabStats.innerHTML = "";
  if (resultList.length > 0) {
    tabStats.innerHTML = `
      <div>
        <h4>Estatítiscas</h4>
        <ul>Sexo masculino: ${males.length}</ul>
        <ul>Sexo feminino: ${females.length}</ul>
        <ul>Soma das idades: ${agesSum}</ul>
        <ul>Média das idades: ${averageAge}</ul>
      </div>
    `;
  } else {
    tabStats.innerHTML = "<h4>Nada a ser exibido</h4>";
  }
}

function searchUser(event) {
  if (event.srcElement.value === "") {
    resultList = [];
    render();
    return;
  }
  let keyWord = event.srcElement.value.toLowerCase();
  resultList = usersList.filter(
    (user) => user.name.toLowerCase().indexOf(keyWord) !== -1
  );
  resultList = resultList.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  render();
}
