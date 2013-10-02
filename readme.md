
info
========
Composer - text generator


Example
========

```javascript

var util = require('util');
var fs = require('fs');

var Composer = require('../index.js');

// create storage...
var storage = new Composer.Storage();

// read some text examples
var text = fs.readFileSync('./test.txt').toString();

// generate database
var maker = Composer.Maker(storage, 3);
maker.addDocument(text);

// print tree
console.log('STORAGE');
console.log(util.inspect(storage._data,{ showHidden: false, depth: 3 }));
console.log();

// print 5 sentences
console.log('TEXT');
var composer = Composer.Composer(storage);
var sentences = [];
while(sentences.length < 5) {
    var sentence = composer.speak();
    if (sentences.indexOf(sentence) === -1) {
        sentences.push(sentence);
    }
}
console.log(sentences.join(' ').toString());

```

