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

function searchUser(event) {
  let keyWord = event.srcElement.value.toLowerCase();
  filteredUsers = usersList.filter(
    (user) => user.name.toLowerCase().localeCompare(keyWord) > 0
  );
  console.log(filteredUsers);
}
