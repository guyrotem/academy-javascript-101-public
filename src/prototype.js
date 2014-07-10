"use strict";

var Animal = function (name) {
  if (name) {
    this._name = name;
  }
};
Animal.prototype.speak = function () {
  return this.sound;
};
Animal.prototype._name = 'Default animal';

var Mammal = function (name) {

};
Mammal.prototype = Animal;

var Dog = function (name) {

};
Dog.prototype = Animal;
Dog.prototype.sound = 'Woof';

