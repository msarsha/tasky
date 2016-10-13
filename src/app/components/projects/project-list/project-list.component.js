var projectList = {
  templateUrl: './project-list.component.html',
  controller: 'ProjectListController',
  bindings: {
    projects: '<',
    onDelete: '&',
    onPlay: '&',
    onStop: '&'
  }
}

angular
  .module('projects')
  .component('projectList', projectList);