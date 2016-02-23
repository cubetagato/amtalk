'use strict';

(function ()  {
  function chatService ($firebaseArray)  {


    var rooms = $firebaseArray(ref.child('rooms'));

    function getRoom (from, to) {
      var ref = new Firebase ('https://amtalk.firebaseio.com/' + 'chats/' + from.email)
        .startAt(to.email)
        .endAt(to.email)
        .once('value', function (snap)  {
          console.log(snap.value);
        }).catch (function (err)  {
          console.log(err);
        });
      
    }


    function createRoom (from, to)  {
      var room =  {
        from: from.uid,
        to: to.email,
        title: to.alias,
        date: new Date ()
      }

      rooms.$add(room).then (function (data)  {
        console.log("Room created");
        console.log(data);
      });
    }



  }
})();
