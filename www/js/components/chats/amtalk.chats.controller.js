'use strict';

(function ()  {

  function chatController ($ionicTabsDelegate)  {

    function init ()  {
      
    }

    function getChat (from, to) {
      var ref = new Firebase ('https://amtalk.firebaseio.com/' + 'chats/' + from.email)
        .startAt(to.email)
        .endAt(to.email)
        .once('value', function (snap)  {
          console.log(snap.value);
        }).catch (function (err)  {
          console.log(err);
        });

    }

    console.log('ChatController OK');
  }

  function chatsController () {

  }

  angular
    .module('amtalk.chats')
    .controller('ChatsController', [
      chatsController
    ]);

  angular
    .module('amtalk.chats')
    .controller('ChatController', [
      '$ionicTabsDelegate',
      chatController
    ]);
})();
