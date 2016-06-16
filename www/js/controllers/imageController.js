(function() {
  angular.module("cwapp")

    .controller("imageController", function($ionicActionSheet, $cordovaCamera) {
      var config = {
        apiKey: "GMYnb01kjIFJ6Ymxoa0KvBw4GBwhTKmryqB8D52l",
        storageBucket: "gs://circular-wave-project.appspot.com/"
      };

      firebase.initializeApp(config);
      var storage = firebase.storage();
      var ref = firebase.storage().ref();

      var vm = this;

      function setOptions(srcType) {
        var options = {
          sourceType: srcType,
          targetWidth: 200,
          targetHeight: 200,
          saveToPhotoAlbum: true
        };
        return options;
      }

      vm.show = function() {

        // Show the action sheet
        $ionicActionSheet.show({
          buttons: [
            { text: 'Take Photo' },
            { text: 'Choose from Gallery' }
          ],
          titleText: 'Choose or take a photo',
          cancelText: 'Cancel',
          buttonClicked: function(index) {
            var srcType;
            if (index === 0) {
              srcType = Camera.PictureSourceType.CAMERA;

              $cordovaCamera.getPicture(setOptions(srcType)).then(function(imageData){
                var uploadTask = ref.put(imageData);
                uploadTask.on('state-change', function(snapshot){
                }, function(error){
                  console.log("Oh damn");
                }, function(){
                  var downloadURL = uploadTask.snapshot.downloadURL;
                });
              }, function cameraError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
              });


            } else if (index === 1) {
              srcType = Camera.PictureSourceType.PHOTOLIBRARY;

              $cordovaCamera.getPicture(setOptions(srcType)).then(function(imageData){
                console.log(imageData);
              }, function cameraError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
              });
            }
            return true;
          }
        });
      };
    });
})();
