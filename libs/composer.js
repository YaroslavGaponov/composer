/*
 * copyright (c) 2013 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
 */

var Helper = require('./helper.js');

var Composer = module.exports = function(storage) {
    if (this instanceof Composer) {
        this.storage = storage;
    } else {
        return new Composer(storage);
    }
}

Composer.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Composer.prototype.speak = function(keys) {
    if (!keys)  {
        keys = new Array(this.storage.getMetadata('length'));
        for(var i=0; i<keys.length; i++) {
            keys[i] = Helper.START;;
        }
    }
    
    var words = this.storage.get(keys);
    var word = words[Composer.getRandomInt(0, words.length - 1)];
    
    if (Helper.isEOS(word)) {
        return word;
    }
    
    keys.shift();
    keys.push(word);
    
    return word + ' ' + this.speak(keys);
}
