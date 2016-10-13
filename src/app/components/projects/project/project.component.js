var project = {
  templateUrl: './project.component.html',
  controller: 'ProjectController',
  bindings: {
    project: '<',
    onPlay: '&',
    onStop: '&'
  }
}

angular
  .module('projects')
  .component('project', project);