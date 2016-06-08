(function() {
  angular.module('cwapp', ['ionic'])

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
        })

      $urlRouterProvider.otherwise("/");
    })

    .factory("Contacts", contactsFactory)
    .controller("ContactsController", contactsController);


    function contactsController(Contacts) {
      var vm = this;
      vm.set = Contacts.set;
      vm.get = Contacts.get();
      Contacts.getAllContacts.then(function success(response) {
        vm.data = response.data;
        // console.log(vm.data[0]);
      })
    }

    function contactsFactory($http) {
      var selectedContact = {}
      return {
        getAllContacts: $http.get('https://cw-project-backend.herokuapp.com/getRecords'),
        set: function(data) {
          selectedContact = data;
        },
        get: function() {
          console.log(selectedContact);
          return selectedContact;
        }
    }
    }
})();

