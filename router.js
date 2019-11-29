"use strict";

class Router {
  constructor(root = '/') {
    this.mode   = 'history';
    this.routes = [];
    this.root   = root;
  }

  get root() {
    return this._root;
  }
  set root(val) {
    this._root = val;
  }

  get mode() {
    return this._mode;
  }
  set mode(val) {
    this._mode = val;
  }

  get routes() {
    return this._routes;
  }
  set routes(val) {
    this._routes = val;
  }

  add(route) {
    this.routes.push(new Route(route.name, route.path, route.handler));
    return this;
  }

  navigate(route) {
    route = route ? route : '';
    this.match(route);
  }

  match(route) {
    for(let i=0; i<this.routes.length; i++) {
      let paramNames = [];
      let regexPath = this.routes[i].path.replace(/([:*])(\w+)/g, (full, colon, name) => {
        paramNames.push(name);
        return '([^\/]+)';
      }) + '(?:$\/$)'; // enable routes '/show', '/show/:id' and '/show/:id/:user' to match only once

      let routeMatch = route.match(new RegExp(regexPath));
      if(routeMatch !== null) {
        let params = routeMatch
          .slice(1, routeMatch.length)
          .reduce((params, value, index) => {
            if(params === null) params = {};
            params[paramNames[index]] = value;
            return params;
          }, null);

        if(params === null) {
          this.routes[i].handler();
        } else {
          this.routes[i].handler(params);
        }
        this.location(route);
      }
    }
  }

  location(route) {
    if(this.mode === 'history') {
      window.history.pushState(null, null, this.root + route);
    } else {
      route = route.replace(/^\//, '').replace(/\/$/, '');
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + route;
    }
  }
}
