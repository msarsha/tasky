function SidenavController($rootScope){
  var self = this;

  $rootScope.$on('navOpen', function(){
    self.showNav = true;
  })
}

angular
  .module('app')
  .controller('SidenavController', SidenavController);