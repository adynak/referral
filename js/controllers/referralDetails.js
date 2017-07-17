nwc.controller('ReferralDetailsController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster) {

        $scope.prompts = txtReferralDetails;
        $scope.referral = Data.getCurrentReferral();
        $scope.member = Data.getCurrentMember();

        var datePrompts = txtDatePicker;

        var dateRangePickerCallBack = function(start, end, label) {
            $('#closeThisReferral span').html(start.format(datePrompts.format));

            var now = moment().format('YYYY-MM-DDTHH:mm:ss');
            var nowTime = now.split("T")[1];

            var closeIt = start.format('YYYY-MM-DDTHH:mm:ss');
            var closeDate = closeIt.split("T")[0];
            closeIt = closeDate + 'T' + nowTime;
            $scope.referral.closereferraldate = closeIt;
        };

        var dateConfig = {
            startDate: moment(),
            minDate:   moment().subtract(364, 'days'),
            maxDate:   moment().endOf('year'),
            singleDatePicker: true,
            todayHighlight: true,
            showDropdowns: true,
            orientation: 'top',
            opens: 'left',
            format: datePrompts.format,
            locale: {
                daysOfWeek: datePrompts.daysOfWeek,
                monthNames: datePrompts.monthNames
            }
        };

        if ($scope.referral.closereferraldate == null){
            $('#closeThisReferral span').html(datePrompts.clickToSelect);
        } else {
            $('#closeThisReferral span').html(moment($scope.referral.closereferraldate).format(datePrompts.format));
        }

        $('#closeThisReferral').daterangepicker(dateConfig, dateRangePickerCallBack);

        if ($scope.referral.closereferraldate===null){

        } else {
            $scope.referral.dateclosed = new Date($scope.referral.closereferraldate);
        }

        $scope.daysAgo = $scope.referral.DateSent + ' (' + dateDiffInDays($scope.referral.DateSent) + ' days ago)';

        $scope.updateReferral = function() {

            Data.updateReferral($scope.referral).then(function(results) {
            window.history.back();
                toaster.pop('success', "", txtReferralDetails.updateReferral, 3000, 'trustedHtml');
            });

        };

        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        function dateDiffInDays(then) {
            var date1, date2, timeDiff, diffDays;
            then = then.split(' ');
            date1 = new Date(then[0]);
            date2 = new Date();
            timeDiff = Math.abs(date2.getTime() - date1.getTime());
            diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            return diffDays;
        };

    }
]);