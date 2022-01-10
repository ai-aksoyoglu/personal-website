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

$(".dice-page").click(function () {
  window.open((href = "dice.html"));
});

$(".drums-page").click(function () {
  window.open((href = "drums.html"));
});

$(".simon-page").click(function () {
  window.open((href = "simon.html"));
});
