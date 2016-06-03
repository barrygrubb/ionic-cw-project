(function() {
  angular.module('cwapp', ['ionic', 'firebase'])

    .factory("Contacts", function($firebaseArray) {
      var ref = new Firebase("https://circular-wave-project.firebaseio.com/contacts");
      return $firebaseArray(ref);
    })

    .controller("ContactsController", contactsController)
    function contactsController(Contacts) {
      var vm = this;
      vm.data = Contacts;
    }
})();

