var superheroes = require('superheroes');

superheroes.all;
//=> ['3-D Man', 'A-Bomb', …]

var mySuperheroName = superheroes.random();
//=> 'Spider-Ham'
console.log(
  mySuperheroName,
  'is one of the ' + superheroes.all.length + ' superheroes available.'
);

/* copy file.txt to file-copy.txt
const fs = require('fs');
fs.copyFileSync('file.txt', 'file-copy.txt');*/
