function DashboardController($window, projectService, periodService, spinnerService) {
  var self = this;

  this.$onInit = function () {
    projectService.getAllWithActivePeriod()
      .then(function (res) {
        self.projects = sortByLastPeriod(res);
      })
      .finally(function () {
        spinnerService.closeAll();
      });
  }

  this.$postLink = function () {
    spinnerService.show('app-spinner');
  }

  this.onPlay = function ($event) {
    periodService
      .start($event.project.$id)
      .then(function (res) {
        var filteredProjects = self.projects.filter(function (project) {
          if (project.$id === $event.project.$id) {
            project.activePeriod = res;
            project.lastPeriod = res;
          }

          return project;
        });

        self.projects = sortByLastPeriod(filteredProjects);
      })
  }

  this.onStop = function ($event) {
    periodService
      .stop($event.project.$id)
      .then(function (res) {
        var filteredProjects = self.projects.filter(function (project) {
          if (project.$id === $event.project.$id) {
            project.activePeriod = null;
          }

          return project;
        });

        self.projects = sortByLastPeriod(filteredProjects);
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
      var filteredProjects = self.projects.filter(function (item) {
        return item.$id !== $event.project.$id;
      })

      self.projects = sortByLastPeriod(filteredProjects);
    }
  }

  function sortByLastPeriod(tasks) {
    return tasks.sort(function (t1, t2) {
      if(t1.activePeriod && !t2.activePeriod) return -1
      if(!t1.activePeriod && t2.activePeriod) return 1

      if(!t1.lastPeriod && !t2.lastPeriod) return 0;
      if (!t2.lastPeriod || t1.lastPeriod.start > t2.lastPeriod.start)
        return -1;

      return 1;
    })
  }
}

angular
  .module('dashboard')
  .controller('DashboardController', DashboardController);