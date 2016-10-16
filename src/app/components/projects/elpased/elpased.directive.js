var elpased = function ($interval) {
  function link(scope, elm, attrs) {
    updateElpasedTime();
    var intervalPromise = $interval(updateElpasedTime, 1000);

    function updateElpasedTime() {
      var passed_time = new Date().getTime() - scope.date;
      var sec_m, sec, min, hour;
      sec_m = passed_time / 1000;

      sec = Math.floor(sec_m % 60);
      min = Math.floor((sec_m / 60) % 60);
      hour = Math.floor((sec_m / 60 / 60) % 60);

      scope.sec = pad(sec);
      scope.min = pad(min);
      scope.hour = pad(hour);
    }

    function pad(value) {
      return value.toString().length < 2 ? "0" + value : value;
    }

    elm.on('$destroy', function () {
      $interval.cancel(intervalPromise);
    })
  };

  return {
    templateUrl: './elpased.directive.html',
    restrict: 'EA',
    scope: {
      date: '@',
    },
    link: link
  }
}

angular
  .module('projects')
  .directive('elpased', elpased);