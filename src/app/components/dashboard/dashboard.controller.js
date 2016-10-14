function DashboardController($window, projectService, periodService) {
  var self = this;

  this.$onInit = function () {
    projectService.getAllWithLastPeriod()
      .then(function (res) {
        self.projects = res;
      });
  }

  this.onPlay = function ($event) {
    periodService
      .start($event.project.$id)
      .then(function (res) {
        self.projects = self.projects.filter(function (project) {
          if (project.$id === $event.project.$id) {
            project.lastPeriod = res;
          }

          return project;
        })
      })
  }

  this.onStop = function ($event) {
    periodService
      .stop($event.project.$id)
      .then(function (res) {
        self.projects = self.projects.filter(function (project) {
          if (project.$id === $event.project.$id) {
            project.lastPeriod = null;
          }

          return project;
        })
      })
  }

  this.remove = function ($event) {
    var msg = "Remove project?";
    if (!$window.confirm(msg))
      return;

    projectService
      .removeById($event.project.$id)
      .then(removeHandler);

    function removeHandler(res) {
      self.projects = self.projects.filter(function (item) {
        return item.$id !== $event.project.$id;
      })
    }
  }
}

angular
  .module('dashboard')
  .controller('DashboardController', DashboardController);