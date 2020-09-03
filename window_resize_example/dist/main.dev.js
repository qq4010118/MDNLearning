"use strict";

var div = document.querySelector('div');
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
div.style.width = winWidth + 'px';
div.style.height = winHeight + 'px';

window.onresize = function () {
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
  div.style.width = winWidth + 'px';
  div.style.height = winHeight + 'px';
};