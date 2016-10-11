function DashboardController(projectService) {
  var self = this;

  this.$onInit = function () {
    projectService
      .getAll()
      .then(function (res) {
        self.projects = res;
      })
  }
}

angular
  .module('dashboard')
  .controller('DashboardController', DashboardController);