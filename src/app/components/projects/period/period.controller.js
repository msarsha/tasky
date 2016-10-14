function PeriodController() {
  this.$onChanges = function(changes){
    // if(changes.period)
      // this.period = angular.copy(this.period);
  }
}

angular
  .module('projects')
  .controller('PeriodController', PeriodController);