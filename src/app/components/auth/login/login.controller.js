function LoginController(authService, $state, spinnerService) {
  this.title = "Login Component";

  this.onLogin = function ($event) {
    spinnerService.show('app-spinner');
    authService
      .login($event.user)
      .then(function () {
        console.log('logged in');
        spinnerService.closeAll();
        $state.go('app');
      })
      .finally(function () {
        spinnerService.closeAll();
      })
  }
}

angular
  .module('auth')
  .controller('LoginController', LoginController);