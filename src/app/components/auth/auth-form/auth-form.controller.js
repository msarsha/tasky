function AuthFormController (){
  this.$onInit = function(){
    this.user = {
      username: '',
      password: ''
    }
  }
  
  this.submit = function(){
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