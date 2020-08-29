import currencies from './currencies';

export default function createDropdown (inputContainerID, historyConversions = null) {
  const dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');

  const listUl = document.createElement('ul');
  listUl.classList.add('list');

  currencies.forEach(c => {
    const li = document.createElement('li');
    li.id = c.value;
    li.dataset.icon = c.icon;
    li.innerHTML = `<img src="assets/countries/${c.icon}" width="24" alt="${c.value}">${c.value}`;
    listUl.appendChild(li);
  });

  // create input with img and set values
  const input = createInput();
  const imgInput = createIMG();

  if (historyConversions && historyConversions.query) {
    input.value = inputContainerID === 'ifrom-currency'
      ? historyConversions.query.from
      : historyConversions.query.to;

    imgInput.src = 'assets/countries/' + (inputContainerID === 'ifrom-currency'
      ? currencies.find(c => c.value === historyConversions.query.from).icon
      : currencies.find(c => c.value === historyConversions.query.to).icon
    );
  }
  else {
    input.value = inputContainerID === 'ifrom-currency' ? currencies[0].value : currencies[1].value;
    imgInput.src = 'assets/countries/' + (inputContainerID === 'ifrom-currency' ? currencies[0].icon : currencies[1].icon);
  }

  let inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container', 'd-flex');
  inputContainer.id = inputContainerID;

  inputContainer.appendChild(imgInput);
  inputContainer.appendChild(input);
  // end create input with img and set values

  dropdown.appendChild(inputContainer);
  dropdown.appendChild(listUl);

  document.querySelector('.drops').appendChild(dropdown);

  let show = false;
  dropdown.addEventListener('click', (e) => {
    show = !show;
    listUl.style.display = show ? "inline" : "none";
    if (e.target.id !== inputContainerID && e.target.dataset && e.target.nodeName === 'LI') {
      input.value = e.target.id;
      imgInput.src = 'assets/countries/' + e.target.dataset.icon;
    }
  }, false);
}

function createInput () {
  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('field');
  input.readOnly = 'readonly';
  return input;
}

function createIMG () {
  const img = document.createElement('img');
  img.classList.add('img-input');
  return img;
}
