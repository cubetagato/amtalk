'use strict';

(function ()  {

  function authService ($firebaseAuth) {

    var self = this;
    this.USER = null;

    var ref = new Firebase('https://amtalk.firebaseio.com/');
    console.log('FAuthService Created...');
    return {
      ref: function ()  {
        return $firebaseAuth(ref);
      },
      user: this.USER
    }
  }

  angular
    .module('auth')
    .factory('FAuthService', [
      '$firebaseAuth',
      authService
    ]);

})();
