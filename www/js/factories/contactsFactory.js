(function() {
  angular.module("cwapp")

    .factory("Contacts", contactsFactory);

  function contactsFactory($http, $stateParams) {
    return {
      getAllContacts: $http.get('https://cw-project-backend.herokuapp.com/getRecords' + '?random="' + '"' + (new Date()).getTime() + '"', {cache: false}),
      update: function(url) {
        $http.patch('https://cw-project-backend.herokuapp.com/updateRecord', [$stateParams.id, url]);
        }
    };
  }

})();
