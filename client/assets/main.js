var app = angular.module('app', ['ngRoute'])
app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: '/partials/login.html'
	})
	.when('/dashboard', {
		templateUrl: '/partials/dash.html'
	})
	.when('/user/:id', {
		templateUrl: '/partials/user.html'
	})
	.when('/topic/:id', {
		templateUrl: '/partials/topic.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})