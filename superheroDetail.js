import { url2, timestamp, apikey, hashValue } from "./configApi.js";
import { characters } from "./script.js";

const favouritesiconDiv=document.getElementById('favouritesicon');
const sectionHome = document.getElementById("homepage");
const sectionDetail = document.getElementById("card-detail-section");
const charImgContainer = document.querySelector(".card-character");
const charOverview = document.querySelector(".card-detail");
const searchbar = document.querySelector("#searchbar");
const footerElem = document.querySelector("footer");

//Function fetching all the data and correspondingly render it
export async function fetchSuperhero(id) {
  await fetchhero(id);
  await fetchData(id, "comics", "comic-cards-container");
  await fetchData(id, "events", "event-cards-container");
  await fetchData(id, "series", "series-cards-container");
  displaySet();
}

//Function to fetch a hero's information 
async function fetchhero(id) {
  const characterToLoad = characters.find((c) => c.id === id);
  console.log("Character to load:", characterToLoad);

  if (characterToLoad !== null && characterToLoad !== undefined) {
    console.log("Character found, proceeding with rendering.");

    if (
      characterToLoad.thumbnail !== null &&
      characterToLoad.thumbnail !== undefined
    ) {
      charImgContainer.innerHTML = `<img src=${
        characterToLoad.thumbnail.path +
        "." +
        characterToLoad.thumbnail.extension
      } id='imgEnlarged'>`;
    } else {
      charImgContainer.innerHTML = `<img src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" id='imgEnlarged'>`;
    }

    charOverview.innerHTML = `<h2>${characterToLoad.name}</h2><br/><br/>
                        <h3>Comics: ${characterToLoad.comics.available}</h3><br/><br/>
                        <h3>Events: ${characterToLoad.events.available}</h3><br/>
                        <h3>Series: ${characterToLoad.series.available}</h3><br/>
                        <p> ${characterToLoad.description}</p>`;
  } else {
    console.log("Character not found. Displaying alert.");
    alert("Character info does not exist");
  }
}

//Function to append the data to the corresponding container
async function fetchData(id, typeOfInfo, containerClass) {
  const containerToFill = document.querySelector(`.${containerClass}`);
  containerToFill.innerHTML = "";

  const response = await fetch(
    `${url2}${id}/${typeOfInfo}?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}`,{
      'referrerPolicy': 'unsafe-url',
    }
  );
  const jsonData = await response.json();
  console.log("thumbnail: ", jsonData);
  const finalDataArr = jsonData.data["results"];
  console.log(`${typeOfInfo}-`);
  // finalDataArr.forEach(element=>console.log(element));
  finalDataArr.forEach((element) => {
    const divCard = document.createElement("div");
    divCard.classList.add("detailsContainerCard");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("detailsImgDiv");

    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `${element.thumbnail.path}.${element.thumbnail.extension}`
    );
    imgDiv.appendChild(img);

    const title = document.createElement("p");
    title.innerText = element.title;

    divCard.append(imgDiv, title);
    // console.log(divCard);
    containerToFill.appendChild(divCard);
    // console.log(containerToFill);
  });
}

//Function to change the displays for a page type
function displaySet() {
  console.log("displaySet");
  console.log("sectionHome.style.display:" + sectionHome.style.display);
  console.log("sectionDetail.style.display:" + sectionDetail.style.display);

  if (sectionHome.style.display === "flex") {
    sectionHome.style.display = "none";
    sectionDetail.style.display = "block";
    footerElem.style.display = "none";
    searchbar.style.display = "none";
    favouritesiconDiv.style.display = "none";

  } else {
    sectionHome.style.display = "flex";
    sectionDetail.style.display = "none";
    footerElem.style.display = "block";
    searchbar.style.display = "flex";
    favouritesiconDiv.style.display = "flex";

  }

  console.log("After setting values:");
  console.log("sectionHome.style.display:", sectionHome.style.display);
  console.log("sectionDetail.style.display:", sectionDetail.style.display);
}

//Event handler to go back to homepage from a character detail page
document.querySelector("#backBtn").addEventListener("click", displaySet);
