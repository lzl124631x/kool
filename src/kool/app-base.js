define([
  'jquery',
  'knockout',
  'lodash',
  'kool/transition',
  'kool/utils'
  ],
  function ($, ko, _, transition) {
    window.app = {};
    var insertPageContainer = function (pageContainer, viewModel) {
      var $pageContainer = $('<' + pageContainer + ' class="page-container" params="query: query, page: page">');
      $('body').append($pageContainer);
      ko.applyBindings(viewModel, $pageContainer[0]);
    };

    var changePageContainer = function (pageContainer, trans, reverse, callbacks) {
      var $pageContainer = $(pageContainer);
      if ($pageContainer.is(app.$currPageContainer)) return;
      transition.transitBetween(
        app.$currPageContainer,
        $pageContainer,
        trans,
        reverse,
        callbacks);
      app.$currPageContainer = $pageContainer;
      $(document).trigger('pageChange');
    };

    app.updateQuery = function (query) {
      app[query.page].query(query);
      if ($(query.page).length === 0) {
              // For a page X: app[X].query, which can be accessed in X's view model as params.query, is an observable which only holds queries within X.
              // Contrarily, app.query is an observable of global query, not specific for any page.
              insertPageContainer(query.page, app[query.page]);
            }
            var lastPage = app.query() ? app.query().page : undefined;
            changePageContainer(query.page, app.defaultTransName, app.isGoingBack, {
              outCallback: function () {
                $(lastPage).trigger('pageContainerOut');
              },
              inCallback: function () {
                app.query(query);
                $(query.page).trigger('pageContainerIn');
              }
            });
          };

      // Returns how many steps is needed to go to the hash.
      // undefined means the hash is not found in history.
      // A negative number N means history.go(N) can bring you back to the hash.
      var goStep = function (hashRegex) {
        var pattern = new RegExp(hashRegex);
        var last = _.findLastIndex(app.hashes, function (item) {
          return pattern.test(item);
        });
        if (last === -1) {
          return undefined;
        } else {
          return last + 1 - app.hashes.length;
        }
      };

      app.onHashChange = function (hash) {
        var hashes = app.hashes;
        var step = goStep('^' + hash + '$');
          if (step === void 0) {// Hash not found, go further.
            app.isGoingBack = false;
            hashes.push(hash);
          } else if (step === 0) {// Same hash as current.
              // noop
          } else { // Negative step means it's a old hash, go back.
          app.isGoingBack = true;
          hashes.splice(hashes.length + step);
        }
        utils.storage.set('hashes', hashes);
      };

      app.updateQuery = function (query) {
        if (app[query.page].reload) {
          $(query.page).remove();
        }
        app[query.page].query(query);
        if ($(query.page).length === 0) {
                    // For a page X: app[X].query, which can be accessed in X's view model as params.query, is an observable which only holds queries within X.
                    // Contrarily, app.query is an observable of global query, not specific for any page.
                    insertPageContainer(query.page, app[query.page]);
                  }
                  var lastPage = app.query() ? app.query().page : undefined;
                  changePageContainer(query.page, app.defaultTransName, app.isGoingBack, {
                    outCallback: function () {
                      $(lastPage).trigger('pageContainerOut');
                    },
                    inCallback: function () {
                      app.query(query);
                      $(query.page).trigger('pageContainerIn');
                    }
                  });
                };

      // The current query object. Updated by router.js.
      app.query = ko.observable();
      app.defaultTransName = 'fadeLeft';
      app.hashes = utils.storage.getJSON('hashes') || [];
      return app;
    });