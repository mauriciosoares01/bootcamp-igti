window.addEventListener("load", start);

let usersList = [];
let resultList = [];
let searchInput = document.querySelector("#searchInput");

function start() {
  fetchData();
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
  let resultHTML = "<div>";
  resultList.forEach((item) => {
    const { picture, name, age } = item;
    const result = `
      <div>
        <img src="${picture.medium}" />
        <div>
          <ul>${name}</>
          <ul>${age}</>
        </div>
      </div>
    `;
    resultHTML += result;
  });
}

function renderStats() {}

function searchUser(event) {
  let keyWord = event.srcElement.value.toLowerCase();
  resultList = usersList.filter(
    (user) => user.name.toLowerCase().indexOf(keyWord) !== -1
  );
  console.log(resultList);
}
