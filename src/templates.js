angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("features/_feature/_feature.html","\n");
$templateCache.put("features/home/_home.html","<section class=\"module module--home\">\n  <div class=\"module__half\">\n    <p>\n      <img src=\"img/etho_black.svg\" /> analyses your activity, behaviour and tastes to generate your personal insight profile.\n    </p>\n  </div>\n  <div class=\"module__half module__half--dark\">\n    <a class=\"button button--white button--instagram\" href=\"https://api.instagram.com/oauth/authorize/?client_id=437d58ca6b5c41c48a3867101f09f76c&amp;redirect_uri=http://localhost:3000/process&amp;response_type=code\">Instagram Login</a>\n  </div>\n</section>\n");
$templateCache.put("features/process/_process.html","<div ng-if=\"token\">\n  <a ng-click=\"getStream()\">Get Stream</a><a ng-click=\"getMe()\">Get Me</a><a ng-click=\"logout()\">Logout</a>\n</div>\n");}]);