function ProjectFormController() {
  this.$onChanges = function(change){
    if(change.project)
      this.project = angular.copy(this.project);
  }

  this.submitForm = function(){
    this.onSubmit({
      $event: {
        project: this.project
      }
    })
  }
}

angular
  .module('projects')
  .controller('ProjectFormController', ProjectFormController);