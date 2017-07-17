nwc.controller('RegistrationController', ['$scope', '$http', '$location', 'Data', '$rootScope', 'toaster',
    function($scope, $http, $location, Data, $rootScope, toaster) {

        $scope.prompts    = txtLogin;
        $scope.promptsReg = txtProfile;
        $scope.required   = false;

        $scope.login = function() {
            member = $scope.member;
            if (typeof(member) == 'undefined') member = {onlineID:'jzook',password:'jzook'};

            Data.validateCredentials(member).then(function(status) {
                if (status.validated == 'success') {
                    Data.setCurrentMember(status.member);
                    Data.setNoteCount(status.notifications);
                    $location.path('/success');
                    toaster.pop('success', "", txtLogin.credentialsValid, 3000, 'trustedHtml');
                } else {
                    Data.setCurrentMember('');
                    $scope.invalidMessage = txtLogin.credentialsInvalid;
                    toaster.pop('error', "", txtLogin.credentialsInvalid, 3000, 'trustedHtml');
                }

            }, function(err) {
                $scope.invalidMessage= err;
            });

        };

        $scope.register = function() {
            Data.registerMember($scope.member).then(function(status) {
                if (status == 'success') {
                    $location.path('/success');
                    toaster.pop('success', "", txtLogin.registrationSuccess, 3000, 'trustedHtml');
                } else {
                    Data.setCurrentMember('');
                    txtLogin.credentialsInvalid = status;
                    toaster.pop('warning', "", status, 3000, 'trustedHtml');
                }

            }, function(err) {
                $scope.invalidMessage= err;
            });
        };

        $scope.logout = function() {
            Data.logout().then(function(status) {
                if (status == 'success') {
                    $location.path('/login');
                    toaster.pop('info', "", txtLogin.logOut, 3000, 'trustedHtml');
                } else {
                    $scope.invalidmessage = 'log out failed';
                }
            }, function(err) {
                $scope.invalidmessage = err;
            });
        };

    }
]);