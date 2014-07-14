"use strict";

describe('prototype', function () {
  describe('guidelines:', function(){
      it('define 3 new global types: Animal, Mammal and Dog', function() {
        expect(typeof Animal).toBe('function');
        expect(typeof Mammal).toBe('function');
        expect(typeof Dog).toBe('function');
      });

    it('Mammal should extend Animal', function () {
      var mammal = new Mammal();
      expect(mammal instanceof Mammal).toBeTruthy();
      expect(mammal instanceof Animal).toBeTruthy();
    });

    it('Dog should extend Mammal', function () {
      var dog = new Dog();
      expect(dog instanceof Dog).toBeTruthy();
      expect(dog instanceof Mammal).toBeTruthy();
    });
  });

  describe('Animal', function () {
    it('should default to string: Default is an animal with 100 legs that says "Kukukuchoo"', function () {
      var animal = new Animal();

      expect(animal.toString()).toBe('Default is an animal with 100 legs that says "Kukukuchoo"');
    });

    it('should accept a name as constructor argument', function () {
      var animal = new Animal('Joe');

      expect(animal.toString()).toBe('Joe is an animal with 100 legs that says "Kukukuchoo"');
    })
  });

  describe('Mammal', function () {
    it('should default to string: Default is a mammal with 4 legs that says "Kukukuchoo"', function () {
      var mammal = new Mammal();

      expect(mammal.toString()).toBe('Default is a mammal with 4 legs that says "Kukukuchoo"');
    });

    it('should be cast to the string: Albert is a mammal with 4 legs that says "Kukukuchoo"', function () {
      var mammal = new Mammal('Albert');

      expect(mammal.toString()).toBe('Albert is a mammal with 4 legs that says "Kukukuchoo"');
    });
  });

  describe('Dog', function () {
    var dog;
    beforeEach(function () {
      dog = new Dog('Jacko');
    });

    it('should say "Woof"', function () {
      expect(dog.speak()).toBe('Woof');
    });

    it('should not override #speak', function () {
      expect(dog.hasOwnProperty('speak')).toBeFalsy();
    });

    it('should be cast to the string: Jacko is a dog with 4 legs that says "Woof"', function () {
      expect('' + dog).toBe('Jacko is a dog with 4 legs that says "Woof"');
    });
  });
});