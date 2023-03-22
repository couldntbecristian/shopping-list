const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);

  itemInput.value = '';
}

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

// Event Listeners
itemForm.addEventListener('submit', addItem);



const rowWeights = arr => {
  let a = []
  let b = []

  arr.forEach((v, i) => {
    if (i %2 === 0){
      a.push(v)
    } else {
      b.push(v)
    }
  })

  let aTotal = a.reduce((a, c) => a + c, 0)
  let bTotal =  b.reduce((a,c) => a + c, 0)

  return [(aTotal, bTotal)]
}
console.log(rowWeights([80, 0]))