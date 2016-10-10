function RegisterController() {
  this.title = 'Register';

  this.onRegister = function($event){
    console.log($event)
  }

}

angular 
  .module('auth')
  .controller('RegisterController', RegisterController);