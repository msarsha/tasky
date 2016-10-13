function projectService($firebaseArray, $firebaseRef, $firebaseObject, authService) {
  var ref = $firebaseRef.projects;
  var uid = authService.getUser().uid;
  var ownRef = $firebaseArray(ref.child(uid));

  this.create = function (project) {
    return ownRef
      .$add(project)
      .then(function (res) {
        console.log(res);
      })
  }

  this.removeById = function (id) {
    return $firebaseObject(ref.child(uid).child(id))
      .$remove();
  }

  this.getAll = function () {
    return $firebaseArray(ref.child(uid)).$loaded();
  }
}

angular
  .module('projects')
  .service('projectService', projectService);