define([
    'knockout',
    'crossroads',
    'hasher',
    'src/routes',
    'kool/app-base'
    ],
    function (ko, crossroads, hasher, routes) {
        (function bindRoutes(routes) {
            routes.forEach(function (route) {
                app[route.page] = { page: route.page, query: ko.observable() };
                crossroads.addRoute(route.url, function (query) {
                    query.page = route.page;
                    app.updateQuery(query);
                });
            });
        }(routes));

        (function activateCrossroads() {
            function parseHash(newHash, oldHash) {
                // app.changeHash(newHash);
                crossroads.parse(newHash);
            }

            crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
            hasher.initialized.add(parseHash);
            hasher.changed.add(parseHash);
            hasher.init();
        }());
    });