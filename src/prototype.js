'use strict';

//  CTOR
function Animal(name)
{
    if(name)
    {
        this.name = name;
    }
    this.creatureType = 'an animal';
    this.legsCount = 100;
    this.sound = 'Kukukuchoo';
}

Animal.prototype.toString = function() { return this.getName() + ' is ' + this.creatureType + ' with ' + this.legsCount + ' legs that says "' + this.sound + '"'}

function Mammal(name)
{
    if(name)
    {
        this.name = name;
    }
    //  Must be defined in the CTOR due to closure???
    this.creatureType = 'a mammal';
    this.legsCount = 4;
}

function Dog(name)
{
    if(name)
    {
        this.name = name;
    }
    this.creatureType = 'a dog';
    this.sound = 'Woof';
}

Animal.prototype.name = 'Default';
Animal.prototype.getName = function() { return this.name; }

Mammal.prototype = new Animal();
Mammal.legsCount = 4;
Mammal.creatureType = 'a mammal';
Dog.prototype = new Mammal();
Animal.prototype.speak = function() { return this.sound;  }
