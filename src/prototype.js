"use strict";

var Animal = function (name) {
  if (name) {
    this.name = name;
  }
};

Animal.prototype.speak = function () {
  return this.sound;
};

Animal.prototype.toString = function() {
  return this.name + ' is ' + this.getType() + ' with ' + this.legs + ' legs that says "' + this.speak() + '"';
};

Animal.prototype.getType = function() {
  return 'an animal';
};

Animal.prototype.name = 'Default';
Animal.prototype.sound = 'Kukukuchoo';
Animal.prototype.legs = 100;

var Mammal = function (name) {
  Animal.apply(this, arguments);
};
Mammal.prototype = new Animal();
Mammal.prototype.legs = 4;
Mammal.prototype.getType = function(){
  return 'a mammal';
};

var Dog = function (name) {
  Mammal.apply(this, arguments);
};
Dog.prototype = new Mammal();
Dog.prototype.sound = 'Woof';
Dog.prototype.getType = function(){
  return 'a dog';
};
