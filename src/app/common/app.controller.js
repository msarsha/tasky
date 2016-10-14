function AppController(authService, projectService, periodService, $state){
  this.title = 'App Component';

  this.$onInit = function(){
    this.user = authService.getUser();
  }

  this.logout = function(){
    projectService.destroyConnections();
    periodService.destroyConnections();
    authService
      .logout()
      .then(function(){
        $state.go('auth.login');
      });
  }
}

angular
  .module('app')
  .controller('AppController', AppController);