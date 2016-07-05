(function(){
  angular.module("cwapp")
    .factory("FirebaseRef", firebaseRefFactory);

  function firebaseRefFactory() {
    var config = {
      apiKey: "AIzaSyCG_LD6NqPbBwKTibm4Alr0H47IdJFMKKM",
      storageBucket: "circular-wave-project.appspot.com",
    };

    firebase.initializeApp(config);
    return firebase.storage().ref();
  }
})();
