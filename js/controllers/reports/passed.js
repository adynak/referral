myApp.controller('ReportPassedController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster) {

        $scope.prompts = txtReports;

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


        Data.getReferralsPassed().then(function(results) {
            $scope.resultsCount = results.length;
            $scope.data = results;
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