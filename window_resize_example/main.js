const div = document.querySelector('div');
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

div.style.width = winWidth + 'px';
div.style.height = winHeight + 'px';

window.onresize = function () {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    div.style.width = winWidth + 'px';
    div.style.height = winHeight + 'px';
}