function periodService($firebaseArray, $firebaseRef, $firebaseObject, authService, $q) {
  var openConnections = [];
  var uid = authService.getUser().uid;
  var periodsRef = $firebaseRef.periods.child(uid);
  var projectsRef = $firebaseRef.projects.child(uid);

  function addToConnections(fbObject) {
    openConnections.push(fbObject);
  }

  this.destroyConnections = function () {
    angular.forEach(openConnections, function (fbObject) {
      if (fbObject.$destroy)
        fbObject.$destroy();
    })

    openConnections = [];
  }

  this.getById = function (id) {
    var fbRef = $firebaseObject(periodsRef.child(id));
    addToConnections(fbRef);
    return fbRef;
  }

  this.getLastByProjectId = function (projectId) {
    var fbRef = $firebaseObject(periodsRef.child(projectId).limitToLast(1));
    addToConnections(fbRef);
    return fbRef;
  }

  this.removeForProject = function (projectId) {
    var fbRef = $firebaseObject(periodsRef.child(projectId));
    addToConnections(fbRef);
    return fbRef.$remove();
  }

  this.start = function (projectId) {
    return $q(function (resolve, reject) {
      var fbArrayRef = $firebaseArray(periodsRef.child(projectId));
      addToConnections(fbArrayRef);
      fbArrayRef
        .$add({ start: new Date().getTime() })
        .then(function (res) {
          var projectPeriods = projectsRef.child(projectId + '/periods');
          var newPeriod = $firebaseObject(res);
          addToConnections(newPeriod);

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