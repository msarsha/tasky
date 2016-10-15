angular
  .module('app', [
    'components',
    'templates',
    'report',

    'ui.router',
    'firebase'
  ])
  .config(function ($stateProvider, $firebaseRefProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        component: 'app',
        redirectTo: 'app.dashboard',
        data: {
          requireAuth: true
        }
      });

    // init firebase
    var firebaseConfig = {
      apiKey: "AIzaSyAR-QuSHldRrAb5GBsOoHFxULnsP8h7pS4",
      authDomain: "projectmonitor-45412.firebaseapp.com",
      databaseURL: "https://projectmonitor-45412.firebaseio.com",
      storageBucket: "projectmonitor-45412.appspot.com",
      messagingSenderId: "423185973264"
    };

    firebase.initializeApp(firebaseConfig);

    // init firebase urls
    var firebaseRefConfig = {
      default: firebaseConfig.databaseURL,
      projects: firebaseConfig.databaseURL + '/projects',
      periods: firebaseConfig.databaseURL + '/periods'
    };

    $firebaseRefProvider.registerUrl(firebaseRefConfig);
  })