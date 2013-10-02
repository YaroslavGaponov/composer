var fs = require('fs');

var Composer = require('../index.js');

// create storage...
var storage = new Composer.Storage();

// read some text examples
var text = fs.readFileSync('./test.txt').toString();

// generate data
var maker = Composer.Maker(storage);
maker.parse(text);

// print tree
console.log('STORAGE');
console.log(storage._data);
console.log();

// print 10 sentenses
console.log('TEXT');
var composer = Composer.Composer(storage, 4);
for(var i=0; i<5; i++) {
    console.log(composer.speak());
}
