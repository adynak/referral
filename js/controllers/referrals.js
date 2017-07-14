nwc.controller('ReferralsController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster) {

        var memberInfo = {};
        memberInfo.id = Data.getCurrentMember().id;

        $scope.prompts = txtReferrals;
        var datePrompts = txtDatePicker;

        var queryResults ;

        $scope.dateFilter = {
            startDate: moment().subtract(364, "days"),
            endDate: moment()
        };

        $scope.dateConfig = {
            locale: {
                applyClass: 'btn-green',
                applyLabel: datePrompts.apply,
                fromLabel: datePrompts.from,
                format: datePrompts.format,
                toLabel: datePrompts.to,
                cancelLabel: datePrompts.cancel,
                customRangeLabel: datePrompts.customRange
            },
            ranges: datePrompts.ranges
        };

        //Watch for date changes
        $scope.$watch('dateFilter', function(newDate) {
            var params = {};
            params.dateStart = (newDate.startDate._d.getMonth() + 1) + "/" + newDate.startDate._d.getDate() + "/" +  newDate.startDate._d.getFullYear();
            params.dateStop  = (newDate.endDate._d.getMonth() + 1) + "/" + newDate.endDate._d.getDate() + "/" +  newDate.endDate._d.getFullYear();

            var referralDate;
            var startDate = new Date(params.dateStart);
            var stopDate  = new Date(params.dateStop);

            var requiredData = _.filter(queryResults, function(data){
                referralDate = new Date(data.DateSent);
                return (referralDate >= startDate && referralDate <= stopDate);
            }); 

            $scope.data = requiredData;
            $scope.resultsCount = requiredData.length;

        }, false);

        function rowTemplate() {
            return '<div ng-click="grid.appScope.rowClick(row)" >' +
                '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                '</div>';
        }

        $scope.rowClick = function(row) {
            $location.path('/referralDetails');
            // $rootScope.selected = row.entity;
            Data.setCurrentReferral(row.entity);
        };

        params = {};
        params.dateStart = (moment().subtract(364, "days")._d.getMonth() + 1) + "/" + moment().subtract(364, "days")._d.getDate() + "/" +  moment().subtract(364, "days")._d.getFullYear();
        params.dateStop  = (moment()._d.getMonth() + 1) + "/" + moment()._d.getDate() + "/" +  moment()._d.getFullYear();

        Data.getReferrals(memberInfo,params).then(function(results) {
            $scope.notificationCount = results.length;
            $scope.data = results;
            queryResults = results ; 
        });

        $scope.gridOptions = {
            enableFiltering: true,
            rowTemplate: rowTemplate(),
            data: 'data',
            columnDefs: [{
                    name: 'referralfrom',
                    displayName: $scope.prompts.gridColumnReferralFrom,
                    width: '20%' 
                },
                {
                    name: 'description',
                    displayName: $scope.prompts.gridColumnDescription
                },
                {
                    name: 'DateSent',
                    displayName: $scope.prompts.gridColumnDateSent,
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right',
                    width: '20%' 
                }
            ]
        };

    }
]);