nwc.controller('ReportActiveController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster',
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
            alert(JSON.stringify(row.entity));
        };


        Data.getActiveMembers().then(function(results) {
            $scope.resultsCount = results.length;
            $scope.data = results;
        });

        $scope.gridOptions = {
            enableFiltering: true,
            rowTemplate: rowTemplate(),
            data: 'data',
            columnDefs: [{
                    name: 'member',
                    displayName: $scope.prompts.gridColumnMember
                },
                {
                    name: 'company',
                    displayName: $scope.prompts.gridColumnCompany
                },
                {
                    name: 'email',
                    displayName: $scope.prompts.gridColumnEmail
                },
                {
                    name: 'description',
                    displayName: $scope.prompts.gridColumnDescription
                },
                {
                    name: 'joined',
                    displayName: $scope.prompts.gridColumnJoined,
                    type: 'date',
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right'
                }                
            ]
        };

    }
]);