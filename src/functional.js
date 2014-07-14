"use strict";
function createMultiplier(multiplyBy) {
  function multiply(x) {
    return multiplyBy * x;
  }

  multiply.multiplyBy = multiplyBy;

  return multiply;
}

function createAllOfFilter(conditionsArray) {
  if (conditionsArray && conditionsArray.length) {
    conditionsArray = conditionsArray.filter(function (condition) {
      return condition instanceof Function;
    });

    return function (item) {
      return conditionsArray.every(function (condition) {
        return condition(item);
      });
    };
  }


  return function trivialTrueFilter() {
    return true;
  };
}

function transformArray(array, conditionsArray, modifier) {
  return array.filter(createAllOfFilter(conditionsArray));
}