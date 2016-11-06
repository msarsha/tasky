angular
  // .module('projects', ['datePicker'])
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
        task: function (projectService, spinnerService, $stateParams) {
          spinnerService.show('app-spinner');
          return projectService
            .getForTimePeriod()
            .then(function (projects) {
              var project;
              angular.forEach(projects, function (p) {
                if (p.project.$id === $stateParams.id) {
                  project = p;
                  return;
                }
              })

              return project;
            })
            .finally(function () {
              spinnerService.closeAll();
            })
        }
      }
    })
  });