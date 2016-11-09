function LoginController(authService, $state, spinnerService) {
  var self = this;

  this.$onInit = function(){
    this.error = "";
  }

  this.onLogin = function ($event) {
    spinnerService.show('app-spinner');
    authService
      .login($event.user)
      .then(function () {
        console.log('logged in');
        $state.go('app');
      })
      .catch(function(err){
        self.error = err.message;
      })
      .finally(function () {
        spinnerService.closeAll();
      })
  }
}

angular
  .module('auth')
  .controller('LoginController', LoginController);