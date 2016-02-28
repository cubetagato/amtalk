'use strict';

(function ()  {

  function chatController ($ionicTabsDelegate, $stateParams, $ionicLoading, AMTChatsService, FAuthService)  {

    var self = this;

    self.messages = [];
    self.room = $stateParams.room;
    self.user = null;
    self.message = '';

    self.sendMessage = sendMessage;
    self.init = init;

    function init() {
      self.user = FAuthService.user;
      getMessages();
    }

    function getMessages () {
      $ionicLoading.show({
        template: 'Cargando conversacion...'
      });

      var ref = new Firebase ('https://amtalk.firebaseio.com/messages');

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
            mine: (obj.source == self.user.email)
          });
          //console.info(self.messages);

          $ionicLoading.hide();
      });

    }

    function sendMessage () {
      var room = $stateParams.room;
      console.log('room: ' + room);
      AMTChatsService.sendMessage(room, self.message, self.user.email);
      self.message = '';
    }

    console.log('ChatController OK');
  }

  function chatsListController ($scope, $ionicHistory, $firebaseObject, $ionicLoading, AMTChatsService, FAuthService) {
    var self = this;

    self.getChats = getChats;
    self.init = init;
    self.rooms = [];

    $scope.$on('$ionicView.beforeEnter', function ()  {
      $ionicHistory.clearHistory();
      //$ionicHistory.clearCache();
    });

    function init ()  {
      console.log('init');
      getChats();
    }

    function getChats ()  {
      $ionicLoading.show({
        template: 'Cargando...'
      });
      console.log('getChats');

      new Firebase ('https://amtalk.firebaseio.com/rooms/')
        .on('child_added', function (childSnapshot, prevChildKey) {
          console.log(childSnapshot.val());

          childSnapshot.child('members').forEach(function(member) {
            console.log(member.val());
            if (member.val() == FAuthService.user.email)  {
              console.log('add');
              self.rooms.push($firebaseObject(new Firebase ('https://amtalk.firebaseio.com/rooms/' + childSnapshot.key())));
            }
          });

          $ionicLoading.hide();

        });

    }

    console.log('ChatsListControllerOk')
  }

  angular
    .module('amtalk.chats')
    .controller('ChatsListController', [
      '$scope',
      '$ionicHistory',
      '$firebaseObject',
      '$ionicLoading',
      'AMTChatsService',
      'FAuthService',
      chatsListController
    ]);

  angular
    .module('amtalk.chats')
    .controller('ChatController', [
      '$ionicTabsDelegate',
      '$stateParams',
      '$ionicLoading',
      'AMTChatsService',
      'FAuthService',
      chatController
    ]);
})();
