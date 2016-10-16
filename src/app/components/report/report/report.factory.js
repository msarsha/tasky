var report = function () {
  function Report(dates) {
    this.dates = dates;
    this.monthSummary = {};
  }

  Report.prototype.addToDate = function (title, time, duration) {
    var givenDay = new Date(time).getDate();

    for (var key in this.dates) {
      if (this.dates.hasOwnProperty(key)) {
        if (givenDay === new Date(Number(key)).getDate()) {

          if (!this.dates[key].hasOwnProperty(title))
            this.dates[key][title] = {
              min: 0,
              hour: 0
            };

          var sum = sumDuration(this.dates[key][title], duration);
          this.dates[key][title] = sum;
          return;
        }
      }
    }
  }

  Report.prototype.buildMonthSummary = function () {
    var month = {};

    angular
      .forEach(this.dates, function (date) {
        for (var projectTitle in date) {
          if (date.hasOwnProperty(projectTitle)) {
            if (!month[projectTitle])
              month[projectTitle] = {
                min: 0,
                hour: 0
              };

            var sum = sumDuration(month[projectTitle], date[projectTitle]);
            month[projectTitle] = sum;
          }
        }
      })

    month = padMonth(month);
    this.monthSummary = month;
  }

  function padMonth(month) {
    for (var key in month) {
      if (month.hasOwnProperty(key)) {
        month[key].hour = pad(month[key].hour);
        month[key].min = pad(month[key].min);
      }
    }

    return month;
  }

  function pad(value) {
    return value.toString().length < 2 ? "0" + value : value;
  }

  function sumDuration(d1, d2) {
    var sumDuration = {
      min: d1.min + d2.min,
      hour: d1.hour + d2.hour
    };

    if (sumDuration.min >= 60) {
      sumDuration.hour += 1;
      sumDuration.min = Math.floor(sumDuration.min % 60);
    }

    return sumDuration;
  }

  return Report;
}

angular
  .module('report')
  .factory('Report', report);