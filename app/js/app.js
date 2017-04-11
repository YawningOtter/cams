var myApp = angular.module('myApp', ['ngRoute','ngResource']);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    controller:'ctrlMain',
    templateUrl: './views/main.html'
  })
  .when('/admin', {
    controller:'ctrlAdminJumboTron',
    templateUrl: './views/admin.html'
  })
  .when('/admin/jumbotrons', {
    controller:'ctrlAdminJumboTron',
    templateUrl: './views/jumbotrons.html'
  })
  .when('/admin/jumbotrons/add', {
    controller:'ctrlAdminJumboTron',
    templateUrl: './views/add-jumbotron.html'
  })
  .when('/admin/jumbotrons/details/:id', {
    controller:'ctrlAdminJumboTron',
    templateUrl: './views/edit-jumbotron.html'
  })  
  .when('/admin/carousels', {
    controller:'ctrlAdminCarousel',
    templateUrl: './views/carousels.html'
  })
  .when('/admin/carousels/add/', {
    controller:'ctrlAdminCarousel',
    templateUrl: './views/add-carousel.html'
  })
  .when('/admin/carousels/details/:id', {
    controller:'ctrlAdminCarousel',
    templateUrl: './views/edit-carousel.html'
  })
  .when('/admin/slides', {
    controller:'ctrlAdminSlide',
    templateUrl: './views/slides.html'
  })
  .when('/admin/slides/add/', {
    controller:'ctrlAdminSlide',
    templateUrl: './views/add-slide.html'
  })
  .when('/admin/slides/details/:id', {
    controller:'ctrlAdminSlide',
    templateUrl: './views/edit-slide.html'
  })
  .when('/admin/markets', {
    controller:'ctrlAdminMarket',
    templateUrl: './views/markets.html'
  })
  .when('/admin/markets/add/', {
    controller:'ctrlAdminMarket',
    templateUrl: './views/add-market.html'
  })
  .when('/admin/markets/details/:id', {
    controller:'ctrlAdminMarket',
    templateUrl: './views/edit-market.html'
  })
  .when('/admin/news', {
    controller:'ctrlAdminNews',
    templateUrl: './views/news.html'
  })
  .when('/admin/news/add/', {
    controller:'ctrlAdminNews',
    templateUrl: './views/add-news.html'
  })
  .when('/admin/news/details/:id', {
    controller:'ctrlAdminNews',
    templateUrl: './views/edit-news.html'
  })
/*  .when('/admin/carousels/saveRef/', {
    controller:'ctrlAdminCarousel',
    templateUrl: './views/add-slideRef.html'
  })*/
  .when('/admin/carousels/saveRef/:id', {
    controller:'ctrlAdminCarousel',
    templateUrl: './views/add-slideRef.html'
  })
  .otherwise({
    redirectTo: '/'
  });

  // $locationProvider.html5Mode({
  //  enabled: true,
  //  requireBase: false
  // });
  $locationProvider.hashPrefix('');
});
