$('h1').css('color', 'green');

$('button').html('<em>Hide</em> or <em>Show</em> Hello');

console.log($('img').attr('src'));
$('a').attr('href', 'https://yahoo.com');

$('h1').click(function () {
  $('h1').css('color', 'purple');
});

$('button').click(function () {
  $('h1').css('color', 'purple');
});

$('document').keypress(function (event) {
  console.log(event.key);
});

$('button').on('click', function (event) {
  $('h1')
    .slideUp()
    .slideDown()
    .animate({ opacity: 0.25 })
    .animate({ opacity: 1 });
});
