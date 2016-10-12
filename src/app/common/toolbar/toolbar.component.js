var toolbar = {
  templateUrl: './toolbar.component.html',
  controller: 'ToolbarController',
  bindings: {
    user: '@',
    onLogout: '&'
  }
}

angular
  .module('app')
  .component('toolbar', toolbar);