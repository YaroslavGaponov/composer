/*
 * copyright (c) 2013 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
 */

var util = require('util');

var MemoryStorage = module.exports = function() {
    if (this instanceof MemoryStorage) {
        this._data = {};
        this._metadata = {};
    } else {
        return new MemoryStorage();
    }
}


MemoryStorage.prototype.set = function(keys, value) {
    if (!keys) {
        throw new Error('Incorrect input parameters.');
    }
    
    if (!util.isArray(keys)) {
        keys = [keys];
    }
    
    var ref = this._data;    
    for(var i=0; i<keys.length-1; i++) {
        if (!ref[keys[i]]) {
            ref[keys[i]] = {};
        }
        ref = ref[keys[i]];
    }
    
    if (ref[keys[i]]) {
        ref[keys[i]].push(value);
    } else {
        ref[keys[i]] = [value];
    }
}


MemoryStorage.prototype.get = function(keys) {
    if (!keys) {
        throw new Error('Incorrect input parameters.');
    }
    
    if (!util.isArray(keys)) {
        keys = [keys];
    }
    
    var ref = this._data;    
    for(var i=0; i<keys.length-1; i++) {
        if (!ref[keys[i]]) {
            return [];
        }
        ref = ref[keys[i]];
    }
    return ref[keys[i]];
}

MemoryStorage.prototype.setMetadata = function(name, value) {
    this._metadata[name] = value;
}

MemoryStorage.prototype.getMetadata = function(name) {
    return this._metadata[name];
}
