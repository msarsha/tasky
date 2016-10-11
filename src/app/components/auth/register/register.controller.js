function RegisterController(authService, $state) {
  this.title = 'Register Component';

  this.onRegister = function($event){
    authService
      .register($event.user)
      .then(function(){
        console.log('registered !');
        $state.go('app');
      })
  }

}

angular 
  .module('auth')
  .controller('RegisterController', RegisterController);