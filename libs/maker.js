/*
 * copyright (c) 2013 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
 */

var Helper = require('./helper.js');

var Maker = module.exports = function(storage, length) {
    if (this instanceof Maker) {
        this.storage = storage;
        this.storage.setMetadata('length', length || 2);
    } else {
        return new Maker(storage, length);
    }
}

Maker.prototype.addDocument = function(text) {

    var keys;
    var acc;
    var phrase;;

    for(var i=0; i<text.length; i++) {
        if (Helper.isAlphabet(text[i])) {
            
            keys = new Array(this.storage.getMetadata('length'));
            for(var j=0;j<keys.length;j++) {
                keys[j] = Helper.START;
            }
            
            acc = '';
            phrase = false;
            
            sentense:
            for(;i<text.length;i++) {
                if (phrase) {
                    acc += text[i];
                    if (Helper.isPhrase(text[i])) {
                        if (acc != '') {
                            this.storage.set(keys, acc);
                            keys.shift();
                            keys.push(acc);                        
                            acc = '';
                        }
                        phrase = false;
                    }                    
                } else if (Helper.isDelimeter(text[i])) {
                    if (acc != '') {
                        this.storage.set(keys, acc);
                        keys.shift();
                        keys.push(acc);
                        acc = '';
                    }                    
                } else if (Helper.isSeparator(text[i])) {
                    if (acc != '') {
                        this.storage.set(keys, acc);
                        keys.shift();
                        keys.push(acc);                        
                        acc = '';
                    }                        
                    this.storage.set(keys, text[i]);
                    keys.shift();                    
                    keys.push(text[i]);                    
                } else if (Helper.isEOS(text[i])) {
                    if (acc != '') {
                        this.storage.set(keys, acc);
                        keys.shift();
                        keys.push(acc);                        
                        acc = '';
                    }                        
                    this.storage.set(keys, text[i]);
                    break sentense;
                } else if (Helper.isPhrase(text[i])) {
                    acc += text[i];
                    phrase = true;
                } else if (Helper.isAlphabet(text[i])) {
                    acc += text[i];
                }
            }
        }
    }
    
    if (acc != '') {
        this.storage.set(keys, acc);
    }    

}
