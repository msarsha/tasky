function ToolbarController($rootScope) {
  this.showNav = function(){
    $rootScope.$broadcast('navOpen');
  }
}

angular
  .module('app')
  .controller('ToolbarController', ToolbarController);