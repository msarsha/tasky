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

    function sumDuration(d1, d2) {
      var sumDuration = {
        min: d1.min + d2.min,
        hour: d1.hour + d2.hour
      };

      if(sumDuration.min >= 60){
        sumDuration.hour += 1;
        sumDuration.min = Math.floor(sumDuration.min % 60);
      }

      return sumDuration;
    }
  }

  return Report;
}

angular
  .module('report')
  .factory('Report', report);