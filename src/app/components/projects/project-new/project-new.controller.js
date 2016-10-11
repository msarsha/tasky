function ProjectNewController(projectService, $state) {
  this.create = function ($event) {
    projectService
      .create($event.project)
      .then(function () {
        $state.go('app.dashboard');
      })
  }
}

angular
  .module('projects')
  .controller('ProjectNewController', ProjectNewController);