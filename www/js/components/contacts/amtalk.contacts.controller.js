'use strict';

(function ()  {

  function contactsController ( $firebaseArray, $state, AMTChatsService, FAuthService) {

    var self = this;

    self.contacts = [];
    self.x = [];

    self.createRoom = createRoom;
    self.init = init;

    function init ()  {
      //console.log('FAuthService.user: ');
      //console.log(FAuthService.user);

      var ref = new Firebase('https://amtalk.firebaseio.com/users');

      var cf = $firebaseArray(ref);

      /*cf.$loaded()
        .then(function (cfl) {
          console.log(cfl);
          cfl.forEach(function (c)  {
            console.log(c);
            if (c.email !== FAuthService.user.email ) {
              console.log('Agregar');
              self.contacts.push(c);
            } else {
              console.log('NO');
            }
          });

        });*/


      ref.on('child_added', function (childSnapshot, prevChildKey) {

        var contact = {
          email: childSnapshot.val().email,
          alias: childSnapshot.val().alias
        };

        //console.log(contact);

        if (contact.email !== FAuthService.user.email) {
          self.contacts.push(contact);
        }
      });
    }

    function createRoom(person) {

      $firebaseArray(new Firebase ('https://amtalk.firebaseio.com/rooms/'))
      .$loaded().then(function (rooms)  {
        console.log(rooms);
        var valid = true;
        //rooms.forEach(function (room)  {
        for (var j=0; j<rooms.length; j++)  {
          for(var i=0; i<rooms[j].members.length; i++)  {
            if(rooms[j].members[i] < 0) {
              valid = false;
              break;
            }
          }
          break;
        }
        //});

        if(valid) {
          $state.go('tab.chat', {room: room.$id, user: FAuthService.user.email });
        } else {
          console.info('createRoom');
          //console.log(person);
          //var members = [];
          //members.push(person.email);
          var id = AMTChatsService.createRoom(person.email);
          $state.go('tab.chat', {room: id, user: FAuthService.user.email});
        }

      });

      /*console.info('createRoom');
      console.log(person);
      var members = [];
      members.push(person.email);
      AMTChatsService.createRoom(person.email);*/
    }

  }

  angular
    .module('amtalk.contacts')
    .controller('ContactsController', [
      '$firebaseObject',
      '$state',
      'AMTChatsService',
      'FAuthService',
      contactsController
    ]);
})();
