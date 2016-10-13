function ProjectController() {
  var self = this;

  this.play = function(){
    self.onPlay({$event: self.project});
  }

  this.stop = function(){
    self.onStop({$event: self.project});
  }
}

angular
  .module('projects')
  .controller('ProjectController', ProjectController);