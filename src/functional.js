"use strict";
function createMultiplier(multiplyBy) {
  function multiply(x) {
    return multiplyBy * x;
  }
  multiply.multiplyBy = multiplyBy;

  return multiply;
}

function createAllOfFilter(conditionsArray){
  return function trivialTrueFilter(){
    return true;
  }
}