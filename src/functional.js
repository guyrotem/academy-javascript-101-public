"use strict";
function createMultiplier(multiplyBy) {
  function multiply(x) {
    return multiplyBy * x;
  }
  multiply.multiplyBy = multiplyBy;

  return multiply;
}