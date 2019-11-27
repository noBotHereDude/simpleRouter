"use strict";

const router = new Router();

router.root = '/myapp';
router.add({
  name: 'root', path: '/', handler: () => console.log('root')
});
router.add({
  name: 'form', path: '/form', handler: () => console.log('form')
});
router.add({
  name: 'show-with-username', path: '/show/:id/:user', handler: (parameters) => console.log(parameters)
});
router.add({
  name: 'show', path: '/show/:id', handler: (parameters) => console.log(parameters)
});
router.add({
  name: 'login', path: '/login', handler: () => console.log('login')
});
router.add({
  name: 'logout', path: '/logout', handler: () => console.log('logout')
});

document.addEventListener("DOMContentLoaded", event => {
  // to trigger handler of first window.location
  router.navigate(window.location.href.split(router.root)[1]);

  const activeRoutes = Array.from(document.querySelectorAll('[route]'));
  activeRoutes.forEach((route) => route.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate(e.target.getAttribute('route'));
  }, false));
});
