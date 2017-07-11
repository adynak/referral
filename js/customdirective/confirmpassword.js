myApp.directive('passwordMatch', [function() {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function(scope, elem, attrs, control) {
            var checker = function() {
                var e1 = scope.$eval(attrs.ngModel);
                var e2 = scope.$eval(attrs.passwordMatch);
                if (e2 != null)
                    return e1 == e2;
            };
            scope.$watch(checker, function(flagtrueorfalse) {
                control.$setValidity("passwordNotMatch", flagtrueorfalse);
            });
        }
    };
}]);