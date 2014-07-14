"use strict";
function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.addListener = function (event, callback) {
  if (callback) {
    this._events[event] = this._events[event] || [];
    this._events[event].push(callback);
  }
};


EventEmitter.prototype.emit = function (event, data) {
  var listeners = this._events[event] || [],
      self = this;
  listeners.forEach(function (listener) {
    listener.call(self, data);
  });
};

EventEmitter.prototype.once = function (event, callback) {
  var self = this,
      wrapper = function (data) {
        self.removeListener(event, wrapper);
        callback.call(self, data);
      };
  self.addListener(event, wrapper);
};

EventEmitter.prototype.removeListener = function (event, callback) {
  this._events[event] = _.without(this._events[event], callback)
};

function CalcPi() {
}

CalcPi.isRandomPointInUnitCircle = function () {
  var x = Math.random(),
      y = Math.random();
  return x*x + y*y <= 1;
};