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

$('.dice-page').on('click', function () {
  window.open((href = 'dice.html'));
});

$('.drums-page').on('click', function () {
  window.open((href = 'drums.html'));
});

$('.simon-page').on('click', function () {
  window.open((href = 'simon.html'));
});

$('.bmi-page').on('click', function () {
  window.open((href = 'http://localhost:3000/bmi'));
});

$('.weather-page').on('click', function () {
  window.open((href = 'http://localhost:3000/weather'));
});

$('.newsletter-signup-page').on('click', function () {
  window.open((href = 'http://localhost:3000/newsletter-signup'));
});

$('.todolist-page').on('click', function () {
  window.open((href = 'http://localhost:3000/todolist'));
});

$('.about-page').on('click', function () {
  window.open((href = 'http://localhost:3000/'));
});
