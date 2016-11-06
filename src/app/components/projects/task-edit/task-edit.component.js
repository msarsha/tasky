var taskEdit = {
  templateUrl: './task-edit.component.html',
  controller: 'TaskEditController',
  bindings: {
    task: '<task'
  }
};

angular 
  .module('projects')
  .component('taskEdit', taskEdit);