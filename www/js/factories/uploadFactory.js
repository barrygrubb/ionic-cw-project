(function(){
  angular.module("cwapp")
    .factory("Upload", uploadFactory);

  function uploadFactory(Contacts, Id) {
    return {
      run: function(ref, blob) {
        // var filename = Id;
        var uploadTask = ref.child("images/" + Id.create() +  ".jpg").put(blob);
        uploadTask.on('state_changed', function(snapshot){
        }, function(error){
          console.log("ERROR!!!!!" + error.serverResponse);
        }, function(){
          var downloadURL = uploadTask.snapshot.downloadURL;
          Contacts.update(downloadURL);
          Id.reset();
        });
      }
    };
  }
})();
