var app = angular.module('doeIets', ['ngRoute', 'Token', 'httpRequests', 'Login', 'Register', 'Feed', 'Profile', 'Options', 'SearchResult', 'Friends', 'mapApp' ,'ngFileUpload']);



app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            //Login
            templateUrl: 'views/Login/Login.html',
            controller: 'LoginController',
        })
        .when('/Register', {
            //Register
            templateUrl: 'views/Login/Register.html',
            controller: 'RegisterController',
        })
        .when('/Feed', {
            //Feed
            templateUrl: 'views/Application/Feed.html',
            controller: 'FeedController',
        })
        .when('/Profile', {
            //Profile
            templateUrl: 'views/Application/Profile.html',
            controller: 'ProfileController',
        })
        .when('/Options', {
            //Options
            templateUrl: 'views/Application/Options.html',
            controller: 'OptionsController',
        })
        .when('/SearchResult', {
            //SearchResult
            templateUrl: 'views/Application/SearchResult.html',
            controller: 'SearchResultController',
        })
        .when('/Friends', {
            //Friends
            templateUrl: 'views/Application/Friends.html',
            controller: 'FriendsController',
        })
        .otherwise({
            //Login
            redirectTo: '/'
        });
}]);