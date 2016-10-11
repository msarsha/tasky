function DashboardController() {
  var self = this;

  this.$onInit = function () {
    this.i = 4;
    this.projects = [
      {
        title: 'project 1'
      },
      {
        title: 'project 2'
      }
    ]
  }

  this.change = function () {
    this.projects = [
      {
        title: 'project ' + this.i++
      },
      {
        title: 'project 2'
      }
    ]
  }
}

angular
  .module('dashboard')
  .controller('DashboardController', DashboardController);