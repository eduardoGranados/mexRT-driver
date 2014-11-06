angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function($ionicPlatform) {

        $ionicPlatform.registerBackButtonAction(function(e){
            //do your stuff
            e.preventDefault();
            return false;
        },101);

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

    })

.config(function ($stateProvider, $urlRouterProvider) 
{
    $stateProvider

        .state('sign-in', { 
            url: '/sign-in',
            templateUrl: 'templates/sign-in.html',
            controller: 'SignInCtrl'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        })

        .state('recover-password', {
            url: '/recover-password',
            templateUrl: 'templates/recover-password.html',
            controller: 'PassCtrl'
        })

        .state('create-account', {
            url: '/create-account',
            templateUrl: 'templates/create-account.html',
            controller: 'SignUpCtrl'
        })

        .state('settings', {
            url: '/settings',
            templateUrl: 'templates/edit-profile.html',
            controller: 'EditPerfilCtrl'
        })

        .state('change-password', {
            url: '/change-password',
            templateUrl: 'templates/change-password.html',
            controller: 'PassCtrl'
        })

        .state('delete-perfil', {
            url: '/delete-perfil',
            templateUrl: 'templates/delete-account.html',
            controller: 'DeletePerfilCtrl'
        })

        .state('request-accepted', {
            url: '/request-accepted',
            templateUrl: 'templates/request-accepted.html',
            controller: 'RequestCtrl'
        });

    $urlRouterProvider.otherwise('/sign-in');
});