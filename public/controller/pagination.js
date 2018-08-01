// directive for pagination
angular.module('todoApp')
    .directive("pagination", function () {
        return {
            restrict: "EA",
            templateUrl: "./partials/pagination.html",
            scope: {
                getarray: '='
            },
            controller: function ($scope) {
                var pvm = this;
                $scope.selectedPage = 1;
                $scope.paginationLength = 1;

                // navigate to each page
                $scope.movePage = function (values) {
                    if (values == 'first') {
                        $scope.$parent.led.beginPagination = 0;
                    }
                    else if (values == 'last') {
                        $scope.$parent.led.beginPagination = (($scope.paginationLength - 1) * 5);
                    }
                    else if (values == 'fwd') {
                        $scope.$parent.led.beginPagination += 5;
                    }
                    else if (values == 'bck') {
                        $scope.$parent.led.beginPagination -= 5;
                    }
                    else if (typeof values == "number") {
                        $scope.$parent.led.beginPagination = (values - 1) * 5;
                    }

                    $scope.selectedPage = Math.ceil($scope.$parent.led.beginPagination / 5);
                };

                // update pagination symbols according to the list items length 
                $scope.$watch('getarray.length', function (navi, purana) {
                    $scope.paginationLength = Math.ceil(navi / 5);
                    $scope.lastPage = $scope.paginationLength;
                    $scope.$parent.led.beginPagination = Math.floor(Math.abs($scope.$parent.led.finalIndex) / 5) * 5;
                    $scope.selectedPage = Math.ceil($scope.$parent.led.beginPagination / 5);
                    console.log(`last page: ${$scope.lastPage}  pagnationlength : ${$scope.paginationLength}     beginpagination: ${$scope.$parent.led.beginPagination} selected page: ${$scope.selectedPage} navi : ${navi}`);
                });
            }
        }
    });