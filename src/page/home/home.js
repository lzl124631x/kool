define([
 'jquery',
 'knockout',
 'text!./home.html'
 ],
 function ($, ko, template) {
   return { viewModel: viewModel, template: template };

   function viewModel(params) {
    console.log('x');
   }
 });