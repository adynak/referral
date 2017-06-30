myApp.controller('ReferralsController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster) {

        var memberInfo = {};
        memberInfo.id = Data.getCurrentMember().id;

        $scope.prompts = txtReferrals;

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

        Data.getNotifications(memberInfo).then(function(results) {
            $scope.notificationCount = results.length;
            $scope.data = results;
        });

        $scope.gridOptions = {
            enableFiltering: true,
            rowTemplate: rowTemplate(),
            data: 'data',
            columnDefs: [{
                    name: 'referralfrom',
                    displayName: $scope.prompts.gridColumnReferralFrom
                },
                {
                    name: 'description',
                    displayName: $scope.prompts.gridColumnDescription
                },
                {
                    name: 'DateSent',
                    displayName: $scope.prompts.gridColumnDateSent
                }
            ]
        };

    }
]);