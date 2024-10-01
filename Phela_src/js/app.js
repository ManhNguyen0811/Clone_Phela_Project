angular.module('myapp', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'view/home.html?' + Math.random(),
            controller: 'homeCtrl'
        })
        .when('/cart', {
            templateUrl: 'view/cart.html?',
            controller: 'cartCtrl'
        })
        .when('/detail/:id', {
            templateUrl: 'view/detail.html?',
            controller: 'detailCtrl'
        })
        .when('/lienHe', {
            templateUrl: 'view/lienHe.html?',
            controller: 'lienHeCtrl'
        })
        .when('/product', {
            templateUrl: 'view/product.html?',
            controller: 'productCtrl'
        })
        .when('/tinTuc', {
            templateUrl: 'view/tinTuc.html?',
            controller: 'tinTucCtrl'
        })
        .when('/tinTucChiTiet', {
            templateUrl: 'view/tinTucChiTiet.html?',
            controller: 'tinTucChiTietCtrl'
        })
        .when('/contact', {
            templateUrl: 'view/lienhe.html?',
            controller: 'lienhetrl'
        })
        .otherwise({
            template: '<h1>404 - Không timf thấy trang </h1>'
        })
})
    .run(function ($rootScope, $timeout) {
        $rootScope.$on('$routeChangeStart',
            function () {
                $rootScope.loading = true;
            })
        $rootScope.$on('$routeChangeSuccess',
            function () {
                $timeout(function () {
                    $rootScope.loading = false;
                }, 400)

            })
        $rootScope.$on('routeChangeError',
            function () {
                $rootScope.loading = false;
                alert("lỗi không tải đưuọc trang")
            })
    })


    .filter('search', function () {
        return function (input, keyword, attr) {
            
            if (!keyword) {
                return input;
            }

            var output = [];
            for (var i = 0; i < input.length; i++) {
                for (var j = 0; j < attr.length; j++) {
                    if (input[i][attr[j]].toString().toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
                        output.push(input[i]);

                        break;
                    }
                }
            }
            return output;
        }
    })
    .controller('myctrl', function ($scope, $http, $rootScope) {
        
        $rootScope.cart = JSON.parse(localStorage.getItem("my_cart")) || [];
        $scope.saveCart = function () {
            localStorage.setItem("my_cart", JSON.stringify($scope.cart))
        }
        console.log($rootScope.cart)
        $scope.AddToCart = function (sp) {
            var inCart = false;
            for (i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    $rootScope.cart[i].quantity++;
                    $scope.saveCart();
                    inCart = true;
                    break;
                    //da co sp trong gio hang => tang so luong
                }
            }

            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);
                $scope.saveCart();
                //chua co san pham gio hang => them sp vao gi hang

            }
            console.log($rootScope.cart);

        }

        $scope.removeCart = function(sp){
            for(var i = 0 ; i < $rootScope.cart.length; i++){
                if($rootScope.cart[i].id == sp.id){
                    $rootScope.cart.splice(i, 1);
                    $scope.saveCart();
                    break;
                }
            }
        }
        $scope.totalNoDis= function(){
            var toTalALLnoDiss = 0;
            for(i = 0 ; i<  $rootScope.cart.length;i++){
                toTalALLnoDiss += $rootScope.cart[i].price *$rootScope.cart[i].quantity
            }
           
            return toTalALLnoDiss;
        }
        $scope.total= function(){
            var toTalALL = 0;
            var thue = 12000;
            for(i = 0 ; i<  $rootScope.cart.length;i++){
                toTalALL += $rootScope.cart[i].price *$rootScope.cart[i].quantity
            }
             toTalALL += thue ;
            return toTalALL;
        }

        $scope.dssp = [];
        $http.get("data.json").then(
            function (res) {    
                $scope.dssp = res.data;
                

            },
            function (res) {
                alert('error')
            }
        )

        $scope.btnSearch= function(sp){
            $scope.keyWord = sp;

        }


    })
    .controller('detailCtrl', function ($scope, $routeParams) {
        $scope.id = $routeParams.id;

        for (var i = 0; i < $scope.dssp.length; i++) {
            if ($scope.dssp[i].id == $routeParams.id) {
                $scope.ds = $scope.dssp[i]
            }
        }
    })

    .controller('productCtrl', function ($scope) {

        $scope.limit = 5;
        $scope.page = 1;
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.totalPage = Math.ceil($scope.dssp.length / $scope.limit);
        $scope.pageLits = [];
        for (var i = 1; i <= $scope.totalPage; i++) {
            $scope.pageLits.push(i);

        }
        $scope.changePage = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        }

    })

    .controller('homeCtrl', function ($scope) {


    })
    .controller('cartCtrl', function ($scope) {


    })
    .controller('lienHeCtrl', function ($scope) {


    })
    .controller('tinTucCtrl', function ($scope) {


    })
    .controller('tinTucChiTietCtrl', function ($scope) {


    })
    .controller('lienhetrl', function ($scope) {


    })


