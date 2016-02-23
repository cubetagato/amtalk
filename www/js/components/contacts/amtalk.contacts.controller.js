'use strict';

(function ()  {

  function contactsController (AMTContactsService) {

    var self = this;

    self.contacts = AMTContactsService.all();
    console.log(self.contacts);

  }

  angular
    .module('amtalk.contacts')
    .controller('ContactsController', [
      'AMTContactsService',
      contactsController
    ]);
})();
