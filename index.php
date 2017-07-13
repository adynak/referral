<!doctype html>
<html lang="en" ng-app="nwc" ng-cloak>
  <head>
    <meta charset="UTF-8">
    <title></title>
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <!-- <link href='https://fonts.googleapis.com/css?family=Lato:400,100,700,900' rel='stylesheet' type='text/css'> -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/> -->
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="stylesheet" href="node_modules/angularjs-toaster/toaster.css">

    <link rel="shortcut icon" href="#" mime="image/x-icon">


    <script src="node_modules/angular/angular.min.js"></script>
    
    <script src="node_modules/angular-route/angular-route.min.js"></script>


    <script src="node_modules/angular-animate/angular-animate.min.js"></script>


    <script src="node_modules/angularjs-toaster/toaster.js"></script>


    <script src="js/app.js"></script>

    <script src="js/controllers/registration.js"></script>
    <script src="js/controllers/profile.js"></script>
    <script src="js/controllers/success.js"></script>
    <script src="js/controllers/refer.js"></script>
    <script src="js/controllers/referrals.js"></script>
    <script src="js/controllers/referralDetails.js"></script>
    <script src="js/controllers/reports/active.js"></script>
    <script src="js/controllers/reports/passed.js"></script>
    <script src="js/controllers/reports/closed.js"></script>

    <script src="js/controllers/nav.js"></script>

    <script src="js/factory/authenticate.js"></script>

    <script src="js/customdirective/confirmpassword.js"></script>

  </head>
  <body>

    <div ng-controller="NavigationController">
        <nav class="cf" ng-include="'views/nav.html'"></nav>
        <div style="padding:0 0 0 30px;">
            <div class="row" ng-view>
            </div>
        </div>
    </div>
    <toaster-container toaster-options="{'time-out': 3000,'position-class': 'toast-top-right','close-button':true}"></toaster-container>
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="node_modules/angular-touch/angular-touch.js"></script> 
    <script src="node_modules/angular-ui-grid/ui-grid.min.js"></script> 
    
    <link rel="stylesheet" href="node_modules/angular-ui-grid/ui-grid.min.css"</link>

    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/angular-messages/angular-messages.min.js"></script>
    <script src="node_modules/moment/min/moment.min.js"></script>
    <script src="node_modules/bootstrap-daterangepicker/daterangepicker.js"></script>
    <script src="node_modules/angular-daterangepicker/js/angular-daterangepicker.min.js"></script>
    <link rel="stylesheet" href="node_modules/bootstrap-daterangepicker/daterangepicker.css" />

    <script src="node_modules/lodash/lodash.min.js"></script>

    <script src="i18n/en_US.js"></script>

  </body>
</html>
