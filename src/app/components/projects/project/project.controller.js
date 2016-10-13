function ProjectController() {
  var self = this;

  this.play = function () {
    self.onPlay({
      $event: {
        project: self.project
      }
    });
  }

  this.stop = function () {
    self.onStop({
      $event: {
        project: self.project
      }
    });
  }
}

angular
  .module('projects')
  .controller('ProjectController', ProjectController);