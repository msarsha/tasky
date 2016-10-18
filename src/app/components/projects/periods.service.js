function periodService($rootScope, $firebaseArray, $firebaseRef, $firebaseObject, authService, $q) {
  var openConnections = [];
  var uid = authService.getUser().uid; // TODO: sign to onAuth and change the uid when new user logged in
  var periodsRef = $firebaseRef.periods.child(uid);
  var projectsRef = $firebaseRef.projects.child(uid);

  function addToConnections(fbObject) {
    openConnections.push(fbObject);
  }

  $rootScope.$on('authChanged', function () {
    uid = authService.getUser().uid;
    periodsRef = $firebaseRef.periods.child(uid);
    projectsRef = $firebaseRef.projects.child(uid);
  })

  this.destroyConnections = function () {
    angular.forEach(openConnections, function (fbObject) {
      if (fbObject.$destroy)
        fbObject.$destroy();
    })

    openConnections = [];
  }

  this.getAllForProjectForPeriod = function (projectId, fromDate, toDate) {
    var periodRef = periodsRef
      .child(projectId)
      .orderByChild('start')
      .startAt(fromDate)
      .endAt(toDate);
    var fbRef = $firebaseArray(periodRef);
    addToConnections(fbRef);
    return fbRef.$loaded();
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

          var periodToUpdate = {};
          periodToUpdate[newPeriod.$id] = true;

          projectPeriods
            .update(periodToUpdate)
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