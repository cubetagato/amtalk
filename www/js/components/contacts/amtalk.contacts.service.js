'use strict';

(function ()  {

  function contactsService ($firebaseArray) {
    var ref = new Firebase('https://amtalk.firebaseio.com/');
    var contacts = $firebaseArray(ref.child('users'));
    //console.log(contacts);

    return  {
      all: function ()  {
        return contacts;
      },
      get: function (contactId)  {
        return contacts.$getRecord(contactId);
      }
    };
  }

  angular
    .module('amtalk.contacts')
    .factory ('AMTContactsService', [
      '$firebaseArray',
      contactsService
    ]);

})();
