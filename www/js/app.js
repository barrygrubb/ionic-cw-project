(function() {
  angular.module('cwapp', ['ionic'])

    .factory("Contacts", contactsFactory)
    .controller("ContactsController", contactsController);

    function contactsController(Contacts) {
      var vm = this;
      vm.data = Contacts;
    }

    function contactsFactory($http) {
      var data = $http.get('localhost:3000/getRecords');
      console.log(data);
      return data;
    }
})();

