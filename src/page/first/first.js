define([
 'jquery',
 'knockout',
 'text!./first.html'
 ],
 function ($, ko, template) {
   return { viewModel: viewModel, template: template };

   function viewModel(params) {
   }
 });