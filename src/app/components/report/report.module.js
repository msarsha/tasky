angular
  .module('report', [])
  .config(function ($stateProvider) {
    $stateProvider.state('app.report', {
      url: '/report',
      component: 'report'
    })
  });