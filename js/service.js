//和数据打交道 ---服务model
angular.module("myAppService", [])

//精品产品
.service("hotService", function($http) {
	var numbers = 1;
	var list1 = [];
	var flag = true;
	return {
		requestHotData: function(callback) {
			console.log("hotService");
			if(flag) {
				var url='./json/hot.json';
				$http.get(url).success(function(data) {
					console.log(data);					
					callback(data);
					list1 =data.datas.shuffling[3].products;
					
					callback(list1);
					//numbers++;
				}).error(function(err) {
					console.log("请求失败"+err);//false
				})
				//console.log(numbers);
			}

		},requestHotContentData: function(product_id,callback) { /*去请求数据*/
			var url = './json/hot.json';
			$http.get(url).success(function(data) {
				var uData=data.datas.shuffling[3].products
				
				callback(uData);
			}).error(function(err) {
				console.log(page)
			})

		}

	}
})
//精选详情服务
.service("hotContentService", function($http) {
	return {
		requestHotContentData: function(product_id,callback) { /*去请求数据*/
			var url = './json/hotcontent.json';
			$http.get(url).success(function(data) {
				var uData=data.result;	
				callback(uData);					
			}).error(function(err) {
				console.log(err);
			})

		}
	}
})

//-------------购物车 服务--------------
.service("cartService", function($http,$Storage) {
		var page = 0;
		var list = [];
		//var hasdata = true;
		var flag = true;
		return {
			requestCartListData: function(callback) {
				console.log("cartService");
				//设置开关，解决 不断请求问题
				if(flag) {
//					var url = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=' + page + '&callback=JSON_CALLBACK'
//						//去服务器请求数据
//					$http.jsonp(url).success(function(data) {
//						console.log(data);
//						console.log(data.result.length)
//						if(data.result.length < 20) {
//							flag = false;
//							callback(0)
//						}
//
//						list = list.concat(data.result);
//						callback(list);
//						page++;
//
//						/*绑定数据以后执行广播*/
//						//$scope.$broadcast("scroll.infiniteScrollComplete");
//
//					}).error(function(err) {
//						console.log("error信息" + err)
//							//以上调用成功
//					});


				}
			},
			isCartData: function(key,id) {
				var CartData = $Storage.get(key);
				/*判断 localsorage有没有数据*/
				if(CartData){
					
					return true;
				}
				return false;	
			}
		}

	})
	//--------购物车详情 服务-----------------
.service("cartContentService", function($http) {
		return {
			requestNewContentData: function(aid, callback) { /*去请求数据*/

				var url = 'http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid=' + aid + '&callback=JSON_CALLBACK';

				$http.jsonp(url).success(function(data) {
					console.log(data);
					callback(data);
				}).error(function(err) {
					console.log(page)
				})

			}
		}
	})

//----------商品列表服务---------
.service("findService", function($http, $rootScope) {
	var list1 = [];
	var hasfinddata = true;
	return {//请求数据：	
		requestFindData: function(callback) {
			console.log("findService");
			var url = './json/findclass.json';
			$http.get(url).success(function(data) {
				if(data.datas.length <20) {
					hasfinddata = false;
				}
				list1=data.datas
				callback(list1);				
			}).error(function(err) {
				console.log(err);
			})
		},isFindData:function(){
			return hasfinddata;
		}
	}
})

//------------------商品详情--------------
.service("findContentService", function($http, $Storage) {
	return {//请求数据	
		requestFindContentData: function(product_id, callback) { /*去请求数据*/
			var url = './json/findclasscontent.json';
			$http.get(url).success(function(data) {
				var uData=data.result;	
				callback(uData);					
			}).error(function(err) {
				console.log(err);
			})
		},isCollectData: function(product_id, key) {
			var collectData = $Storage.get(key);		
			if(collectData) {/*判断 localsorage有没有数据*/
				for(var i = 0; i < collectData.length; i++) {
					if(collectData[i].product_id == product_id) {
						return true;
					}
				}
			}
			return false;

		}

	}
})

//-------------存储----------------
.service('$Storage', function() {
	return {
		set: function(key, value) { /*去请求数据*/
			localStorage.setItem(key, JSON.stringify(value));
		},
		get: function(key) { /*去请求数据*/
			return JSON.parse(localStorage.getItem(key));
		},
		remove: function(key) {
			localStorage.removeItem(key);
		}
	}
})

//-------------登录服务------------------
//.service("loginService", function($Storage) {
//		return {
//
//		}
//	})
//	//=----------------注册验证----------------
//	.service("registerService", function($Storage) {		
//		return {
//			getRegisterMsg:function(phone){
//				var userMsg=$Storage.get(key);
//				
//			},setRegisterMsg:function(){
//				return;
//			}
//	}
//		
//		
//	})
	
//.service("testService", function($Storage) {
//		return {
//			isRegisterMag: function(user, key) {
//			var registerMsg = $Storage.get(key);
//			/*判断 localsorage有没有注册数据*/
//			if(registerMsg) {
//				for(var i = 0; i < registerMsg.length; i++) {
//					if(registerMsg[i].user == user) {
//						return true;
//					}
//
//				}
//
//			}
//			return false;
//
//			}
//		}
//	})