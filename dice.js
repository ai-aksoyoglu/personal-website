document
  .getElementsByClassName('btn dice-roll')
  .item(0)
  .addEventListener('click', diceRoll);

var scorePlayer1 = 0;
var scorePlayer2 = 0;
localStorage.setItem('scorePlayer1', scorePlayer1);
localStorage.setItem('scorePlayer2', scorePlayer2);
document.querySelector('p').innerHTML =
  'Player 1 : Player 2 <br>' +
  localStorage.getItem('scorePlayer1') +
  ' : ' +
  localStorage.getItem('scorePlayer2');

function diceRoll() {
  var player1 = 1 + Math.floor(Math.random() * 5);
  var player2 = 1 + Math.floor(Math.random() * 5);

  if (player1 > player2) {
    document.getElementsByClassName('player1').item(0).src =
      'assets/dice/dice' + player1 + '.png';
    document.getElementsByClassName('player2').item(0).src =
      'assets/dice/dice' + player2 + '.png';
    document.querySelector('h1').innerHTML = '🚩 Player 1';
    newscore = +localStorage.getItem('scorePlayer1');
    localStorage.setItem('scorePlayer1', newscore + 1);
  } else if (player2 > player1) {
    document.getElementsByClassName('player1').item(0).src =
      'assets/dice/dice' + player1 + '.png';
    document.getElementsByClassName('player2').item(0).src =
      'assets/dice/dice' + player2 + '.png';
    document.querySelector('h1').innerHTML = 'Player 2 🚩';
    newscore = +localStorage.getItem('scorePlayer2');
    localStorage.setItem('scorePlayer2', newscore + 1);
  } else {
    document.getElementsByClassName('player1').item(0).src =
      'assets/dice/dice' + player1 + '.png';
    document.getElementsByClassName('player2').item(0).src =
      'assets/dice/dice' + player2 + '.png';
    document.querySelector('h1').innerHTML = 'Draw!';
  }
  document.querySelector('p').innerHTML =
    'Player 1 : Player 2 <br>' +
    localStorage.getItem('scorePlayer1') +
    ' : ' +
    localStorage.getItem('scorePlayer2');
  document.querySelector('button').innerHTML = 'Try again!';
}
