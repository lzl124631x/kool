define([
  'jquery',
  'knockout',
  'kool/transition'
  ],
  function($, ko, transition) {
    window.app = {};
    var insertPageContainer = function (pageContainer, viewModel) {
      var $pageContainer = $('<' + pageContainer + ' class="page-container" params="query: query, page: page">');
      $('body').append($pageContainer);
      ko.applyBindings(viewModel, $pageContainer[0]);
    };

    var changePageContainer = function (pageContainer, trans, reverse, callbacks) {
      var $pageContainer = $(pageContainer);
      if ($pageContainer.is(self.$currPageContainer)) return;
      transition.transitBetween(
        self.$currPageContainer,
        $pageContainer,
        trans,
        reverse,
        callbacks);
      self.$currPageContainer = $pageContainer;
      $(document).trigger('pageChange');
    };

    app.updateQuery = function(query) {
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
          updateLandscapeCurtain();
          app.query(query);
          $(query.page).trigger('pageContainerIn');
        }
      });
    };
    // The current query object. Updated by router.js.
    app.query = ko.observable();
    app.defaultTransName = 'fadeLeft';
  });