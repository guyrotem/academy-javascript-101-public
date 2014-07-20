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

Animal.prototype.toString = function () { return this.getName() + ' is ' + this.creatureType + ' with ' + this.legsCount + ' legs that says "' + this.sound + '"'}
Animal.prototype.name = 'Default';
Animal.prototype.getName = function () { return this.name; };
Animal.prototype.speak = function () { return this.sound;  };

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

Mammal.prototype = new Animal();
//Mammal.legsCount = 4;
//Mammal.creatureType = 'a mammal';

function Dog(name)
{
    if(name)
    {
        this.name = name;
    }
    this.creatureType = 'a dog';
    this.sound = 'Woof';
}


Dog.prototype = new Mammal();

