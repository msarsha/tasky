angular
  .module('projects', [])
  .config(function ($stateProvider) {
    $stateProvider.state('app.newproject', {
      url: '/new',
      component: 'projectNew'
    })
  });