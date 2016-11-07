function periodService($firebaseArray, $firebaseRef, $firebaseObject, authService, $q) {
  var openConnections = [];
  var periodsRef = $firebaseRef.periods;
  var projectsRef = $firebaseRef.projects;

  function addToConnections(fbObject) {
    openConnections.push(fbObject);
  }

  function getUid() {
    return authService
      .getUser()
      .uid
  }

  this.destroyConnections = function () {
    angular.forEach(openConnections, function (fbObject) {
      if (fbObject.$destroy)
        fbObject.$destroy();
    })

    openConnections = [];
  }

  this.getAllForProjectForPeriod = function (projectId, fromDate, toDate) {
    var periodRef = periodsRef.child(getUid())
      .child(projectId)
      .orderByChild('start')
      .startAt(fromDate)
      .endAt(toDate);
    var fbRef = $firebaseArray(periodRef);
    addToConnections(fbRef);
    return fbRef.$loaded();
  }

  this.getLastByProjectId = function (projectId) {
    var fbRef = $firebaseObject(periodsRef.child(getUid() + '/' + projectId).limitToLast(1));
    addToConnections(fbRef);
    return fbRef;
  }

  this.removeForProject = function (projectId) {
    var fbRef = $firebaseObject(periodsRef.child(getUid() + '/' + projectId));
    addToConnections(fbRef);
    return fbRef.$remove();
  }

  this.update = function (period, projectId) {
    var fbObjectRef = $firebaseObject(periodsRef.child(getUid() + '/' + projectId + '/' + period.$id));
    addToConnections(fbObjectRef);

    fbObjectRef.start = period.start;
    fbObjectRef.end = period.end;
    return fbObjectRef.$save();
  }

  this.start = function (projectId) {
    return $q(function (resolve, reject) {
      var fbArrayRef = $firebaseArray(periodsRef.child(getUid() + '/' + projectId));
      addToConnections(fbArrayRef);
      fbArrayRef
        .$add({ start: new Date().getTime() })
        .then(function (res) {
          var projectPeriods = projectsRef.child(getUid() + '/' + projectId + '/periods');
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
      var activePeriod = periodsRef
        .child(getUid() + '/' + projectId)
        .limitToLast(1);

      activePeriod.once('value', activePeriodLoaded);

      function activePeriodLoaded(res) {
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