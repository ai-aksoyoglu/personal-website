for (var i = 0; i < document.querySelectorAll('.drum').length; i++) {
  document.querySelectorAll('.drum')[i].addEventListener('click', function () {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}
document.addEventListener('keydown', function (event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});

function makeSound(key) {
  switch (key) {
    case 'w':
      new Audio('assets/drums/tom-1.mp3').play();
      break;
    case 'a':
      new Audio('assets/drums/tom-2.mp3').play();
      break;
    case 's':
      new Audio('assets/drums/tom-3.mp3').play();
      break;
    case 'd':
      new Audio('assets/drums/tom-4.mp3').play();
      break;
    case 'j':
      new Audio('assets/drums/snare.mp3').play();
      break;
    case 'k':
      new Audio('assets/drums/crash.mp3').play();
      break;
    case 'l':
      new Audio('assets/drums/kick-bass.mp3').play();
      break;
    default:
      console.log(this.innerHTML);
  }
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector('.' + currentKey);
  activeButton.classList.add('pressed');
  setTimeout(function () {
    activeButton.classList.remove('pressed');
  }, 100);
}
