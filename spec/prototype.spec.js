describe('prototype', function(){
    describe('Dog', function(){
      var dog;
      beforeEach(function(){
        dog = new Dog('Jacko');
      });

      it('should say "Woof"', function(){
        expect(dog.speak()).toBe('Woof');
      });

      it('should be an instance of Dog, Animal and Mammal', function(){
        expect(dog instanceof Dog).toBeTruthy();
        expect(dog instanceof Mammal).toBeTruthy();
        expect(dog instanceof Animal).toBeTruthy();
      });

      it('should say "Woof"', function(){
        expect(dog.speak()).toBe('Woof');
      });

      it('should not override #speak', function(){
        expect(dog.hasOwnProperty('speak')).toBeFalsy();
      });
    });
});