(function() {
  angular.module('cwapp', ['ionic', 'firebase'])

    .factory("Data", function($firebaseArray) {
      var ref = new Firebase("https://circular-wave-project.firebaseio.com/contacts");
      return $firebaseArray(ref);
    })

    .controller("DataController", dataController)
    function dataController(Data) {
      console.log(Data);
    }
})();

