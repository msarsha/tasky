var period = {
  templateUrl: './period.component.html',
  controller: 'PeriodController',
  bindings:{
    period: '<'
  }
}

angular
  .module('projects')
  .component('period', period);