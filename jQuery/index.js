$('h1').css('color', 'green');

$('button').html("<em>Don't</em> click me");

console.log($('img').attr('src'));
$('a').attr('href', 'https://yahoo.com');

$('h1').click(function () {
  $('h1').css('color', 'purple');
});
