import {url} from './configApi.js';
import {changeImg } from './favourites.js';
import { fetchSuperhero } from './superheroDetail.js';

export const cardsContainer=document.querySelector('.cardsContainer');
export let characters; //characters is an array of characters fetched
export * as searchMe from './search.js';

const modeBtn=document.getElementById('modeChangeIcon');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const copyright=document.querySelector('.footerText');
let currentPage = 1; // Keep track of the current page
const itemsPerPage = 20; // Number of items to fetch per page

//Function to fetch the data from the API
async function fetchURL(){
    const offset = (currentPage - 1) * itemsPerPage;
    const response = await fetch(`${url}&offset=${offset}`);
    const jsonData = await response.json();
    copyright.innerHTML=jsonData.attributionHTML
    characters = jsonData.data.results;

    // console.log(jsonData);
    // console.log(characters);
    addCards();
}

//Function to render the homepage with the fetched data
function addCards(){
    cardsContainer.innerHTML='';
    characters.forEach((element) => {
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
span.classList.add('likeSpan');
const img2=document.createElement('img');
img2.src="./images/like.png";
img2.alt="add to favourites";
img2.id="likeImg";
img2.className="";
img2.addEventListener('click',function(){
    changeImg(this,cardDiv,element);
})
cardDiv.addEventListener('click',(event)=>{
    if(event.target.matches('#likeImg')){
        event.preventDefault();
    }else{
    fetchSuperhero(element.id);
    }
});
span.appendChild(img2);
aboutDiv.appendChild(para);
aboutDiv.appendChild(span);
cardDiv.append(imgDiv,aboutDiv);
imgDiv.appendChild(img);
cardsContainer.appendChild(cardDiv);    
    });
    
}

//Event handler to fetch the data once whole DOM content is loaded 
document.addEventListener('DOMContentLoaded', function () {
    fetchURL();

});

//Event handler to change the dark and light mode of homepage,superhero display page and favourites page
modeBtn.addEventListener('click', function () {
    const container = document.querySelector('.container');
    const container2 = document.querySelector('.container2');
    if (!container.classList.contains('modeChanged')) {
        container.classList.add('modeChanged');
        container2.classList.add('modeChanged');
        container2.classList.add('modeChangedp');
    } else {
        container.classList.remove('modeChanged');
        container2.classList.remove('modeChanged');
        container2.classList.remove('modeChangedp');
    }
});

//Event handler to fetch the next few results as set in the limit from the api
nextBtn.addEventListener('click', function () {
    currentPage++;
    fetchURL();
});

//Event handler to fetch the previous few results as set in the limit from the api 
prevBtn.addEventListener('click', function () {
    if(currentPage<=0){
        return;
    }
    currentPage--;
    fetchURL();
});