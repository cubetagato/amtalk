'use strict';

(function ()  {
  function authController ($state, $ionicLoading, $ionicPopup, FAuthService)  {

    var self = this;

    self.signup_user = {};
    self.signin_user = {};

    self.cancelSignUp = cancelSignUp;
    self.createUser = createUser;
    self.signIn = signIn;

    function signIn (user)  {
      if(user && user.email && user.pwd)  {
        $ionicLoading.show({
          template: 'Autenticando Usuario...'
        });

        var ref = new Firebase('https://amtalk.firebaseio.com/');

        FAuthService.$authWithPassword({
          email: user.email,
          password: user.pwd
        }).then(function(authData)  {
          console.log(authData);
          console.log('logged as ' + authData.uid);
          ref.child('users').child(authData.uid).once('value', function (snapshot)  {
            console.log(snapshot.val());
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'AMTalk',
              template: 'Bienvenido ' + snapshot.val().alias
            }).then(function(res) {
              console.log('Autenticación correcta');
              $state.go('tab.chats');
            });
          });
        }).catch(function (err) {
          console.log('Error: ' + err);
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'AMTalk',
            template: 'Error de autenticación'
          }).then(function(res) {
            console.log('Error de autenticación');
          });
        });
      }
    }

    function cancelSignUp() {
      $state.go('auth');
    }

    function createUser (user)  {
      $ionicLoading.show({template: 'Cargando...'});
      var ref = new Firebase('https://amtalk.firebaseio.com/');
      if(user && user.email && user.pwd && user.alias) {
        FAuthService.$createUser({
          email: user.email,
          password: user.pwd
        }).then(function(userData)  {
          console.log(userData);
          ref.child('users').child(userData.uid).set ({
            email: user.email,
            alias: user.alias
          });
          
          $ionicPopup.alert({
            title: 'AMTalk',
            template: 'Usuario creado correctamente.'
          }).then(function(res) {
            console.log('Usuario creado correctamente');
          });

          $state.go('auth');
          $ionicLoading.hide();
        }).catch (function (err)  {
          $ionicPopup.alert({
            title: 'AMTalk',
            template: 'Ocurrió un error al crear el usuario.'
          }).then(function(res) {
            console.log('Error ' + err);
          });
        });
      }
    }

    console.log('AuthController OK');
  }

  angular
    .module('auth')
    .controller ('AuthController',  [
      '$state',
      '$ionicLoading',
      '$ionicPopup',
      'FAuthService',
      authController
    ]);

})();
