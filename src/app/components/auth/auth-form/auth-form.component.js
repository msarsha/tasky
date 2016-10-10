var authForm = {
  bindings: {
    buttonValue: '@',
    onSubmit: '&'
  },
  templateUrl: './auth-form.component.html',
  controller: 'AuthFormController'
};

angular
  .module('auth')
  .component('authForm', authForm);