"use strict";

class Route {
  constructor(name, path, handler) {
    this.name     = name;
    this.path     = path;
    this.handler  = handler;
  }

  get name() {
    return this._name;
  }
  set name(val) {
    this._name = val;
  }

  get path() {
    return this._path;
  }
  set path(val) {
    this._path = val;
  }

  get handler() {
    return this._handler;
  }
  set handler(val) {
    this._handler = val;
  }
}