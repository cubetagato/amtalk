'use strict';

(function ()  {
  angular
    .module('amtalk')
    .config(function($stateProvider, $urlRouterProvider)  {
      $stateProvider
        .state('auth',  {
          url: '/auth',
          templateUrl: 'js/common/auth/auth.signin.view.html',
          controller: 'AuthController',
          controllerAs: 'authCtrl',
          resolve:  {
            'currentAuth': ['FAuthService', function (FAuthService) {
              return FAuthService.ref().$waitForAuth();
            }]
          }
        })
        .state('auth-up', {
          url: '/signup',
          templateUrl: 'js/common/auth/auth.signup.view.html',
          controller: 'AuthController',
          controllerAs: 'authCtrl',
          cache: false
        })
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'js/common/tabs/tabs.view.html',
          cache: false,
          resolve:  {
            'currentAuth': ['FAuthService', function (FAuthService) {
              return FAuthService.ref().$requireAuth();
            }]
          }
        })
        .state('tab.contacts', {
          url: '/contacts',
          views:  {
            'tab-contacts': {
              templateUrl: 'js/components/contacts/amtalk.contacts.view.html',
              controller: 'ContactsController',
              controllerAs: 'contactsCtrl'
            }
          }
        })
        .state('tab.chats',  {
          url: '/chats',
          views:  {
            'tab-chats':  {
              templateUrl: 'js/components/chats/amtalk.chats.view.html',
              controller: 'ChatsListController',
              controllerAs: 'chatsCtrl'
            }
          }
        })
        .state('tab.chat',  {
          url: '/chats?:room&:user',
          views:  {
            'tab-chats':  {
              templateUrl: 'js/components/chats/amtalk.chats.chat.view.html',
              controller: 'ChatController',
              controllerAs: 'chatCtrl'
            }
          }
        });

        $urlRouterProvider.otherwise('/auth');
        /*$urlRouterProvider.otherwise(function($injector, $location) {
          var $state = $injector.get('$state');
          $state.go('auth');
        })*/

        console.log('Routes OK');
    });
})();
