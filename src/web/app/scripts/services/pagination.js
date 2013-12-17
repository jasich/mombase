angular.module('webApp')
    .filter('paginate', function() {
        return function(input, pagination) {
            pagination.items = input;
            var startAt = parseInt(pagination.page * pagination.perPage),
                take =  parseInt((pagination.page + 1) * pagination.perPage + 1);

            return input.slice(startAt, take);
        }
    })
    .factory('Pagination', ["$rootScope", function ($rootScope) {

        function Pagination(items, perPage)
        {
            this.items = items;
            this.page = 0;
            this.perPage = perPage || 10;

        }

        Pagination.prototype.isVisible = function(index)
        {
            var startAt = parseInt(this.page * this.perPage),
                endAt = startAt + this.perPage;
            return index >= startAt && index < endAt;
        }

        Pagination.prototype.setPage = function (page) {
            if (page > this.pageCount()) {
                return;
            }

            this.page = page;
        };

        Pagination.prototype.nextPage = function () {
            if (this.isLastPage()) {
                return;
            }

            this.page++;
        };

        Pagination.prototype.prevPage = function () {
            if (this.isFirstPage()) {
                return;
            }

            this.page--;
        };

        Pagination.prototype.firstPage = function () {
            this.page = 0;
        };

        Pagination.prototype.lastPage = function () {
            this.page = this.pageCount() - 1;
        };

        Pagination.prototype.isFirstPage = function () {
            return this.page == 0;
        };

        Pagination.prototype.isLastPage = function () {
            return this.page >= this.pageCount() - 1;
        };

        Pagination.prototype.count = function()
        {
            return this.items.length;
        }

        Pagination.prototype.pageCount = function () {
            return Math.ceil(this.count() / Math.max(this.perPage, 1));
        };

        return Pagination;
    }]);