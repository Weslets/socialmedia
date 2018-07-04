angular.module('Profile')
    .controller('ProfileController', function ($scope, $route, $location, $timeout, $rootScope, UriBuilder, httpRequestService) {
        
        var url = UriBuilder.BuildUrl("Account", { 'id': null });
        httpRequestService.getRequest(url, function success(response) {
            $scope.Account = response.data;
        }, function fail(response) {
            console.log("Ging iets fout bij het ophalen van het account");
        });

        //Getting ProfileInfo and Feed 
        var profileId = $rootScope.UsId;
        var userId = $rootScope.User;
        if (profileId == null) {
            //Bij refresh moet hier id van ingelogde gebruiker komen te staan
            //profileId = 'Id'
            console.log("If " + profileId);
        }

        $scope.isOther = false;
        if (profileId != userId) {
            $scope.isOther = true;
        }

        $scope.checkVideo = function () {
            var noVideo = 0;
            for (i = 0; i < $scope.Feed.length; i++) {
                if ($scope.Feed[i].Feed.VideoUrl == undefined) {
                    $scope.Feed[i].isvideo = false;
                    noVideo++;
                } else {
                    $scope.Feed[i].isvideo = true;
                }
                if (noVideo == $scope.Feed.length) {
                    console.log("doet wel iets");
                    $scope.noMediaVideo = true; //Waarom doet deze het niet?
                }
            }
            
        }

        $scope.checkPhoto = function () {
            var noPhoto = 0;
            for (i = 0; i < $scope.Feed.length; i++) {
                if ($scope.Feed[i].Feed.ImageUrl == undefined) {
                    $scope.Feed[i].isImage = false;
                    noPhoto++;
                } else {
                    $scope.Feed[i].isImage = true;
                }
                if (noPhoto == $scope.Feed.length) {
                    $scope.noMediaPhoto = true;
                }
            }
        }
        
        var url = UriBuilder.BuildUrl("ProfileInfo", { 'id': profileId });
        httpRequestService.getRequest(url, function success(response) {
            $scope.ProfileInfo = response.data;
            var url = UriBuilder.BuildUrl("Feed", { 'id': profileId });
            httpRequestService.getRequest(url, function success(response) {
                $scope.Feed = response.data;
                $scope.checkVideo();
                $scope.checkPhoto();
            }, function fail(response) {
                console.log("Ging iets fout bij het ophalen van de Feed");
            });
        }, function fail(response) {
            console.log("Ging iets fout bij het ophalen van het Profile");
            });


        //Friend Requests ophalen
        var url = UriBuilder.BuildUrl("FriendRequest");
        httpRequestService.getRequest(url, function success(response) {
            $scope.friendRequests = response.data;
            
        }, function fail(response) {
            console.log("Ging iets fout bij het ophalen van het Profile");
            });

        //Friend request versturen
        $scope.addFriend = function (FriendUserId) {
            console.log("id " + FriendUserId);
            var url = UriBuilder.BuildUrl("FriendRequest", { 'FriendUserId': FriendUserId });
            httpRequestService.PostRequest(url, null, function success(response) {
                console.log("Friend Requests send");
            }, function fail(response) {
                console.log("not Send");
            });
        }

        //Handle requests
        $scope.checkRequest = function (FriendUserId, accepted) {
            var url = UriBuilder.BuildUrl("FriendRequest", { 'FriendUserId': FriendUserId, 'Accepted': accepted });
            console.log(url);
            httpRequestService.PutRequest(url, null, function succes(response) {
                console.log("Request handled");
            }, function fail(response) {
                    console.log("Failed");
            });
        }

        //Get Friends


        //Redirects
        $scope.profilePosts = true;
        $scope.profilePhotos = false;
        $scope.profileNotes = false;
        $scope.profileAbout = false;
        //$scope.noMedia = true;
        

        $scope.redirectFeed = function (e) {
            $location.path("/Feed");
            $location.replace();
        };

        $scope.redirectProfile = function (passId) {
            console.log("Deze?" + passId);
            $rootScope.UsId = passId;
            $location.path("/Profile");
            $location.replace();
        };

        $scope.redirectOptions = function (e) {
            $location.path("/Options");
            $location.replace();
        };

        $scope.searchBackup = function (e) {
            $location.path("/SearchResult");
            $location.replace();
        };

        $scope.redirectFriends = function (e) {
            $location.path("/Friends");
            $location.replace();
        };

        $scope.redirectLogin = function () {
            $location.path("/");
            $location.replace();
        };

        $scope.showProfilePosts = function () {
            $scope.profilePosts = true;
            $scope.profilePhotos = false;
            $scope.profileNotes = false;
            $scope.profileAbout = false;
        }

        $scope.showProfilePhotos = function () {
            $scope.profilePosts = false;
            $scope.profilePhotos = true;
            $scope.profileNotes = false;
            $scope.profileAbout = false;
        }

        $scope.showProfileNotes = function () {
            $scope.profilePosts = false;
            $scope.profilePhotos = false;
            $scope.profileNotes = true;
            $scope.profileAbout = false;
        }

        $scope.showProfileAbout = function () {
            $scope.profilePosts = false;
            $scope.profilePhotos = false;
            $scope.profileNotes = false;
            $scope.profileAbout = true;
        }
    });
