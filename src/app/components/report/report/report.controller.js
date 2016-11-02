function ReportController(projectService, reportService, spinnerService) {
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
    spinnerService.show('app-spinner');
    var monthStart, monthEnd;

    monthStart = new Date(self.selectedYear, self.selectedMonth - 1, 1).getTime();
    monthEnd = new Date(self.selectedYear, self.selectedMonth, 1).getTime() - 1;

    projectService
      .getForTimePeriod(monthStart, monthEnd)
      .then(function (results) {
        reportService
          .proccessReport(results, monthStart, monthEnd)
          .then(function (report) {
            self.report = report;
          })
          .finally(function () {
            spinnerService.closeAll();
          })
      })
      .catch(function () {
        spinnerService.closeAll();
      });
  }

  this.isWeekend = function (time) {
    var day = new Date(Number(time)).getDay();
    return day === 5 || day === 6;
  }
}

angular
  .module('report')
  .controller('ReportController', ReportController);