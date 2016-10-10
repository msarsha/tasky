function LoginController() {
  this.title = "Login Component";

  this.onLogin = function($event){
    console.log($event);
  }
}

angular 
  .module('auth')
  .controller('LoginController', LoginController);