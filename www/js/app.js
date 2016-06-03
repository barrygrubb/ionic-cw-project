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
      // vm.formatDateFunction = formatDate;
    }

  // function formatDate(date) {
  //   var myDate = new Date(0);
  //   myDate.setUTCSeconds(date);
  //   myDate = $filter('date')(myDate, 'MMMM d, y')
  //   return myDate;
  // }

})();

