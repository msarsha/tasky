function projectService($firebaseArray, $firebaseRef, $firebaseObject) {
  var list = $firebaseArray($firebaseRef.projects);

  this.create = function (project) {
    return list
      .$add(project)
      .then(function (res) {
        console.log(res);
      })
  }
}

angular
  .module('projects')
  .service('projectService', projectService);