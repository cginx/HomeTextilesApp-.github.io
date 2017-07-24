
var app = angular.module("myApp", ["ionic", "myAppService", "myAppController"]);
app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');
	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');
	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');
	$stateProvider
		.state("tab", {
			url: "/tab",
			abstract: true,
			templateUrl: "templates/tabs.html"
		})
		.state('intro', {
			url: '/',
			cache:false,
			templateUrl: 'templates/intro.html',
			controller: 'IntroCtrl'
		})
		.state("tab.home", {
			url: "/home",
			parent: "tab",
			views: {
				"tab-home": {
					templateUrl: "templates/home/index.html",
					controller: "homeCtrl"
				}
			}
		})
		.state('hotcontent', {
			url: '/hotcontent/:product_id',
			templateUrl: 'templates/home/hotcontent.html',
			controller: 'hotCtrl'

		})

		.state('tab.cart', {
				url: '/cart',
				views: {
					'tab-cart': {
						templateUrl: 'templates/cart/index.html',
						controller: 'cartCtrl'
					}
				}
	
			})
		.state('tab.cartcontent', {
			url: '/findcontent/:aid',
			views: {
				'tab-cart': {
					templateUrl: 'templates/find/findcontent.html',
					controller: 'findcontentCtrl'
				}
			}

		})
		.state('tab.find', {
			url: '/find',
			views: {
				'tab-find': {
					templateUrl: 'templates/find/index.html',
					controller: 'findCtrl'
				}
			}

		})
		.state('findcontent', {
			url: '/findcontent/:product_id',
			templateUrl: 'templates/find/findcontent.html',
			controller: 'fontContentCtrl'

		})
		.state('tab.user', {
			url: '/user',
			views: {
				'tab-user': {
					templateUrl: 'templates/user/index.html',
					controller: 'userCtrl'
				}
			}

		})
		.state('cart', {
			url: '/cart',
			views: {
				'tab-cart': {
					templateUrl: 'templates/cart/index.html',
					controller: 'newsCtrl'
				}
			}
			
		})
		.state('collect', {
			url: '/collect',
			templateUrl: 'templates/collect.html',
			controller: 'userCtrl'

		})
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			 controller:'loginCtrl'

		})
		.state('register', {
			url: '/register',
			templateUrl: 'templates/register.html',
			controller: "registerCtrl"
			
		})
		
		.state('test', {
			url: '/test/:id',
			templateUrl: 'templates/test.html',
			controller: "registerCtrl"
		})
		.state('ma',{
			url: '/ma',
			templateUrl: 'templates/ma.html',
			controller: "loginCtrl"
		})
		.state('advice', {
			url: '/advice',
			templateUrl: 'templates/advice.html'
		}).state('onlinechat', {
			url: '/onlinechat',
			templateUrl: 'templates/onlinechat.html'
		}).state('help', {
			url: '/help',
			templateUrl: 'templates/help.html'
		})

	$urlRouterProvider.otherwise('/');
//.state('test', {
//			url: '/test/:id',
//			templateUrl: 'templates/test.html',
//			controller: "registerCtrl"
//		})
})