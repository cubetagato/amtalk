'use strict';

(function ()  {

  function chatController ($ionicTabsDelegate, $stateParams, AMTChatsService)  {

    var self = this;

    self.messages = [];
    self.room = $stateParams.room;
    self.user = 'gihernandez@indracompany.com';
    self.message = '';

    self.sendMessage = sendMessage;
    self.init = init;

    function init() {
      getMessages();
    }

    function getMessages () {
      var ref = new Firebase ('https://amtalk.firebaseio.com/messages');

      /*ref
        .orderByChild('room')
        .startAt(self.room)
        .endAt(self.room)
        .once ('value', function (snap)  {
        //self.messages = snap.val();
          snap.forEach( function (mss)  {
            self.messages.push(mss.val());
          });
        //console.log(self.messages);
      });*/

      ref
        .orderByChild('room')
        .startAt(self.room)
        .endAt(self.room)
        .on ('child_added', function (childSnapshot, prevChildKey)  {
          //self.messages[];
          var obj = childSnapshot.val();
          self.messages.push({
            text: obj.message,
            timestamp: new Date (obj.timestamp),
            owner: obj.source,
            mine: (obj.source == self.user)
          });
          //console.info(self.messages);
      });

    }

    function sendMessage () {
      var room = $stateParams.room;
      console.log('room: ' + room);
      AMTChatsService.sendMessage(room, self.message, self.user);
      self.message = '';
    }

    console.log('ChatController OK');
  }

  function chatsListController (AMTChatsService) {
    var self = this;

    self.getChats = getChats;
    self.init = init;
    self.rooms = AMTChatsService.rooms();

    function init ()  {
      getChats();
    }

    function getChats ()  {
      AMTChatsService.lookRoom();
    }

    console.log('ChatsListControllerOk')
  }

  angular
    .module('amtalk.chats')
    .controller('ChatsListController', [
      'AMTChatsService',
      chatsListController
    ]);

  angular
    .module('amtalk.chats')
    .controller('ChatController', [
      '$ionicTabsDelegate',
      '$stateParams',
      'AMTChatsService',
      chatController
    ]);
})();
