var report = function () {
  function Report(dates) {
    this.dates = dates;
  }

  Report.prototype.addToDate = function (title, time, duration) {
    var givenDay = new Date(time).getDate();

    for (var key in this.dates) {
      if (this.dates.hasOwnProperty(key)) {
        if (givenDay === new Date(Number(key)).getDate()){
          
          if(!this.dates[key].hasOwnProperty(title))
            this.dates[key][title] = 0;

          this.dates[key][title] += duration.hour;
          return;
        }
      }
    }
  }

  return Report;
}

angular
  .module('report')
  .factory('Report', report);