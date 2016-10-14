var elpased = function ($interval) {
  function link(scope, elm, attrs) {
    updateElpasedTime();
    var intervalPromise = $interval(updateElpasedTime, 1000);

    function updateElpasedTime() {
      var passed_time = new Date().getTime() - scope.date;
      var sec_m;
      sec_m = passed_time / 1000;
      scope.sec = Math.floor(sec_m % 60);
      scope.min = Math.floor((sec_m / 60) % 60);
      scope.hour = Math.floor((sec_m / 60 / 60) % 60);
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