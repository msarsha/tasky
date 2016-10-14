function projectService($q, $firebaseArray, $firebaseRef, $firebaseObject, authService, periodService) {
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
      .$remove()
      .then(function () {
        return periodService
          .removeForProject(id);
      });
  }

  this.getAll = function () {
    return ownRef
      .$loaded();
  }

  this.getAllWithLastPeriod = function () {
    return ownRef
      .$loaded()
      .then(onProjectsLoad)

    function onProjectsLoad(res) {
      var promises = [];
      res.forEach(function (project) {
        var promise = periodService
          .getLastByProjectId(project.$id)
          .$loaded()
          .then(function (r) {
            r.forEach(function (period) {
              if (!period.end)
                project.lastPeriod = period;
            })

            return project;
          })

        promises.push(promise);
      })

      return $q.all(promises);
    }
  }
}

angular
  .module('projects')
  .service('projectService', projectService);