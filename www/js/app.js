(function() {
  angular.module('cwapp', ['ionic'])

    .factory("Contacts", contactsFactory)
    .controller("ContactsController", contactsController);

    function contactsController(Contacts) {
      var vm = this;
      Contacts.then(function success(response) {
        vm.data = response.data;
      })
    }

    function contactsFactory($http) {
      return $http.get('https://cw-project-backend.herokuapp.com/getRecords');
    }
})();

