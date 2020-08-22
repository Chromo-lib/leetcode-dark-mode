const iconsDir = 'assets/countries/';

function createDropdown (dataList, inputContainerID = 'ifrom-currency') {
  const dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');

  // create input with image
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');
  inputContainer.classList.add('d-flex');
  inputContainer.id = inputContainerID;

  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('field');
  input.value = inputContainerID === 'ifrom-currency' ? dataList[0].value : dataList[1].value;
  input.readOnly = 'readonly';

  const imgInput = document.createElement('img');
  imgInput.src = iconsDir + (inputContainerID === 'ifrom-currency' ? dataList[0].icon : dataList[1].icon);
  imgInput.classList.add('img-input');

  inputContainer.appendChild(imgInput);
  inputContainer.appendChild(input);
  // end create input with image

  const listUl = document.createElement('ul');
  listUl.classList.add('list');

  dataList.forEach(c => {
    const li = document.createElement('li');
    li.id = c.value;
    li.dataset.icon = c.icon;
    li.innerHTML = `<img src="assets/countries/${c.icon}" width="24" alt="${c.value}">${c.value}`;
    listUl.appendChild(li);
  });

  dropdown.appendChild(inputContainer);
  dropdown.appendChild(listUl);

  let show = false;
  dropdown.addEventListener('click', (e) => {
    show = !show;
    listUl.style.display = show ? "inline" : "none";
    if (e.target.id !== inputContainerID && e.target.dataset && e.target.nodeName === 'LI') {
      input.value = e.target.id;
      imgInput.src = 'assets/countries/' + e.target.dataset.icon;
    }
  }, false);

  document.querySelector('.drops').appendChild(dropdown);
}

document.addEventListener('DOMContentLoaded', () => {
  createDropdown(currencies);
  createDropdown(currencies, 'ito-currency');
});
