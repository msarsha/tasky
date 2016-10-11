function projectService($firebaseArray, $firebaseRef, $firebaseObject, authService) {
  var ref = $firebaseRef.projects;
  var uid = authService.getUser().uid;

  this.create = function (project) {
    return $firebaseArray(ref.child(uid))
      .$add(project)
      .then(function (res) {
        console.log(res);
      })
  }

  this.getAll = function () {
    return $firebaseArray(ref.child(uid)).$loaded();
  }
}

angular
  .module('projects')
  .service('projectService', projectService);