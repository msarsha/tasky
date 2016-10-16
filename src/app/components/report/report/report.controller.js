function ReportController(projectService, reportService) {
  var self = this;

  this.$onInit = function () {
    var currentDate = new Date();
    var year = currentDate.getFullYear();

    this.months = []
    this.years = [year - 1, year];

    for (var i = 1; i < 13; i++) {
      this.months.push(i);
    }

    this.selectedMonth = currentDate.getMonth() + 1;
    this.selectedYear = year;
  }

  this.makeReport = function () {
    var monthStart, monthEnd;

    monthStart = new Date(self.selectedYear, self.selectedMonth - 1, 1).getTime();
    monthEnd = new Date(self.selectedYear, self.selectedMonth, 1).getTime() - 1;

    projectService
      .getForTimePeriod(monthStart, monthEnd)
      .then(function (results) {
        reportService
          .proccessReport(results, monthStart, monthEnd)
          .then(function(report){
            console.log(report)
            self.report = report;
          })
      });
  }
}

angular
  .module('report')
  .controller('ReportController', ReportController);