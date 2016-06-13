(function() {
  angular.module('cwapp', ['ionic', 'ngCordova'])

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'templates/homeView.html',
          controller: 'ContactsController as contacts'
        })
        .state('details', {
          url: '/details',
          templateUrl: 'templates/detailView.html',
          controller: 'ContactsController as contacts'
        });

      $urlRouterProvider.otherwise("/");
    })
})();

