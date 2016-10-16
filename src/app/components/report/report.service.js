var reportService = function ($q, Report) {
  this.proccessReport = function (projectsResults, fromDate, toDate) {
    return $q(function (resolve, reject) {
      var dates = createDates(fromDate, toDate);
      var report = new Report(dates);

      angular.forEach(projectsResults, function (projectResult) {
        if (!projectResult.periods)
          return;

        var project = projectResult.project;
        angular.forEach(projectResult.periods, function (period) {
          var duration = calcDuration(period.start, period.end);
          report.addToDate(project.title, period.start, duration);
        })
      })

      resolve(report);
    })
  }

  function createDates(fromDate, toDate) {
    var fromDay, toDay, days, dates = {};

    fromDay = fromDateToDay(fromDate);
    toDay = fromDateToDay(toDate);

    days = Math.floor(toDay - fromDay);

    for (var i = 0; i < days + 1; i++) {
      var date = fromDaytoDate(fromDay + i);
      dates[date] = {};
    }

    return dates;
  }

  function fromDateToDay(date) {
    return date / 1000 / 60 / 60 / 24;
  }

  function fromDaytoDate(day) {
    return day * 1000 * 60 * 60 * 24;
  }

  function calcDuration(start, end) {
    var dif = (end - start) / 1000;
    var sec = Math.floor(dif % 60);
    var min = Math.floor((dif / 60) % 60);
    var hour = Math.floor((dif / 60 / 60) % 60);

    return {
      sec: sec,
      min: min,
      hour: hour
    }
  }
}

angular
  .module('report')
  .service('reportService', reportService);