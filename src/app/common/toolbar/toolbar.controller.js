function ToolbarController() {
  this.logout = function(){
    this.onLogout();
  }
}

angular
  .module('app')
  .controller('ToolbarController', ToolbarController);