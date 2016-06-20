(function() {
  angular.module("cwapp")

    .controller("imageController", function($ionicActionSheet, $cordovaCamera) {
      var config = {
        apiKey: "AIzaSyCG_LD6NqPbBwKTibm4Alr0H47IdJFMKKM",
        storageBucket: "circular-wave-project.appspot.com",
      };

      firebase.initializeApp(config);
      var ref = firebase.storage().ref();

      var vm = this;

      function setOptions(srcType) {
        var options = {
          sourceType: srcType,
          destinationType: Camera.DestinationType.DATA_URL,
          targetWidth: 300,
          targetHeight: 400
        };
        return options;
      }

      vm.show = function() {

        $ionicActionSheet.show({
          buttons: [
            { text: 'Take Photo' },
            { text: 'Choose from Gallery' }
          ],
          titleText: 'Choose or take a photo',
          cancelText: 'Cancel',
          buttonClicked: function(index) {
            var srcType;
            var dataUrl;
            if (index === 0) {
              srcType = Camera.PictureSourceType.CAMERA;

              $cordovaCamera.getPicture(setOptions(srcType)).then(function(imageData){
                function b64toBlob(b64Data, contentType, sliceSize) {
                  contentType = contentType || '';
                  sliceSize = sliceSize || 512;

                  var byteCharacters = atob(b64Data);
                  var byteArrays = [];

                  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                      byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                  }



                  var blob = new Blob(byteArrays, {type: contentType});
                  return blob;
                }
                var blob = b64toBlob(imageData, 'image/jpeg');

                function makeid() {
                  var text = '';
                  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                  for (var i = 0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                  }
                  return text;
                }

                var filename = makeid();
                var uploadTask = ref.child("images/" + filename +  ".jpg").put(blob);
                uploadTask.on('state_changed', function(snapshot){

                }, function(error){
                  console.log("ERROR!!!!!" + error.serverResponse);
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
