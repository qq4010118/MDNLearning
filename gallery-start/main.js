const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */



for(let i = 1; i <= 5; i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic' + i + '.jpg');
    thumbBar.appendChild(newImage);
}
/* Wiring up the Darken/Lighten button */
thumbBar.addEventListener("click", function(event){
    let src = event.target.getAttribute('src') ;
    displayedImage.setAttribute('src', src);
});

btn.addEventListener("click", function(event){
    if(event.target.getAttribute('class') === "dark"){
        event.target.setAttribute('class', "light");
        event.target.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
       
    } else{
        event.target.setAttribute('class', "dark");
        event.target.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
});
