define([
  'knockout'
  ], function(ko) {
    [
    'home',
    'first',
    'config'
    ]
    .forEach(function (name) {
      ko.components.register(name, { require: 'src/page/' + name + '/' + name });
    });
  });