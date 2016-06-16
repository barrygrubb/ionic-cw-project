(function() {
  angular.module("cwapp")

    .controller("imageController", function($ionicActionSheet, $cordovaCamera) {
      var config = {
        apiKey: "GMYnb01kjIFJ6Ymxoa0KvBw4GBwhTKmryqB8D52l",
        storageBucket: "gs://circular-wave-project.appspot.com/"
        // storageBucket: "https://console.firebase.google.com/project/circular-wave-project/storage/files"
        // storageBucket: "https://firebasestorage.googleapis.com/v0/b/circular-wave-project.appspot.com/"
      };

      firebase.initializeApp(config);
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
                var blob = new Blob([imageData], {type: "image/jpg"});
                // blob.name = "filename.jpg";

                var uploadTask = ref.child("filename.jpg").put(blob);
                uploadTask.on('state_changed', function(snapshot){

                  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                      console.log('Upload is paused');
                      break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                      console.log('Upload is running');
                      break;
                  }

                }, function(error){
                  // console.log("Oh damn" + error);
                  console.log("ERROR!!!!!" + error.serverResponse);
                }, function(){
                  var downloadURL = uploadTask.snapshot.downloadURL;
                  console.log("-------" + downloadURL);
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
