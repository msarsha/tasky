function DashboardController(projectService) {
  var self = this;

  this.$onInit = function () {
    projectService
      .getAll()
      .then(function (res) {
        self.projects = res;
      })
  }

  this.onPlay = function ($event) {
    console.log('dashboard', $event);
  }

  this.onStop = function ($event) {
    console.log('dashboard', $event);
  }

  this.remove = function ($event) {
    projectService
      .removeById($event.project.$id)
      .then(function (res) {
        self.projects = self.projects.filter(function (item) {
          return item.$id !== $event.project.$id;
        })
      })
  }
}

angular
  .module('dashboard')
  .controller('DashboardController', DashboardController);