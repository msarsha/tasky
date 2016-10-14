function periodService($firebaseArray, $firebaseRef, $firebaseObject, authService, $q) {
  var uid = authService.getUser().uid;
  var periodsRef = $firebaseRef.periods.child(uid);
  var projectsRef = $firebaseRef.projects.child(uid);

  this.getById = function (id) {
    return $firebaseObject(periodsRef.child(id));
  }

  this.getLastByProjectId = function (projectId) {
    return $firebaseObject(periodsRef.child(projectId).limitToLast(1));
  }

  this.removeForProject = function(projectId){
    return $firebaseObject(periodsRef.child(projectId)).$remove();
  }

  this.start = function (projectId) {
    return $q(function (resolve, reject) {
      $firebaseArray(periodsRef.child(projectId))
        .$add({ start: new Date().getTime() })
        .then(function (res) {
          var projectPeriods = projectsRef.child(projectId + '/periods');
          var newPeriod = $firebaseObject(res);

          projectPeriods
            .update({ [newPeriod.$id]: true })
            .then(function () {
              resolve(newPeriod);
            });
        });
    });
  }

  this.stop = function (projectId) {
    return $q(function (resolve, reject) {
      var lastPeriod = periodsRef
        .child(projectId)
        .limitToLast(1);

      lastPeriod.once('value', lastPeriodLoaded);

      function lastPeriodLoaded(res) {
        res.forEach(function (period) {
          period
            .ref
            .update({ end: new Date().getTime() })
            .then(function () {
              resolve(period.ref);
            })
        });
      }
    })
  }
}

angular
  .module('projects')
  .service('periodService', periodService);