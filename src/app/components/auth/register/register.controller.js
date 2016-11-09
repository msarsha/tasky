function RegisterController(authService, $state, spinnerService) {
  this.title = 'Register Component';

  this.onRegister = function ($event) {
    spinnerService.show('app-spinner');
    authService
      .register($event.user)
      .then(function () {
        console.log('registered !');
        $state.go('app');
      })
      .catch(function (err) {
        self.error = err.message;
      })
      .finally(function () {
        spinnerService.closeAll();
      })
  }

}

angular
  .module('auth')
  .controller('RegisterController', RegisterController);