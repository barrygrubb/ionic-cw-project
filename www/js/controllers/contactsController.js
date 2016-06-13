(function() {
  angular.module("cwapp")

    .controller("ContactsController", contactsController);

  function contactsController(Contacts) {
    var vm = this;
    vm.set = Contacts.set;
    vm.get = Contacts.get();
    Contacts.getAllContacts.then(function success(response) {
      vm.data = response.data;
    });
  }
})();
