'use strict';

(function ()  {

  function contactsController ( $scope, $firebaseArray, $state, $ionicLoading, AMTChatsService, FAuthService) {

    var self = this;

    self.contacts = [];

    console.log('contacts controller ok');

    self.createRoom = createRoom;
    self.init = init;

    //$scope.$on('$ionicView.beforeEnter', function ()  {
    //  if (self.contacts.length == 0)
    //    init();
    //});

    function init ()  {

      $ionicLoading.show({
        template: 'Cargando contactos...'
      });

      console.log('contacts controller init');
      var ref = new Firebase('https://amtalk.firebaseio.com/users');

      //var cf = $firebaseArray(ref);

      ref.on('child_added', function (childSnapshot, prevChildKey) {

        var contact = {
          email: childSnapshot.val().email,
          alias: childSnapshot.val().alias
        };

        //console.log(contact);

        if (contact.email !== FAuthService.user.email) {
          self.contacts.push(contact);
        }

        $ionicLoading.hide();
      });
    }

    function createRoom(person) {

        $firebaseArray(new Firebase ('https://amtalk.firebaseio.com/rooms/'))
          .$loaded()
          .then(function (rooms) {

            console.log(rooms);

            var croom = null;

            if (rooms.length > 0 )  {
            rooms.forEach(function (room) {

              var ms = [];

              for (var key in room.members) {
                ms.push(room.members[key]);
              }

              if (ms.indexOf(person.email) > -1 && ms.indexOf(FAuthService.user.email) > -1)  {
                croom = room;
              }
            });
          }

          var id = (croom ? croom.$id : MTChatsService.createRoom(person.email));
          $state.go('tab.chat', {room: id, user: FAuthService.user.email});

        });

    }

  }

  angular
    .module('amtalk.contacts')
    .controller('ContactsController', [
      '$scope',
      '$firebaseArray',
      '$state',
      '$ionicLoading',
      'AMTChatsService',
      'FAuthService',
      contactsController
    ]);
})();
