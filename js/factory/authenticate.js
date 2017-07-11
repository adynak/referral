myApp.factory("Data", ['$http', '$q', '$rootScope',
    function($http, $q, $rootScope) {

        var factoryVariables = [
        ];

        var setIsNotLoggedIn = function(flag){
            factoryVariables.isNotLoggedIn = flag;
        }

        var getIsNotLoggedIn = function(){
            return factoryVariables.isNotLoggedIn;
        }

        var setAuthenticated = function(flag){
            factoryVariables.authenticated = flag;
        }

        var getAuthenticated = function(){
            return factoryVariables.authenticated;
        }

        var setNoteCount = function(noteCount){
            factoryVariables.noteCount = noteCount;
        }

        var getNoteCount = function(){
            return factoryVariables.noteCount;
        }

        var setCurrentMember = function(currentMember){
            factoryVariables.currentMember = currentMember;
        }

        var getCurrentMember = function(){
            return factoryVariables.currentMember;
        }

        var setCurrentReferral = function(referral){
            factoryVariables.currentReferral = referral;
        }

        var getCurrentReferral = function(){
            return factoryVariables.currentReferral;
        }

        var validateCredentials = function(member){
            var qObject = $q.defer();
            var params = {
                onlineID: member.onlineID,
                password: member.password,
                task: 'validate'
            };
            $http({
                method: 'POST',
                url: 'referrals.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;            
        }

        var registerMember = function(member) {
            var qObject = $q.defer();
            var params = {
                userInfo: member,
                task: 'register'
            };
            $http({
                method: 'POST',
                url: 'referrals.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;            
        }

        var updateMemberInfo = function(){

            var member = getCurrentMember();
            var qObject = $q.defer();
            var params = {
                userInfo: member,
                task: 'updateuser'
            };
            $http({
                method: 'POST',
                url: 'referrals.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);

            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }

        var updateReferral = function(referral){

            var qObject = $q.defer();
            var params = {
                referral: referral,
                task: 'updateReferral'
            };
            $http({
                method: 'POST',
                url: 'referrals.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);

            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }


        var insertNewReferral = function(referral){
            var qObject = $q.defer();
            var params = {
                referral: referral,
                task: 'insertNewReferral'
            };

            $http({
                method: 'POST',
                url: 'referrals.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;            
        }

        var getNotifications = function(memberInfo){
            var qObject = $q.defer();
            var params = {
                id: memberInfo.id,
                task: 'getNotifications'
            };
            $http({
                method: 'POST',
                url: 'referrals.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }

        var getActiveMembers = function(){
            var qObject = $q.defer();
            var params = {
                task: 'getActiveMembers'
            };
            $http({
                method: 'POST',
                url: 'reports.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }

        var getReferralsPassed = function(dates){
            var qObject = $q.defer();
            var params = {
                task: 'getReferralsPassed',
                dateStart: dates.dateStart,
                dateStop: dates.dateStop
            };
            $http({
                method: 'POST',
                url: 'reports.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }

        var getClosedBusiness = function(){
            var qObject = $q.defer();
            var params = {
                task: 'getClosedBusiness'
            };
            $http({
                method: 'POST',
                url: 'reports.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }

        var logout = function(member){
            var qObject = $q.defer();
            var params = {
                task: 'logout'
            };
            $http({
                method: 'POST',
                url: 'referrals.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }

        var getSession = function(task){
            var qObject = $q.defer();
            var params = {
                task: task
            };
            $http({
                method: 'POST',
                url: 'referrals.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }

        var getTemperature = function(){
            var qObject = $q.defer();
            var params = {
                task: 'getTemperature'
            };
            $http({
                method: 'POST',
                url: 'referrals.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }



        return {
            validateCredentials: validateCredentials,
            registerMember: registerMember,
            updateMemberInfo: updateMemberInfo,
            insertNewReferral: insertNewReferral,
            getNotifications: getNotifications,
            logout: logout,
            getSession: getSession,
            setNoteCount: setNoteCount,
            getNoteCount: getNoteCount,
            setCurrentMember: setCurrentMember,
            getCurrentMember: getCurrentMember,
            getActiveMembers: getActiveMembers,
            getReferralsPassed: getReferralsPassed,
            getClosedBusiness: getClosedBusiness,
            setCurrentReferral: setCurrentReferral,
            getCurrentReferral: getCurrentReferral,
            updateReferral: updateReferral,
            getTemperature: getTemperature,
            setIsNotLoggedIn: setIsNotLoggedIn,
            getIsNotLoggedIn: getIsNotLoggedIn,
            setAuthenticated: setAuthenticated,
            getAuthenticated: getAuthenticated
        };
    }
]);