var taskEdit = {
  templateUrl: './task-edit.component.html',
  controller: 'TaskEditController'
};

angular 
  .module('projects')
  .component('taskEdit', taskEdit);