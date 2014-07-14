"use strict";

describe('functional programming', function () {
  function returnTrue() {
    return true;
  }

  function returnFalse() {
    return false;
  }

  function echo(_echo) {
    return _echo;
  }

  function isPositive(number) {
    return number > 0;
  }

  describe('createMultiplier(multiplyBy)', function () {
    it('should return a multiplication function', function () {
      var mul = createMultiplier(10);
      expect(mul(-1)).toBe(-10);
      expect(mul(0)).toBe(0);
      expect(mul(100)).toBe(1000);
    });
    it('should return a function with a static member multiplyBy', function () {
      var mul = createMultiplier(10);
      expect(mul.multiplyBy).toBe(10);
    });
  });

  describe('createAllOfFilter(conditionsArray) returns a function that', function () {
    describe('when there are no conditions', function () {
      it('should return true', function () {
        var filter1 = createAllOfFilter([]);
        var filter2 = createAllOfFilter();

        expect(filter1()).toBeTruthy();
        expect(filter2()).toBeTruthy();
      });
    });

    describe('when the condition are functions', function () {
      it('should return true if all the conditions return true', function () {
        var filter = createAllOfFilter([returnTrue, returnTrue, returnTrue]);

        expect(filter()).toBeTruthy();
      });

      it('should return true if all the conditions return true for the arguments passed', function () {
        var filter = createAllOfFilter([echo, echo]);

        expect(filter(true)).toBeTruthy();
      });

      it('should return false if some conditions return false', function () {
        var filter = createAllOfFilter([returnTrue, returnFalse]);

        expect(filter()).toBeFalsy();
      });
    });

    describe('when the conditions are not functions', function () {
      it('should be ignored', function () {
        var filter = createAllOfFilter([returnTrue, false, {}]);

        expect(filter()).toBeTruthy();
      });
    });
  });

  describe('transformArray(array, conditionsArray, modifier)', function () {
    it('should return an array of filtered items', function () {
      expect(transformArray([-1, 0, 1], [isPositive])).toEqual([1]);
    });

    it('should modify the filtered array if a modifier was provided', function () {
      expect(transformArray([-1, 0, 1], [isPositive]), createMultiplier(10)).toEqual([10]);
      expect(transformArray([-1, 0, 1, 2], [isPositive]), function square(item) {
        return item * item;
      }).toEqual([1, 4]);
    });
  });
});