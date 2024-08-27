const API_KEY="b90f7442592144eaaec1c8febb1fa892";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=>fetchNews("India"));
async function fetchNews(query){
   const result=await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data=await result.json();
   bindData(data.articles);   
}
function bindData(articles){
    const cardContainer=document.getElementById("cardscontainer");
    const newsCardTemplate=document.getElementById("template-news-card");
    cardContainer.innerHTML="";
   articles.forEach((article)=>{
    if(!article.urlToImage) return;
    const cardClone=newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone,article);
    cardContainer.appendChild(cardClone);
   })
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector("#news-img");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=`${article.title.slice(0,60)}...`;
    newsDesc.innerHTML=`${article.description}.slice{0,150}...`;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
    newsSource.innerHTML=`${article.source.name}.${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })

}
let currentSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem =document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav=navItem;
    currentSelectedNav.classList.add("active");
}
const searchBtn=document.getElementById("search-button");
const searchText=document.getElementById("search-text");
searchBtn.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav=null;

})
const notesBtn = document.getElementById("notes-btn");
const notesSection = document.getElementById("notes-section");
const closeNotesBtn = document.getElementById("close-notes");

notesBtn.addEventListener("click", () => {
    notesSection.classList.toggle("hidden");
});

closeNotesBtn.addEventListener("click", () => {
    notesSection.classList.add("hidden");
});

document.getElementById('save-btn').addEventListener('click', function() {
    const notesContent = document.getElementById('notes').value;
    localStorage.setItem('userNotes', notesContent);
    alert('Notes saved!');
});

document.getElementById('load-btn').addEventListener('click', function() {
    const savedNotes = localStorage.getItem('userNotes');
    if (savedNotes) {
        document.getElementById('notes').value = savedNotes;
    } else {
        alert('No saved notes found.');
    }
});
// Existing code...

// Screenshot functionality
const screenshotBtn = document.getElementById("screenshot-btn");

screenshotBtn.addEventListener("click", () => {
    html2canvas(document.body).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "screenshot.png";
        link.click();
    });
});

// Existing notes functionality...





