(function() {
  angular.module("cwapp")

    .controller("imageController", imageController); 

  function imageController($ionicActionSheet, $cordovaCamera, Contacts, Photo) {
    var vm = this;
    
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
            Photo.photoGenerator(srcType);
          } else if (index === 1) {
            srcType = Camera.PictureSourceType.PHOTOLIBRARY;
            Photo.photoGenerator(srcType);
          }
          return true;
        }
      });
    };
  }
})();
