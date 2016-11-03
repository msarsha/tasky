angular
  .module('projects', [])
  .config(function ($stateProvider) {
    $stateProvider.state('app.newproject', {
      url: '/new',
      component: 'projectNew'
    })

    $stateProvider.state('app.editTask', {
      url: '/tasks/{id}',
      component: 'taskEdit',
      resolve: {
        task: function(projectService){
          
        }
      }
    })
  });