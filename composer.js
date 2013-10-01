

var MemoryStorage = module.exports.MemoryStorage = function() {
    if (this instanceof MemoryStorage) {
        this._data = {};
    } else {
        return new MemoryStorage();
    }
}


MemoryStorage.prototype.set = function(key, value) {
    if (this._data[key[0]]) {
        if (this._data[key[0]][key[1]]) {
            this._data[key[0]][key[1]].push(value);
        } else {
            this._data[key[0]][key[1]] = [value];
        }
    } else {
        this._data[key[0]] = {};
        this._data[key[0]][key[1]] = [value];
    }    
}


MemoryStorage.prototype.get = function(key) {
    if (this._data[key[0]]) {
        if (this._data[key[0]][key[1]]) {
            return this._data[key[0]][key[1]];
        } else {
            return [];
        }
    } else {
        return [];
    }    
}



var Maker = module.exports.Maker = function(storage) {
    if (this instanceof Maker) {
        this.storage = storage;
    } else {
        return new Maker(storage);
    }
}

Maker.isEOS = function(ch) {
    return "\.\?\!".indexOf(ch)!== -1;
}

Maker.isSeparator = function(ch) {
    return "\,\;\:".indexOf(ch) !== -1;
}

Maker.isDelimeter = function(ch) {
    return "\n\t\ ".indexOf(ch) !== -1;
}

Maker.isNumber = function(ch) {
    return ch >= '0' && ch <= '9';
}

Maker.isAlphabet = function(ch) {
    return !Maker.isEOS(ch) && !Maker.isSeparator(ch) && !Maker.isDelimeter(ch) && !Maker.isNumber(ch);
}

Maker.prototype.parse = function(text) {

    var key;
    var acc;

    for(var i=0; i<text.length; i++) {
        if (Maker.isAlphabet(text[i])) {
            key = ['start','start'];
            acc = '';
            sentense:
            for(;i<text.length;i++) {
                if (Maker.isDelimeter(text[i])) {
                    if (acc != '') {
                        this.storage.set(key, acc);                        
                        key[0] = key[1];
                        key[1] = acc;
                        acc = '';
                    }                    
                } else if (Maker.isSeparator(text[i])) {
                    if (acc != '') {
                        this.storage.set(key, acc);
                        key[0] = key[1];
                        key[1] = acc;
                        acc = '';
                    }                        
                    this.storage.set(key, text[i]);
                    key[0] = key[1];
                    key[1] = text[i];                                                                    
                } else if (Maker.isEOS(text[i])) {
                    if (acc != '') {
                        this.storage.set(key, acc);
                        key[0] = key[1];
                        key[1] = acc;
                        acc = '';
                    }                        
                    this.storage.set(key, text[i]);
                    break sentense;
                } else if (Maker.isAlphabet(text[i])) {
                    acc += text[i];
                }
            }
        }
    }
    
    if (acc != '') {
        this.storage.set(key, acc);
    }    

}


var Composer = module.exports.Composer = function(storage) {
    if (this instanceof Composer) {
        this.storage = storage;
    } else {
        return new Composer(storage);
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Composer.prototype.speak = function(key) {
    if (!key)  {
        key = ['start','start'];
    }
    
    var words = this.storage.get(key);
    var word = words[getRandomInt(0, words.length - 1)];
    
    if (Maker.isEOS(word)) {
        return word;
    }
    
    key[0] = key[1];
    key[1] = word;
    
    return word + ' ' + this.speak(key);
}




