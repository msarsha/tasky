function AppController(authService, $state){
  this.title = 'App Component';

  this.$onInit = function(){
    this.user = authService.getUser();
  }

  this.logout = function(){
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