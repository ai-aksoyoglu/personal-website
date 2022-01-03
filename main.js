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

function openDicePage() {
  window.open((href = 'dice.html'));
}
