angular
        .module('produtosApp', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/lista', {
                        templateUrl: 'templates/lista.html',
                        controller: 'ListaProdutosController'
                    })
                    .when('/cadastro', {
                        templateUrl: 'templates/cadastro.html',
                        controller: 'CadastroProdutosController'
                    })
                    .when('/cadastro/:id', {
                        templateUrl: 'templates/cadastro.html',
                        controller: 'CadastroProdutosController'
                    })
                    .otherwise({
                        redirectTo: '/lista'
                    });
        })
        .controller('ListaProdutosController', function ($scope, ProdutosService) {
            $scope.produtos = ProdutosService.listar();

            $scope.excluir = function (produto) {
                ProdutosService.excluir(produto);
            };
        })
        .controller('CadastroProdutosController', function ($scope, ProdutosService, $location, $routeParams) {

            if ($routeParams.id) {
                $scope.produto = ProdutosService.getProduto($routeParams.id);
            } else {
                $scope.produto = {};
            }



            $scope.salvar = function () {
                ProdutosService.salvar($scope.produto);
                $location.path("/lista");
            };

            $scope.cancelar = function () {
                $location.path("/lista");
            };
        })
        .service('ProdutosService', function () {
            var produtos = [
                {id: 1, nome: 'Arroz', preco: 3.50},
                {id: 2, nome: 'Feijão', preco: 2.50}
            ];

            this.listar = function () {
                return produtos;
            };

            this.getProduto = function (id) {
                for (var i = 0; i < produtos.length; i++) {
                    if (produtos[i].id == id) {
                        return produtos[i];
                    }
                }
            };

            this.excluir = function (produto) {
                var id = produto.id;
                for (var i = 0; i < produtos.length; i++) {
                    if (produtos[i].id == id) {
                        produtos.splice(i, 1);
                    }
                }
            };

            this.salvar = function (produto) {
                var produtoEncontrado = false;
                angular.forEach(produtos, function (produtoCorrente) {
                    if (produto.id == produtoCorrente.id) {
                        produtoCorrente.nome = produto.nome;
                        produtoCorrente.preco = produto.preco;
                        produtoEncontrado = true;
                    }
                });
                if (produtoEncontrado === false) {
                    produtos.push(produto);
                }
            };

        });




