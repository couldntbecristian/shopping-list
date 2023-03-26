const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // // Create list item
  // const li = document.createElement('li');
  // li.appendChild(document.createTextNode(newItem));

  // const button = createButton('remove-item btn-link text-red');
  // li.appendChild(button);

  // // Add li to DOM  
  // itemList.appendChild(li);

  // Create item DOM element
  addItemToDOM(newItem)

  // Add item to local storage
  addItemToStorage(newItem)

  checkUI()
  itemInput.value = '';
}

function addItemToDOM(item){
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add li to DOM  
  itemList.appendChild(li);
}

// Local storage
function addItemToStorage(item){
  let itemsFromStorage

  if(localStorage.getItem('items') === null){
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    // JSON.parse(localStorage.getItem('items')) is used to retrieve the array of items from localStorage (which has been stored as a JSON string), and convert it back into a JavaScript array.
  }

  // Add new item to array
  itemsFromStorage.push(item)

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
  // localStorage.setItem is a method that is used to store a key-value pair in the local storage. The first parameter is the key, in this case, 'items', and the second parameter is the value, which is the stringified version of the itemsFromStorage array.

// JSON.stringify() is a built-in method in JavaScript that converts a JavaScript object or value to a JSON string. In this case, it takes the itemsFromStorage array and converts it to a JSON string so that it can be stored in the browser's local storage.
}
// How addItemToStorage() works:
// First, it checks if there is anything in local storage under the key 'items'. If there isn't, it initializes an empty array. If there is, it retrieves the array from local storage and parses it into a JavaScript array using JSON.parse().
// Next, the new item is added to the array using push().
// Finally, the updated array is converted to a JSON string using JSON.stringify() and set back into local storage under the key 'items' using localStorage.setItem().


// localStorage.setItem('name', 'brad')
// console.log(localStorage.getItem('name'))
// // localStorage.removeItem('name')
// localStorage.clear()

// local storage example:
// const myArray = [1, 2, 3];
// localStorage.setItem('myKey', JSON.stringify(myArray));

// This stores the array [1, 2, 3] in localStorage under the key 'myKey', but as a JSON string.
// Later, when you want to retrieve the array from localStorage, you use localStorage.getItem('myKey') to get the JSON string value. This is where JSON.parse() comes in - it is used to convert the JSON string back into the original JavaScript object. For example:

// const myArrayFromStorage = JSON.parse(localStorage.getItem('myKey'));
// console.log(myArrayFromStorage); // outputs: [1, 2, 3]

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}


// remove items
function removeItem(e){
  if(e.target.tagName === 'I'){
    if (window.confirm('Are you sure?')){
      e.target.closest('li').remove()

      checkUI()
    }
  }
}


// clear all items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI()
}


// filter items
function filterItems (e){
  const items = itemList.querySelectorAll('li')
  const text = e.target.value.toLowerCase()

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase()

    if(itemName.indexOf(text) != -1){
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}


// check ui
function checkUI(){
  const items = itemList.querySelectorAll('li')
  
  if(items.length === 0){
    clearBtn.style.display = 'none'
    itemFilter.style.display = 'none'
  } else {
    clearBtn.style.display = 'block'
    itemFilter.style.display = 'block'
  }
}


// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems)

checkUI()

