"use strict";
function createMultiplier(multiplyBy) {
  return function (x) {
    return multiplyBy * x;
  }
}