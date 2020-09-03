const inputItem = document.querySelector('#item');
const addButton = document.querySelector('.addBtn');
const shopList = document.querySelector('.shopList');
const testP = document.querySelector('p');


addButton.addEventListener('click', addBtnDo);

function addBtnDo() {
    let input = inputItem.value;
    inputItem.value = "";
    let listItem = document.createElement('li');
    let newSpan = document.createElement('span');
    let deleteButton = document.createElement('button');

    listItem.appendChild(newSpan);
    listItem.appendChild(deleteButton);

    newSpan.textContent = input;
    deleteButton.textContent = "delete";

    shopList.appendChild(listItem);
    deleteButton.addEventListener('click', deleteList);

    inputItem.focus();

    testP.innerHTML=input;
}


function deleteList() {
    this.parentNode.remove();
}
