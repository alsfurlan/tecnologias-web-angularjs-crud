angular
        .module('produtosApp', [])
        .controller('ProdutosController', function ($scope, ProdutosService) {
            $scope.produtos = ProdutosService.listar();
    
            function limpar() {
                $scope.produto = {};
            }
            
            $scope.editar = function (produto) {
                $scope.produto = angular.copy(produto);
            };
            
            $scope.cancelar = function() {
                limpar();
            };
            
            $scope.excluir = function(produto) {
                ProdutosService.excluir(produto);                
            };
            
            $scope.salvar = function () {
                ProdutosService.salvar($scope.produto);
                limpar();
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
            
            this.excluir = function(produto) {
                var id = produto.id;
                for(var i=0; i < produtos.length; i++) {
                    if(produtos[i].id == id) {
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




