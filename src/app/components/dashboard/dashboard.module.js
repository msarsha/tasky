angular
  .module('dashboard', [
    'ui.router'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.tasks', {
        url: '/tasks',
        component: 'dashboard'
      })
  });
