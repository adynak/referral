nwc.controller('ProfileController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster) {

        $scope.prompts = txtProfile;
        var member = Data.getCurrentMember();
        var passwordConfirm = {"confirmpassword": member.password};
        angular.extend(member, passwordConfirm);
        $scope.member = member;

        $scope.applyThisClass = function(memberProfile) {
            if (typeof(memberProfile) !== 'undefined'){
                if (memberProfile.member_type) {
                    return "";
                } else {
                    return "sr-only";
                }
            }
        }

        $scope.updateMemberInfo = function() {
            Data.updateMemberInfo().then(function(status) {
                toaster.clear();
                if (status == 'success') {
                    $location.path('/success');
                    toaster.pop('info', "", txtProfile.updateSuccessful, 3000, 'trustedHtml');
                } else if (status == 'usernameexists') {
                    $scope.invalidmessage = 'Member name already exists';
                    toaster.pop('warning', "", 'username exists', 3000, 'trustedHtml');
                } else {
                    $scope.invalidmessage = 'Update failed';
                }
            }, function(err) {
                $scope.invalidmessage = err;
            });
        };

    }
]);