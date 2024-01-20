import { cardsContainer } from "./script.js";
import { fetchSuperhero } from "./superheroDetail.js";

let favs=[];
const favheadericon=document.getElementById('favIcon');
export const likedContainer=document.querySelector('.likedContainer');

//Header favourites page opening event
favheadericon.addEventListener('click',function(){
    displayLikedHeroes();
});

//Function to change the like image on each character card and call the corresponding function -to add a card to favourites list or to remove the card from favourites list 
export function changeImg(img, cardDiv, character) {
    console.log(img);
    console.log(cardDiv);

    if (cardDiv.getAttribute('data-status') === 'liked') {
        cardDiv.setAttribute('data-status', 'not-liked');
        img.setAttribute('src', './images/like.png'); // Update the source for the like icon
    } else {
        cardDiv.setAttribute('data-status', 'liked');
        img.setAttribute('src', './images/favouritesicon.png'); // Update the source for the favorites icon
    }

    let status = cardDiv.getAttribute('data-status');
    if (status === 'liked') {
        addToFavList(character);
    } else {
        removeFromFavList(character);
    }
}

//Function to add a liked character to favourites list
 function addToFavList(character){
    const foundIndex = favs.findIndex(obj => obj.id === character.id);
if(foundIndex!=-1){
    return;
}
favs.push(character);
// console.log("favs add "+favs);
updateList();

}


//Function to remove a character from favourites list
function removeFromFavList(character){
    const foundIndex = favs.findIndex(obj => obj.id === character.id);
favs.splice(foundIndex,1);
updateList();
//    console.log("favs del "+favs);
}

//Function to re-render the changes
function updateList(){
    likedContainer.innerHTML='';
    favs.forEach((element) => {
        const cardDiv=document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('data-status','not-liked');
        cardDiv.setAttribute('id',`${element.id}`);
        const imgDiv=document.createElement('div');
    imgDiv.classList.add('character-img-container');
    const img=document.createElement('img');
    img.src=`${element.thumbnail["path"]+"."+element.thumbnail["extension"]}`;
    img.alt="character thumbnail";
    
    const aboutDiv=document.createElement('div');
    aboutDiv.classList.add('card-about');
    const para=document.createElement('p');
    para.textContent=element.name;
    const span=document.createElement('span');
    span.classList.add('unlikeSpan');
    const img2=document.createElement('img');
    img2.src="./images/unlike.png";
    img2.alt="remove from favourites";
    img2.id="unlikeImg";
    img2.className="";
    img2.addEventListener('click',function(){
    removeFromFavList(element);
    })
    cardDiv.addEventListener('click',(event)=>{
        if(event.target.matches('#unlikeImg')){
            event.preventDefault();
        }else{
        fetchSuperhero(element.id);
        // console.log('fav called details');
        }
        });
    span.appendChild(img2);
    aboutDiv.appendChild(para);
    aboutDiv.appendChild(span);
    cardDiv.append(imgDiv,aboutDiv);
    imgDiv.appendChild(img);
    likedContainer.appendChild(cardDiv); 
    })
    saveData();
}

//Function to toggle the appearance of cards container or homepage with the favourites page 
function displayLikedHeroes() {
    if (cardsContainer.style.display !== "none") {
        cardsContainer.style.display = "none";
        likedContainer.style.display = "flex";
    } else if(cardsContainer.style.display !== "flex"){
        cardsContainer.style.display = "flex";
        likedContainer.style.display = "none";

    }
}

//Function for saving necessary data to local storage to prevent losing it in case of browser refresh
function saveData() {
    localStorage.setItem("liked", likedContainer.innerHTML);
}
  
//Function to show liked characters (if added earlier) by retrieving from local storage
function showData() {
    likedContainer.innerHTML = localStorage.getItem("liked");
}

showData();
