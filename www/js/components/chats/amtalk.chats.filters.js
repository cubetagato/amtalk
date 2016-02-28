'use strict';

(function ()  {

  function calendar ()  {
    return function (time)  {
      if (!time) return;

      return moment(time).calendar(null, {
        lastDay: '[Yesterday]',
        sameDay: 'LT',
        lastWeek: 'dddd',
        sameElse: 'DD/MM/YY'
      });
    };
  }

  angular
    .module('amtalk.chats')
    .filter('calendar', [
      calendar
    ]);

})();
