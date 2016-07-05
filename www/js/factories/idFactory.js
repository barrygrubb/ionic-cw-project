(function(){
  angular.module("cwapp")
    .factory("Id", idFactory);

  function idFactory() {
    var text = '';
    return {
      create: function() {
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      },
      reset: function() {
        text = '';
      }
    };
  }
})();
