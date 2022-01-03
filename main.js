/*document.addEventListener('DOMContentLoaded', function () {
  window.location.reload(true);
  function createParagraph() {
    let para = document.createElement('p');
    para.textContent = 'You clicked the button!';
    document.body.appendChild(para);
  }
  const buttons = document.querySelectorAll('.btn');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', createParagraph);
  }
});*/

document
  .getElementsByClassName('btn dice-page')
  .item(0)
  .addEventListener('click', openDicePage);

document
  .getElementsByClassName('btn drums-page')
  .item(0)
  .addEventListener('click', openDrumsPage);

function openDicePage() {
  window.open((href = 'dice.html'));
}

function openDrumsPage() {
  window.open((href = 'drums.html'));
}
