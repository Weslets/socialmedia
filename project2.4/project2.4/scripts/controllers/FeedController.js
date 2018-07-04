angular.module('Feed')
    .controller('FeedController', function ($scope, $route, $location, $timeout, UriBuilder, $rootScope, httpRequestService, Upload) {
        $scope.NewComment = [];
        $scope.RespectGiven = [];

        var url = UriBuilder.BuildUrl("Account", { 'id': null });
        httpRequestService.getRequest(url, function success(response) {
            $scope.Account = response.data;
        }, function fail(response) {
            console.log("Ging iets fout bij het ophalen van het account");
        });

        $scope.uploadFiles = function (file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: { file: file }
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
                //file.upload.then(function (response) {
                //    $timeout(function () {
                //        file.result = response.data;

                //    });
                //});
            }
        }

        $scope.checkVideo = function ()
        {
            for (i = 0; i < $scope.Feed.length; i++) {
                if ($scope.Feed[i].Feed.VideoUrl == undefined) {
                    $scope.Feed[i].isvideo = false;
                } else {
                    $scope.Feed[i].isvideo = true;
                }
            }
        }

        
        var url = UriBuilder.BuildUrl("Feed", { 'id': null });
        httpRequestService.getRequest(url,function success (response) {
            $scope.Feed = response.data;
            $scope.checkVideo();
        }, function fail (response) {
            console.log("Ging iets fout bij het ophalen van de Feed");
        });


        $scope.PostFeed = function ()
        {
            //TODO Upload image or video to webserver

            if ($scope.NewPostText != null) {
                var feedtext = $scope.NewPostText;
            } else {
                var feedtext = "No text";
            }
            if ($scope.NewPostPhoto != null) {
                var feedphoto = 'Images/' + $scope.NewPostPhoto.name;
            } else {
                var feedphoto = "";
            }
            if ($scope.NewPostVideo != null) {
                var feedVideo = 'Images/' + $scope.NewPostVideo.name;
            } else {
                var feedVideo = "";
            }
            var url = UriBuilder.BuildUrl("Feed", { 'Text': feedtext, 'imageurl': feedphoto, 'videourl': feedVideo });
            httpRequestService.PostRequest(url, null, function success(response) {
                var url = UriBuilder.BuildUrl("Feed", { 'id': null });
                httpRequestService.getRequest(url, function success(response) {
                    $scope.Feed = response.data;
                    $scope.checkVideo();
                }, function fail(response) {
                    console.log("Ging iets fout bij het ophalen van de Feed");
                });
            }, function fail(response)
            {
                console.log("niet belemaal");
            });
        }


        $scope.PostComment = function (FeedId, index)
        {
            var commentText = $scope.NewComment[index];
            var url = UriBuilder.BuildUrl("FeedDiscussion", { 'FeedId': FeedId, 'CommentText': commentText });
            httpRequestService.PostRequest(url, null, function success(response) {
                var url = UriBuilder.BuildUrl("Feed", { 'id': null });
                httpRequestService.getRequest(url,function success (response) {
                    $scope.Feed = response.data;
                    $scope.checkVideo();
                }, function fail (response) {
                    console.log("Ging iets fout bij het ophalen van de Feed");
                });
            }, function fail(response) {
                console.log("Ging iets fout bij het opslaan van de comment");
            });
        }
        //Respect button
        $scope.GiveRespect = function (FeedId, index) {
            var upvote = true;
            if ($scope.RespectGiven[index] == 1) {
                upvote = false;
                $scope.RespectGiven[index] = 0;
            }
            else
            {
                $scope.RespectGiven[index] = 1;
            }

            var url = UriBuilder.BuildUrl("FeedRespect", { 'FeedId': FeedId, 'Upvote': upvote });
            httpRequestService.PostRequest(url, null, function success(response) {
                var url = UriBuilder.BuildUrl("Feed", { 'id': null });
                httpRequestService.getRequest(url, function success(response) {
                    $scope.Feed = response.data;
                    $scope.checkVideo();
                }, function fail(response) {
                    console.log("Ging iets fout bij het ophalen van de Feed");
                });
            }, function fail(response) {
                console.log("Ging iets fout bij het opslaan van de respect");
            });
        };

        $scope.showInfo = function (profileId) {
            console.log(profileId);
            var url = UriBuilder.BuildUrl("ProfileInfo", { 'id': profileId });
            httpRequestService.getRequest(url, function success(response) {
                console.log(response.data);
            }, function fail(response) {
                console.log("Ging iets fout bij het ophalen van het account");
            });
        }


        $scope.redirectFeed = function (e) {
            $location.path("/Feed");
            $location.replace();
        };

        $scope.redirectProfile = function (passId, inlog) {
            console.log("Deze:" + passId);
            console.log("Deze2: " + inlog);
            $rootScope.UsId = passId;
            $rootScope.User = inlog;
            $location.path("/Profile");
            $location.replace();
        };

        $scope.redirectOptions = function (e) {
            $location.path("/Options");
            $location.replace();
        };

        $scope.searchBackup = function (e) {
            console.log("test")
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
    });