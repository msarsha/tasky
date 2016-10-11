var projectForm = {
  templateUrl: './project-form.component.html',
  controller: 'ProjectFormController',
  bindings: {
    buttonValue: '@',
    onSubmit: '&',
    project: '<'
  }
}

angular
  .module('projects')
  .component('projectForm', projectForm);