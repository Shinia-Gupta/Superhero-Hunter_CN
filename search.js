import { url } from "./configApi.js";
import { changeImg } from "./favourites.js";
import { fetchSuperhero } from "./superheroDetail.js";

const inputBox = document.getElementById("inputbox");
const listContainer = document.getElementById("searchContainer");
// const searchBtn = document.getElementById("searchBtnIcon");
let searchedCharacters = [];
let userInput;

//Event handler to remove any previous value given by user 
inputBox.addEventListener("focus", function () {
inputBox.value='';
});

//Event handler to start showing search results in case of user input given
inputBox.addEventListener("keyup", function (event) {
  userInput = inputBox.value.trim();
  event.stopImmediatePropagation();
  removeHeroSuggestions();
  searchCharacter();
});

//Event handler to toggle the display of the list of suggestions that appeared as search results in case the input box gets out of focus 
window.addEventListener("click", (event) => {
  if (!inputBox.contains(event.target) && event.target.id !== "inputbox") {
    displayList(listContainer);
  } else {
    displayList(listContainer);
  }
});

//Since we should just use one handler for searching results, so input box keyup event has been already taken as an event.
//Either use the input box keyup event or use the click event of search button at a time
// searchBtn.addEventListener("click", searchCharacter);

//Function to fetch the search results from the api
export async function searchCharacter() {
  //  userInput = inputBox.value.trim();

  if (userInput === "") {
    listContainer.innerHTML = "";
    return;
  }

  const response = await fetch(`${url}&nameStartsWith=${userInput}`);
  const jsonData = await response.json();
  searchedCharacters = jsonData.data["results"];

  populateList();
}

//Function to display the render the search list 
function populateList() {
  listContainer.innerHTML = "";
  searchedCharacters.forEach((hero) => {
    const name = hero.name;
    const liDiv = document.createElement("div");
    liDiv.classList.add("listItem", "autocomplete-items");
    liDiv.setAttribute("id", hero.id);
    liDiv.addEventListener("click", (event) => {
      event.stopPropagation();
      displayWords(name);
      fetchSuperhero(hero.id);
    });
    liDiv.innerHTML = `
      <div class="innerliDiv">
        <img src="${hero.thumbnail.path + "." + hero.thumbnail.extension}">
        <p>${name}</p>
      </div>`;
    const img2 = document.createElement("img");
    img2.src = "./images/like2.png";
    img2.alt = "add to favourites";
    img2.id = "likeImg2";
    img2.className = "";
    img2.addEventListener("click", function (event) {
      event.stopPropagation();
      changeImg(this, liDiv, hero);
    });
    liDiv.appendChild(img2);
    listContainer.appendChild(liDiv);
  });

  displayList(listContainer);
}

//Function to display the selected hero in the input box 
function displayWords(value) {
  inputBox.value = value;
  removeHeroSuggestions();
}

//Function to remove hero suggestions once the user has selected a hero
function removeHeroSuggestions() {
  listContainer.innerHTML = "";
}

//Function to display the list of suggestions
function displayList(listContainer) {
  if (userInput === "") {
    listContainer.style.display = "none";
  }
  if (inputBox === document.activeElement) {
    listContainer.style.display = "flex";
  } else {
    listContainer.style.display = "none";
  }
  if (searchedCharacters.length > 4) {
    listContainer.style.overflowY = "auto";
  }
}
