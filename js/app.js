var nwc = angular.module('nwc', ['ngRoute', 'ngAnimate', 'toaster', 'ngTouch', 
                                     'ui.grid', 'ngMessages', 'daterangepicker']);

nwc.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $locationProvider.hashPrefix(''); 

    document.title = txtNavigation.brandName;
    $routeProvider.
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController',
        task: 'getsessiondata'
    }).
    when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController',
        task: 'getsessiondata'
    }).
    when('/refer', {
        templateUrl: 'views/refer.html',
        controller: 'ReferralController',
        task: 'getMemberInfo'
    }).
    when('/referrals', {
        templateUrl: 'views/referrals.html',
        controller: 'ReferralsController',
        task: 'getMemberInfo'
    }).
    when('/referralDetails', {
        templateUrl: 'views/referralDetails.html',
        controller: 'ReferralDetailsController',
        task: 'getMemberInfo'
    }).
    when('/success', {
        templateUrl: 'views/success.html',
        controller: 'SuccessController',
        task: 'getsessiondata'
    }).
    when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController',
        task: 'getsessiondata'
    }).
    when('/reports/active', {
        templateUrl: 'views/reports/active.html',
        controller: 'ReportActiveController',
        task: 'getsessiondata'
    }).
    when('/reports/passed', {
        templateUrl: 'views/reports/passed.html',
        controller: 'ReportPassedController',
        task: 'getsessiondata'
    }).
    when('/reports/closed', {
        templateUrl: 'views/reports/closed.html',
        controller: 'ReportClosedController',
        task: 'getsessiondata'
    }).    
    otherwise({
        redirectTo: '/login',
        task: 'getsessiondata'

    });

}]).run(function($rootScope, $location, Data) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        Data.setIsNotLoggedIn(true);
        Data.setAuthenticated(false);

        $rootScope.isnotloggedin = true;
        $rootScope.authenticated = false;

        var nextUrl = next.templateUrl;
        Data.getSession(next.task).then(function(results) {
            if (results[0].id) {
                $rootScope.isnotloggedin = false;
                $rootScope.authenticated = true;

                Data.setIsNotLoggedIn(false);
                Data.setAuthenticated(true);

                if (next.task === 'getsessiondata') {
                    Data.setCurrentMember(results[0]);
                }

                if (nextUrl == 'views/register.html' || nextUrl == 'views/login.html') {
                    $location.path("/success");
                }
            } else {
                if (nextUrl == 'views/register.html' || nextUrl == 'views/login.html') {
                } else {
                    $location.path("/login");
                }
            }
        });
    });
});