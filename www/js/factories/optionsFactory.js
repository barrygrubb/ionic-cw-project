(function(){
  angular.module("cwapp")
    .factory("Options", optionsFactory);

  function optionsFactory() {
    return {
      set: function($cordovaCamera, srcType) {
        var options = {
          sourceType: srcType,
          destinationType: Camera.DestinationType.DATA_URL,
          targetWidth: 300,
          targetHeight: 400
        };
        return options;
      }
    };
  }
})();
