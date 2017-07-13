nwc.controller('ReportPassedController', ['$scope', '$http', '$location', 'Data', 
                                            '$rootScope', '$routeParams', 'toaster',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster) {

        $scope.prompts = txtReports;

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
                referralDate = new Date(data.referraldate);
                return (referralDate >= startDate && referralDate <= stopDate);
            }); 

            $scope.data = requiredData;
            $scope.resultsCount = requiredData.length;

        }, false);

        var memberInfo = {};
        memberInfo.id = Data.getCurrentMember().id;

        function rowTemplate() {
            return '<div ng-click="grid.appScope.rowClick(row)" >' +
                '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                '</div>';
        }

        $scope.rowClick = function(row) {
            // TODO redirect to referralDetails page
            // alert(JSON.stringify(row.entity));
        };

        params = {};
        params.dateStart = (moment().subtract(364, "days")._d.getMonth() + 1) + "/" + moment().subtract(364, "days")._d.getDate() + "/" +  moment().subtract(364, "days")._d.getFullYear();
        params.dateStop  = (moment()._d.getMonth() + 1) + "/" + moment()._d.getDate() + "/" +  moment()._d.getFullYear();

        Data.getReferralsPassed(params).then(function(results) {
            $scope.resultsCount = results.length;
            $scope.data = results;
            queryResults = results ;
        });

        $scope.gridOptions = {
            enableFiltering: true,
            rowTemplate: rowTemplate(),
            data: 'data',
            columnDefs: [{
                    name: 'referraldate',
                    displayName: $scope.prompts.gridColumnOpened,
                    type: 'date',                    
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right'
                },
                {
                    name: 'from',
                    displayName: $scope.prompts.gridColumnFrom                    
                },
                {
                    name: 'to',
                    displayName: $scope.prompts.gridColumnTo                    
                },
                {
                    name: 'description',
                    displayName: $scope.prompts.gridColumnDescription
                },
                {
                    name: 'temperature',
                    displayName: $scope.prompts.gridColumnTemperature
                }                
            ]
        };

    }
]);