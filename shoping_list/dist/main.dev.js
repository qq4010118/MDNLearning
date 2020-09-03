"use strict";

var inputItem = document.querySelector('#item');
var addButton = document.querySelector('.addBtn');
var shopList = document.querySelector('.shopList');
var testP = document.querySelector('p');
addButton.addEventListener('click', addBtnDo);

function addBtnDo() {
  var input = inputItem.value;
  inputItem.value = "";
  var listItem = document.createElement('li');
  var newSpan = document.createElement('span');
  var deleteButton = document.createElement('button');
  listItem.appendChild(newSpan);
  listItem.appendChild(deleteButton);
  newSpan.textContent = input;
  deleteButton.textContent = "delete";
  shopList.appendChild(listItem);
  deleteButton.addEventListener('click', deleteList);
  inputItem.focus();
  testP.innerHTML = input;
}

function deleteList() {
  this.parentNode.remove();
}