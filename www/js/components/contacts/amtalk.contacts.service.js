'use strict';

(function ()  {

  function contactsService ($firebaseArray, FAuthService) {
    var ref = new Firebase('https://amtalk.firebaseio.com/');
    //var contacts = $firebaseArray(ref.child('users'));
    var self = this;
    var contacts = [];
    //console.log(contacts);

    

    return  {
      all: contacts,
      get: function (contactId)  {
        return contacts.$getRecord(contactId);
      }
    };
  }

  angular
    .module('amtalk.contacts')
    .factory ('AMTContactsService', [
      '$firebaseArray',
      'FAuthService',
      contactsService
    ]);

})();
