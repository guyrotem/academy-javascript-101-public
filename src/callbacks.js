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
