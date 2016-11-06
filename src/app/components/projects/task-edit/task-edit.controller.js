var taskEditCtrl = function () {
  this.$onInit = function () {
    this.task.periods = filterAndSortPeriods(this.task.periods);
  }

  this.$onChanges = function (changes) {
    if (changes.task)
      this.task = angular.copy(this.task);
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