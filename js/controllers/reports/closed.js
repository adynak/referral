nwc.controller('ReportClosedController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster) {

        $scope.prompts = txtReports;

        var memberInfo = {};
        memberInfo.id = Data.getCurrentMember().id;

        var uiGridConstants = {ASC:"asc"}

        function rowTemplate() {
            return '<div ng-click="grid.appScope.rowClick(row)" >' +
                '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                '</div>';
        }

        $scope.rowClick = function(row) {
            alert(JSON.stringify(row.entity));
        };


        Data.getClosedBusiness().then(function(results) {
            $scope.resultsCount = results.length;
            $scope.data = results;
            console.log('getClosedBusiness');
        });

        $scope.gridOptions = {
            enableFiltering: true,
            showColumnFooter: true,
            rowTemplate: rowTemplate(),
            data: 'data',
            columnDefs: [{
                    name: 'referred',
                    type: 'date',
                    displayName: $scope.prompts.gridColumnOpened,
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
                    name: 'closed',
                    displayName: $scope.prompts.gridColumnClosed,
                    type: 'date',                    
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right'
                },
                {
                    name: 'value',
                    displayName: $scope.prompts.gridColumnValue,
                    aggregationType: 2,
                    cellFilter: 'currencyFilter:this',
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right',
                    footerCellTemplate: '<div class="ui-grid-cell-contents grid-align-right" >Total: ${{col.getAggregationValue() | number:2 }}</div>'
                }                
            ]
        };

    }])
        .filter('currencyFilter', function () {
          var currencyMap = {
            'dollar': '$',
            'pound': '£',
            'euro': '€'
          };
          
          return function (value, scope) {
            return currencyMap['dollar'] + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
          };
        })
;