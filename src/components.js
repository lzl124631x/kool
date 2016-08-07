define([
  'knockout'
  ], function(ko) {
    [
    'home'
    ]
    .forEach(function (name) {
      ko.components.register(name, { require: 'src/page/' + name + '/' + name });
    });
  });