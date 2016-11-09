function AuthFormController() {
  this.$onInit = function () {
    this.user = {
      email: '',
      password: ''
    }

    this.error = "";
  }

  this.$onChanges = function (changes) {
  }

  this.submit = function () {
    this.onSubmit({
      $event: {
        user: this.user
      }
    });
  }
}

angular
  .module('auth')
  .controller('AuthFormController', AuthFormController);