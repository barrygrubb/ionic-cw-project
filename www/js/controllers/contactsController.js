(function() {
  angular.module("cwapp")

    .controller("ContactsController", contactsController);

  function contactsController(Contacts, $stateParams) {
    var vm = this;
    var params = $stateParams.id;
    Contacts.getAllContacts.then(function success(response) {
      vm.data = response.data;
      vm.selectedContact = response.data[params];
    });
  }
})();
