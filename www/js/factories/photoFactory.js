(function(){
  angular.module("cwapp")
    .factory("Photo", photoFactory);

  function photoFactory($cordovaCamera, Blob, Options, Upload, FirebaseRef) {
    return {
      photoGenerator: function(srcType) {
        $cordovaCamera.getPicture(Options.set(srcType)).then(function(imageData){
          var blob = Blob.create(imageData, 'image/jpeg');
          Upload.run(FirebaseRef, blob);
        }, function cameraError(error) {
          console.debug("Unable to obtain picture: " + error, "app");
        });
      }};
  }

})();
