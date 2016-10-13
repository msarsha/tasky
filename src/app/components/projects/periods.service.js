function periodService($firebaseArray, $firebaseRef, $firebaseObject, authService, $q) {
  var uid = authService.getUser().uid;
  var periodsRef = $firebaseRef.periods;
  var projectsRef = $firebaseRef.projects.child(uid);

  this.start = function (projectId) {
    return $q(function (resolve, reject) {
      $firebaseArray(periodsRef)
        .$add({ start: new Date().getTime() })
        .then(function (res) {
          var periods = projectsRef.child(projectId + '/periods');
          periods.update({ [$firebaseObject(res).$id]: true });

          periods.once('value', function () {
            resolve($firebaseObject(res));
          })
        });
    });
  }

  this.stop = function (period) {
    return period.$save();
  }
}

angular
  .module('projects')
  .service('periodService', periodService);