/*
 * copyright (c) 2013 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
 */


var START = module.exports.START = 'START';

var isEOS = module.exports.isEOS = function(ch) {
    return "\.\?\!".indexOf(ch)!== -1;
}

var isSeparator = module.exports.isSeparator = function(ch) {
    return "\,\;\:".indexOf(ch) !== -1;
}

var isDelimeter = module.exports.isDelimeter = function(ch) {
    return "\n\t\ ".indexOf(ch) !== -1;
}

var isNumber = module.exports.isNumber = function(ch) {
    return ch >= '0' && ch <= '9';
}

var isPhrase = module.exports.isPhrase = function(ch) {
    return ch === '"';
}

var isAlphabet = module.exports.isAlphabet = function(ch) {
    return !isEOS(ch) && !isSeparator(ch) && !isDelimeter(ch) && !isPhrase(ch);
}