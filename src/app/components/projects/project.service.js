function projectService($q, $firebaseArray, $firebaseRef, $firebaseObject, authService, periodService) {
  var openConnections = [];
  var ref = $firebaseRef.projects;
  var uid = authService.getUser().uid;

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

  this.getAllWithLastPeriod = function () {
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
                project.lastPeriod = period;
            })

            return project;
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