$('.calculate').click(function () {
  var player1 = 1 + Math.floor(Math.random() * 5);
  var player2 = 1 + Math.floor(Math.random() * 5);

  if (player1 > player2) {
    $('.player1').attr('src', 'assets/dice/dice' + player1 + '.png');
    $('.player2').attr('src', 'assets/dice/dice' + player2 + '.png');
    $('h1').html('🚩 Player 1');
    newscore = +localStorage.getItem('scorePlayer1');
    localStorage.setItem('scorePlayer1', newscore + 1);
  } else if (player2 > player1) {
    $('.player1').attr('src', 'assets/dice/dice' + player1 + '.png');
    $('.player2').attr('src', 'assets/dice/dice' + player2 + '.png');
    $('h1').html('Player 2 🚩');
    newscore = +localStorage.getItem('scorePlayer2');
    localStorage.setItem('scorePlayer2', newscore + 1);
  } else {
    $('.player1').attr('src', 'assets/dice/dice' + player1 + '.png');
    $('.player2').attr('src', 'assets/dice/dice' + player2 + '.png');
    $('h1').html("It's a draw!");
  }
  $('.result').html(
    'Player 1 : Player 2 <br>' +
      localStorage.getItem('scorePlayer1') +
      ' : ' +
      localStorage.getItem('scorePlayer2')
  );
  $('button').html('Try again!');
});

var scorePlayer1 = 0;
var scorePlayer2 = 0;
localStorage.setItem('scorePlayer1', scorePlayer1);
localStorage.setItem('scorePlayer2', scorePlayer2);

$('.result').html(
  'Player 1 : Player 2 <br>' +
    localStorage.getItem('scorePlayer1') +
    ' : ' +
    localStorage.getItem('scorePlayer2')
);
