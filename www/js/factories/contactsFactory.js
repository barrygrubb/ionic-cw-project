(function() {
  angular.module("cwapp")

    .factory("Contacts", contactsFactory);

  function contactsFactory($http) {
    return {
      getAllContacts: $http.get('https://cw-project-backend.herokuapp.com/getRecords'),
      update: function(url) {$http.patch('https://cw-project-backend.herokuapp.com/updateRecord', [selectedContact, url]);},
    };
  }

})();
