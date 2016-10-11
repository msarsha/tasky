var projectList = {
  templateUrl: './project-list.component.html',
  controller: 'ProjectListController',
  bindings: {
    projects: '<',
    onDelete: '&'
  }
}

angular
  .module('projects')
  .component('projectList', projectList);