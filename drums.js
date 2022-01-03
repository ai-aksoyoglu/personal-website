for (var i = 0; i < document.querySelectorAll('.drum').length; i++) {
  document.querySelectorAll('.drum')[i].addEventListener('click', handleclick);
}

function handleclick() {
  var buttonInnerHTML = this.innerHTML;

  switch (buttonInnerHTML) {
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
