function projectService($q, $rootScope, $firebaseArray, $firebaseRef, $firebaseObject, authService, periodService) {
  var openConnections = [];
  var ref = $firebaseRef.projects;
  var uid = authService.getUser().uid;

  function addToConnections(fbObject) {
    openConnections.push(fbObject);
  }

  function getUid() {
    return authService.getUser()
  }


  $rootScope.$on('authChanged', function () {
    uid = authService.getUser().uid;
  })

  this.getForTimePeriod = function (fromDate, toDate) {
    var promises = [];
    var fromDate = fromDate || new Date(2016, 0, 1).getTime();
    var toDate = toDate || new Date().getTime();

    return this.getAll()
      .then(function (projects) {
        angular.forEach(projects, function (project) {
          var promise = periodService
            .getAllForProjectForPeriod(project.$id, fromDate, toDate)
            .then(function (periods) {
              if (periods.length === 0)
                return {
                  periods: undefined,
                  project: project
                }

              return {
                periods: periods.filter(periodFilter),
                project: project
              }
            });
          promises.push(promise);
        })

        return $q.all(promises);
      })

    function periodFilter(period) {
      if (period.end)
        return period;
    }
  }

  this.destroyConnections = function () {
    angular.forEach(openConnections, function (fbObject) {
      if (fbObject.$destroy)
        fbObject.$destroy();
    })

    openConnections = [];
  }

  this.create = function (project) {
    var fbRef = $firebaseArray(ref.child(uid));
    addToConnections(fbRef);
    return fbRef
      .$add(project)
      .then(function (res) {
        console.log(res);
      })
  }

  this.removeById = function (id) {
    var fbRef = $firebaseObject(ref.child(uid).child(id));
    addToConnections(fbRef);
    return fbRef
      .$remove()
      .then(function () {
        return periodService
          .removeForProject(id);
      });
  }

  this.getAll = function () {
    var fbRef = $firebaseArray(ref.child(uid));
    addToConnections(fbRef);
    return fbRef
      .$loaded()
      .catch(onError);
  }

  this.getAllWithActivePeriod = function () {
    var fbRef = $firebaseArray(ref.child(uid));
    addToConnections(fbRef);
    return fbRef
      .$loaded()
      .then(onProjectsLoad)
      .catch(onError);

    function onProjectsLoad(res) {
      var promises = [];
      res.forEach(function (project) {
        var promise = periodService
          .getLastByProjectId(project.$id)
          .$loaded()
          .catch(onError)
          .then(function (r) {
            r.forEach(function (period) {
              if (!period.end)
                project.activePeriod = period;

              project.lastPeriod = period;
            })

            return project; // promise will be resolved with the project
          });

        promises.push(promise);
      })

      return $q.all(promises);
    }
  }

  function onError(err) {
    console.log(err);
  }
}

angular
  .module('projects')
  .service('projectService', projectService);