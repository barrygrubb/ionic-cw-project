(function() {
  angular.module("cwapp")

    .controller("imageController", function($ionicActionSheet, $cordovaCamera) {

      var vm = this;

      function setOptions(srcType) {
        var options = {
          sourceType: srcType,
          targetWidth: 200,
          targetHeight: 200,
          saveToPhotoAlbum: true
        }
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
                console.log(imageData);
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

    })
})();
