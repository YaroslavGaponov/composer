
var fs = require('fs');
var Composer = require('./composer');

var storage = new Composer.MemoryStorage();

var maker = Composer.Maker(storage);
var text = fs.readFileSync('./test.txt').toString();
maker.parse(text);

console.log(storage._data);


var composer = Composer.Composer(storage);
console.log(composer.speak());


