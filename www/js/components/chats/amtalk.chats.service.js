'use strict';

(function ()  {
  function chatService ($firebaseArray, $firebaseObject, FAuthService)  {

    var self = this;
    //var rooms = $firebaseArray(ref.child('rooms'));
    var userRooms = [];
    var roomMessages = [];

    function getMessages (room) {
      var ref = new Firebase ('https://amtalk.firebaseio.com/messages');

      ref
        .orderByChild('room')
        .startAt(room)
        .endAt(room)
        .once ('value', function (snap)  {
        //console.log('once');
        //console.log(snap.val());
        //roomMessages = snap.val();
        //console.log(roomMessages);
        return snap.val();
      });

      /*ref
        .orderByChild('room')
        .startAt(room)
        .endAt(room)
        .on('value', function (snap)  {
          console.log(on);
          console.log(snap.val());
          userRooms.push(snap.val());
        });*/

    }

    function sendMessage(room, message, source)  {
      var ref = new Firebase ('https://amtalk.firebaseio.com/messages');
      var time = new Date ().getTime();
      ref.child(time).set({
        room: room,
        timestamp: time,
        message: message,
        source: source
      }, function ()  {
        console.log('sended');
      });
    }

    function lookRoom(members)  {

      new Firebase ('https://amtalk.firebaseio.com/rooms/')
        .on('child_added', function (snap) {
          snap.forEach(function (room)  {
            angular.forEach(room.child('members').val(), function (member, mkey) {
              if (member === FAuthService.user.email) {
                userRooms.push($firebaseObject(new Firebase ('https://amtalk.firebaseio.com/rooms/' + room.key())));
              }
            });
          });
        });

    }

    function searchRoom(members)  {


    }

    function createRoom (members)  {

      var ref = new Firebase ('https://amtalk.firebaseio.com/rooms');

      console.log(members);

      var id = new Date ().getTime();
      ref.child(id).child('members').push(FAuthService.user.email);
      ref.child(id).child('members').push(members);

      return id;

    }

    return {
      createRoom: createRoom,
      lookRoom: lookRoom,
      rooms: function ()  {
        return userRooms;
      },
      sendMessage: sendMessage,
      getMessages: getMessages
    }

  }

  angular
    .module('amtalk.chats')
    .factory('AMTChatsService', [
      '$firebaseArray',
      '$firebaseObject',
      'FAuthService',
      chatService
    ])
})();
