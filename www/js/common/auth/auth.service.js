'use strict';

(function ()  {

  function authService ($firebaseAuth) {
    var ref = new Firebase('https://amtalk.firebaseio.com/');
    console.log('FAuthService Created...');
    return $firebaseAuth(ref);
  }

  angular
    .module('auth')
    .factory('FAuthService', [
      '$firebaseAuth',
      authService
    ]);

})();
