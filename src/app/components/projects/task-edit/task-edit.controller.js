var taskEditCtrl = function (periodService) {
  var self = this;
  this.$onInit = function () {
    this.task.periods = filterAndSortPeriods(this.task.periods);
  }

  this.$onChanges = function (changes) {
    if (changes.task)
      this.task = angular.copy(this.task);
  }

  this.onChange = function (period) {
    console.log('change', period);

    if (!period.start || !period.end) {
      alert('no value');
      return;
    }

    period.start = new Date(period.start).getTime();
    period.end = new Date(period.end).getTime();

    periodService
      .update(period, self.task.project.$id)
      .then(function (res) {
        console.log('saved ', res);
      });
  }

  function filterAndSortPeriods(periods) {
    var filtered = periods.filter(function (period) {
      var start = new Date(period.start);
      var end = new Date(period.end);

      return !isSameMinute(start, end);
    });

    filtered = filtered.sort(function (p1, p2) {
      return p1.start > p2.start ? -1 : 1;
    })

    return filtered;

    function isSameMinute(d1, d2) {
      return d1.getYear() === d2.getYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDay() === d2.getDay()
        && d1.getHours() === d2.getHours()
        && d1.getMinutes() === d2.getMinutes()
    }
  }
}

angular
  .module('projects')
  .controller('TaskEditController', taskEditCtrl);