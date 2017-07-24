
angular.module("myAppController", ["ionic"])
	//--------引导页控制器--------
	.controller('IntroCtrl', function($scope,$rootScope, $state, $ionicSlideBoxDelegate) {
		if($rootScope.headerShow){			
			$state.go('tab.home');
		}
		$scope.startApp = function() {
			$state.go('tab.home');
		};
		$scope.next = function() {
			$ionicSlideBoxDelegate.next();
		};
		$scope.previous = function() {
			$ionicSlideBoxDelegate.previous();
		};
		$scope.slideChanged = function(index) {
			$scope.slideIndex = index;
		};
	})


	//----------首页控制器----------
	.controller("homeCtrl", function($scope,$rootScope, $state, $interval, $ionicSlideBoxDelegate,$ionicSideMenuDelegate, hotService) {
		$rootScope.headerShow=true;
		$scope.toIntro = function(){
			$state.go('intro');
		}
		//		$scope.name = "某某某";
		//首页中点击登录按钮，跳转登录页面
		$scope.goLogin = function() {
			//2种 方法：
			//继承时：$state.go("tab.login");
			//无继承 就可以返回
			$state.go("login");
		}
		$scope.goPage = function(index) {

			console.log(index);

			//          $ionicSlideBoxDelegate.slide(index);
			$ionicSlideBoxDelegate.next();
			$ionicSlideBoxDelegate.update();

		}
		$scope.menuLeft= function (){
			console.log("111111");
			$ionicSideMenuDelegate.toggleLeft();
		}

		//==================轮播==================
		$scope.imglist = [{
			"src": "img/l2.jpg"
		}, {
			"src": "img/l3.jpg"
		}, {
			"src": "img/l4.jpg"
		}, {
			"src": "img/l5.jpg"
		}, {
			"src": "img/1.jpg"
		}];
		$scope.$on('$ionicView.beforeEnter', function() {

			//=========精选商品=====================
			$scope.hashotdata = true;
			hotService.requestHotData(function(data) {
				$scope.list1 = data;
				if(data == 0) {
					$scope.hashotdata = false;
				}
				/*绑定数据以后执行广播*/
				$scope.$broadcast("scroll.infiniteScrollComplete");
			})
			$scope.loadMorehot = function() {
				console.log("1111111111");
				hotService.requestHotData(function(data) {
					$scope.list1 = data;
					if(data == 0) {
						$scope.hashotdata = false;
					}
					/*绑定数据以后执行广播*/
					$scope.$broadcast("scroll.infiniteScrollComplete");
				})
			}
		});
		
	})

//精选商品详情
.controller("hotCtrl", function($scope,$state,$stateParams, hotContentService) {
	var product_id = $stateParams.product_id;
	$scope.isShowLoading = true;		
	hotContentService.requestHotContentData(product_id,function(data) {	
		console.log(data);		
		switch(product_id){
			case "198":			
				$scope.item=data[0];
				console.log($scope.item);
			break;
			case "197":
				$scope.item=data[1];
			break;
			case "196":
				$scope.item=data[2];
			break;
			case "195":
				$scope.item=data[3];
			break;
			case "194":
				$scope.item=data[4];
			break;
			case "193":
				$scope.item=data[5];
			break;					
		}					 
		$scope.isShowLoading = false;

	})
	
	
})




//==============购物车列表====================
//注入购物车服务
//.controller("cartCtrl", function($scope, $state, $rootScope, cartService,$Storage) {
//	$scope.$on('$destroy', function() {
//		$rootScope.hideTab = ' ';
//	})
//	$scope.hasdata = true;
//	$scope.loadMore = function() {
//		console.log("sssss");
//		cartService.requestNewsListData(function(data) {
//			$scope.list = data;
//			if(data == 0) {
//				$scope.hasdata = false;
//			}
//			/*绑定数据以后执行广播*/
//			$scope.$broadcast("scroll.infiniteScrollComplete");
//		})
//
//	}
//})



//===============Find商品列表======================
.controller("findCtrl", function($scope, $ionicScrollDelegate, $state, $rootScope, $ionicSlideBoxDelegate, findService) {
	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.hasfinddata = true;
		//等待请求完成数据：
		//请求完成后接收完成数据
		$scope.$on('findtabServiceData', function(event, data) {
				//获取数据 解决：广播
				//存在异步请求 request  先打印请求前，再获取数据后，再请求数据完成
				$scope.list1 = findService.getFindNextData();
				if($scope.list1 == 0) {
					$scope.hasfinddata = false;
				}
				/*绑定数据以后执行上拉更新广播*/
				$scope.$broadcast("scroll.infiniteScrollComplete");
			})
			// 页面内容加载完 滚动条回到顶部
		$ionicScrollDelegate.$getByHandle("mainScroll").scrollTop();
		$scope.loadMorefind = function() {
			console.log("1111111111");
			//请求数据
			findService.requestFindData(function(data){
				$scope.list1 = data;
			});
			$scope.hasfinddata = findService.isFindData();
		}

		$scope.navbar = [{
			"catid": "20",
			"title": "四件套"
		}, {
			"catid": "15",

			"title": "锦绣"
		}, {
			"catid": "11",
			"title": "床被"
		}, {
			"catid": "12",
			"title": "长绒棉"
		}, {
			"catid": "11",
			"title": "枕头"
		}];

		//tab切换 获取分页数据
		$scope.tab_navbar = function(index, catid) {
			console.log(index + "====" + catid)
				//改变选中样式
			var oUl = document.getElementById("navbarlist");
			var aLi = oUl.getElementsByTagName("li");
			for(var i = 0; i < aLi.length; i++) {
				aLi[i].className = "";
			}
			aLi[index].className = "active";
			//------------------
			findService.setFindNextData(catid);
			findService.requestFindData();
		}			
	});
})


.controller("fontContentCtrl", function($scope,$state,$stateParams, $ionicModal,findContentService, cartService,$ionicPopup, $Storage, $timeout) {
	console.log($stateParams);
	var product_id = $stateParams.product_id;	
	$scope.isShowLoading = true;
	findContentService.requestFindContentData(product_id, function(data) {
		console.log(data);
		for(var i=0;i<data.length;i++){
			if(product_id==data[i].id){
				$scope.item=data[i];
			}
		}		
		$scope.isShowLoading = false;
	});
	//================================================
	//$scope.isCollect=true;
	//判断有没有收藏  改变收藏样式
	//在服务 中 判断locaStorage中是否有数据，有 就遍历
	var collectStorageData = $Storage.get("atical");
	if(collectStorageData) { //判断收藏中有没哟数据
		//有收藏 调用服务的方法 传入参数
		console.log(111);
			//		传入的aid是	ul中var aid = $stateParams.aid;
		if(findContentService.isCollectData(product_id , "atical")) {
			$scope.isCollect = true; //收藏
		} else {
			$scope.isCollect = false;
		}
	} else {
		$scope.isCollect = false; //无收藏数据 则 收藏按钮显示为收藏样式
	}	
	$scope.collect= function() {//点击收藏方法：
		if(findContentService.isCollectData($scope.item.id, "atical")) {
			var collectData = $Storage.get("atical");
			 for(var i = 0; i < collectData.length; i++) {
				if(collectData[i].product_id == $scope.item.id) {
					collectData.splice(i, 1);
					$ionicPopup.alert({
						title: "<b>提示您:</b>",
						template: '已取消收藏',
						scope: $scope,
						okText: '确定',
						okType: 'button-calm'
					}).then(function(res) {
						console.log('取消收藏');
					})
//					$timeout(function() {
//						myPopup_c1.close(); //由于某种原因3秒后关闭弹出
//					}, 3000);
					break;
				}
			}
			$Storage.set("atical", collectData);
			$scope.isCollect = false; //无收藏数据 则 收藏按钮显示为未收藏样式

		} else { //没有收藏  则执行收藏  弹窗显示
			var msg = {
				product_id: $scope.item.id,
				title: $scope.item.name,
				img: $scope.item.cover_img
			};		
			var collectStorageData = $Storage.get("atical");
			if(collectStorageData) {//判断localstorage是否有数据：			
				collectStorageData.push(msg);//有数据  做拼接  push  或者 cancat
				$Storage.set("atical", collectStorageData);
			} else {//没有数据  就存在一个数组中		
				$Storage.set("atical", [msg]);
			}
			$ionicPopup.alert({
				title: "<b>提示您:</b>",
				template: '收藏成功',
				scope: $scope,
				okText: '确定',
				okType: 'button-calm'

			}).then(function(res) {
				console.log('已收藏');
			})
//			$timeout(function() {
//				myPopup.close(); //由于某种原因3秒后关闭弹出
//			}, 3000);
			$scope.isCollect = true; //收藏数据 则 收藏按钮显示为收藏样式			

		}

	};
	$scope.addCart= function () {			//点击加入购物车方法：		
		var pop=$ionicPopup.show({
			title: "<b>提示您:</b>",
			template: '<div class="model_box" ng-controller="fontContentCtrl"><ul class="list"><li class="item"><p><img src="{{item.cover_img}}" /><span class="model_name dark">{{item.name}}</span><br/><span class="model_price assertive">￥{{item.price_range}}</span></p></li><li class="item"><div class="model_size"><p>规格：</p><div class="m_size">1.8米床</div></li><li class="item"><div class="model_num"><span class="reduceNum" ng-click="modelreduce();">-</span><span class="input_num"><input type="text" id="input_num" value="{{model_num}}" ng-model="model_num"/></span><span class="addNum" ng-click="modeladd();">+</span></div></li></ul></div>',
			scope: $scope,
			buttons: [{text:'取消',type:'button-dark'},
				{text:'确定',
				onTap:function(e) {					
					$scope.model_num=$("#input_num").val();											
						goodsMsg={
							"id":$scope.item.id,
							"copyImgSrc":$scope.item.cover_img,
							"name":$scope.item.name,
							"price":$scope.item.price_range,
							"num":$scope.model_num
						}	
						//判断localstorage是否有数据：
						var cartStorageData = $Storage.get("cartArrMsg");
						console.log("cartStorageData"+cartStorageData);
						//有相同 数量相加
						if(cartStorageData) {							
							//有数据  做拼接  push  或者 cancat
							cartStorageData.push(goodsMsg);		
							$Storage.set("cartArrMsg", cartStorageData);	
						} else {
							//没有数据  就存在一个数组中
							$Storage.set("cartArrMsg", [goodsMsg]);		
						}					
					$timeout(function() {
					pop.close(); //由于某种原因1.5秒后关闭弹出
					}, 1000);
					e.preventDefault();
				},type: 'button-calm'
				

			}]			

		});
		pop.then(function(res) {
			close();			
			console.log('购物车');
		})
		
	}
	
	$scope.model_num=1;//---------改变商品数量事件-------------	
	$scope.modelreduce= function (){
		$scope.model_num--;
		if($scope.model_num<1||$scope.model_num==""){
			$scope.model_num=0;
			alert("数量不能低于1");
			return false;
		}
	}
	$scope.modeladd= function (){
		$scope.model_num++;
		if($scope.model_num>5||$scope.model_num==""){
			$scope.model_num=5;
			alert("限购5件");
			return false;
		}
	}
	

	//-我的收藏------
	/*
		id:123
		title:""
		img:""
		1、获取信息
		2、存入location
			判断location是否有数据，没有 添加setItem(key,JSON.stringfy对象转字符串)
			如果有数据，获取location数据，转换成对象，收藏的数据 再次存储
			getItem(key)
	*/

})

	//==============我的购物车==================
.controller("cartCtrl",function($scope,$stateParams,$ionicPopup,$timeout,$state,$Storage,cartService){
	var _cartData = $Storage.get("cartArrMsg");
	id="";
	$scope.isShow =true;//无数据
	if(_cartData) { //判断购物车中有没哟数据
		
		angular.forEach(_cartData, function(value, key){
			id=_cartData[key].id;
			console.log(id);
		})
		//有调用服务的方法 传入参数
		if(cartService.isCartData("cartArrMsg",null)) {
			console.log(111);
			$scope.isShow = false;//购物车有商品
						
			var list = JSON.parse(localStorage.getItem("cartArrMsg"));
			$scope.cartList = list;
//			for(var i=0;i<$scope.cartList.length;i++){
//				$scope.cart_num=$scope.cartList[i].num;
//			}
			
			
		} else {
			$scope.isShow = true;//没有商品
		}

	} else {
		$scope.isShow = true; //无收藏数据 则 收藏按钮显示为收藏样式
	}
	$scope.turnatical = function(id) {
		console.log(22222)
		$state.go("findcontent", {
			"product_id":id
		});
	}
	$scope.cartDelete = function() {
		$scope.iscartDelete = !$scope.iscartDelete;
	}
	$scope.delcart = function(index) {
		$scope.cartList.splice(index, 1);
		//存储时，再次转换成字符串
		localStorage.setItem("cartArrMsg", JSON.stringify($scope.cartList));
	}
	//-----------全选-----------
	$scope.master=true;
	$scope.isallcheck=function(event){
        console.log(event.target);
        var act=event.target
            if(act.checked){//选中
            	$scope.master=true
            	$scope.allPrices();
            }else{
            	$scope.master=false;
            }	
	}	
	//-----------单选-----------	
	//$scope.cal=true;//默认选中	 
	$scope.ischeck=function(id,event){
		console.log(event)//打印看看这是什么，有利于理解
        console.log(event.target);
        var action = event.target;
            if(action.checked){//选中，就添加
            	$scope.allPrices();
            }		
	}
	//---------改变商品数量事件-------------
	$scope.cartreduce= function (event){
		console.log(event.target);
		var reduce=event.target;
		var cartnum=reduce.nextElementSibling.firstElementChild.id
		cartnum--;		
		if(cartnum<1){
			if(confirm('是否删除该产品')){ 
				reduce.parentElement.parentElement.parentElement.remove();		
				//存储时，再次转换成字符串
				localStorage.setItem("cartArrMsg", JSON.stringify($scope.cartList));
			}			
			return false;
		}
		angular.forEach($scope.cartList,function(data,index){  	
			if(reduce.id==data.id){
				data.num=cartnum;
				localStorage.setItem("cartArrMsg", JSON.stringify($scope.cartList));
			}
				
		})
	}
	//-------------增加商品数量-------------
	$scope.cartadd= function (event){
		var reduce=event.target;
		var cartnum=reduce.previousElementSibling.firstElementChild.id
		cartnum++;		
		if(cartnum>5){			
			cartnum=5;
			alert("限购5件");
			return false;
		}
		angular.forEach($scope.cartList,function(data,index){  	
			if(reduce.id==data.id){
				data.num=cartnum;
				localStorage.setItem("cartArrMsg",JSON.stringify($scope.cartList));
			}
				
		})
	}
	
	//------------总价格的计算 ---------------- 
	$scope.allPrices=function(){  
		var allprice=0;  
		angular.forEach($scope.cartList,function(data,index){  	
			if($(".hascartData .item_checked").eq(index).prop("checked")){
				allprice+=parseInt(data.num*data.price);
			}				
		})
		return allprice;
	}  
    //------------去结算价格---------------
    $scope.gopay=function(){
    	$ionicPopup.show({
				title: "<b>提示您:</b>",
				template: '<p style="text-algin:center;">您需要支付 <span class="assertive">'+$scope.allPrices()+"</span> 元</p>",
				scope: $scope,
				buttons:[{
					text: "取消"
				}, {
					text: "<b>确定</b>",
				type: "button-calm",
				onTap: function() {
					alert("支付功能正在开发中，请尽请期待！")
					$timeout(function() {
						close(); //由于某种原因1.5秒后关闭弹出
					}, 500);
				
				}
    		}]
		})
	}
	
})

//===============用户中心====================
.controller("userCtrl", function($scope, $state,$Storage) {	
	//字符串 转 数组
	var list = JSON.parse(localStorage.getItem("atical"));
	console.log(list);
	$scope.collectList = list;
	$scope.showDelete = function() {
		$scope.isShowDelete = !$scope.isShowDelete;

	}
	$scope.del = function(index) {
		$scope.collectList.splice(index, 1);
		//存储时，再次转换成字符串
		localStorage.setItem("atical", JSON.stringify($scope.collectList));
	}
	$scope.turnatical = function(product_id) {
		console.log(22222)
		$state.go("findcontent", {
			"product_id": product_id
		});
	}
	$scope.move = function(item, fromIndex, toIndex) {
		console.log(item);
		console.log(fromIndex);
		console.log(toIndex);
		$scope.collectList.splice(fromIndex, 1);
		toIndex = toIndex - 1 < 0 ? 0 : toIndex - 1;
		$scope.collectList.splice(toIndex, 0, item);
	}
	
	//用户登录后会有个状态 status=1
	var usernumber = $Storage.get("register");
	$scope.usernumber=usernumber;
	for(var i=0;i<$scope.usernumber.length;i++){		
		if($scope.usernumber[i].status==1){
			$scope.person_name=$scope.usernumber[i].name;
		}
			
	}
	//------------退出登录------------------
	//该用户的登录状态为atatus=0
	$scope.layout=function(){
		var usernumber = $Storage.get("register");
		$scope.usernumber=usernumber;
		for(var i=0;i<$scope.usernumber.length;i++){		
			if($scope.usernumber[i].status==1){
				$scope.usernumber[i].status=0;
				$Storage.set("register", JSON.stringify($scope.usernumber));
			}				
		}
		$state.go("login");
	}
})



//=============注册 验证====================
.controller("registerCtrl", function($scope, $timeout, $ionicModal, $state, $interval, $stateParams, $ionicPopup, $Storage) {
	$scope.registertest = function(phone, pwd, spwd) {		//验证通过时，存储数据
		if(phone && pwd && spwd&&pwd==spwd) {
			var user = {
				"phone": phone,
				"pwd": pwd,
				"status":0
			}
			//判断localstorage是否有数据：
			var registerStorageData = $Storage.get("register");
			if(registerStorageData) {
				//遍历 数据是否有相同的用户   ，有相同时  弹窗提示 并且 不保存
				for(var i = 0; i < registerStorageData.length; i++) {
					if(phone == registerStorageData[i].phone) {
						var myPopup1 = $ionicPopup.alert({
							title: "<b>提示您:</b>",
							template: '该用户已注册过',
							scope: $scope,
							okText: '确定',
							okType: 'button-calm'
						});
						myPopup1.then(function(res) {
							console.log('注册有误');
						});
//						$timeout(function() {
//							myPopup1.close(); //由于某种原因3秒后关闭弹出
//						}, 3000);
						return;
					}
				}

				//有数据 且没有相同用户 做拼接  push  或者 cancat
				registerStorageData.push(user);
				$Storage.set("register", registerStorageData);
				$Storage.set("testma", str);
				console.log(registerStorageData);

			} else {		//没有数据  就存在一个数组中				
					$Storage.set("register", [user]);
					var myPopup5 = $ionicPopup.alert({
							title: "<b>提示您:</b>",
							template: '恭喜注册成功！',
							scope: $scope,
							okText: '确定',
							okType: 'button-calm'	
						});
						myPopup5.then(function(res) {
							console.log('注册成功！');							
						});
						//$timeout(function() {
						//	myPopup5.close(); //由于某种原因3秒后关闭弹出
						//}, 3000);
						$state.go("login");
						return;				
			}		
//			$scope.repeatMa= function (Ma) {
//				//设置随机的4位数的验证码				
//				$Storage.set("testma", str);
//				alert($scope.Ma);
//				var myPopup = $ionicPopup.alert({
//						title: "<b>提示您:</b>",
//						template: '您收到的验证码为：'+$scope.Ma+'，请填写完成验证',
//						scope: $scope,
//						okText: '确定',
//						okType: 'button-calm'
//
//					});
//					myPopup.then(function(res) {			
//						$state.go("test", {
//							"id": str
//						});
//			
//					});
//				
//			}
//--------------注册后 跳转到 发送验证码页面-----------------
//			$state.go("test", {
//				"id": str
//			});
			//点击确定验证
//			$scope.phoneTest= function () {					
//				if($(".test_form .list .test_box").val()==$scope.Ma){
//					var myPopup5 = $ionicPopup.alert({
//						title: "<b>提示您:</b>",
//						template: '恭喜注册成功！',
//						scope: $scope,
//						okText: '确定',
//						okType: 'button-calm'
//
//					});
//					myPopup5.then(function(res) {
//						close();
//						console.log('验证成功！');
//					});
//					//$timeout(function() {
//					//	myPopup5.close(); //由于某种原因3秒后关闭弹出
//					//}, 3000);
//					$state.go("login");
//					return;
//				} else {
//					alert("验证码错误，注册失败！");
//				}
//			}

		}else{
			var myPopup2 = $ionicPopup.alert({
				title: "<b>提示您:</b>",
				template: '请按照提示填写完整，信息不能为空喔！',
				scope: $scope,
				okText: '确定',
				okType: 'button-calm'
			});
			myPopup2.then(function(res) {
				console.log('注册信息不能为空');
			});
//			$timeout(function() {
//				myPopup2.close(); //由于某种原因3秒后关闭弹出
//			}, 3000);

			return;
			
		}

	}

	//====================================
	/*
	 	1、输入框，显示提示信息，验证是否合法
		2、判断账户输入是否合法(正则)
		3、账户要求：手机号，暂时只开放手机号码注册
		4、密码要求：6-20位字符，可使用数字，字母，或字符
		5、确认密码：是否和密码一致
	*/
	//	var oPhone=document.getElementById("phonenumber");
	//	var oPsw=document.getElementById("password");
	//	var surePwd=document.getElementById("surepwd");


})

//===============登录===================
.controller("loginCtrl", function($scope, $state,$rootScope, $timeout, $ionicModal, $interval, $ionicPopup,$stateParams, $Storage) {
	console.log("loginCtrl");
	$scope.goRegister = function() {
		$state.go("register");
	}
	$scope.loging = function(username, userpwd) {		
		var usernumber = $Storage.get("register");
		$scope.usernumber=usernumber;
		//判断是否为空
		if(username && userpwd) {
			if(usernumber) {//遍历查找是否有匹配的用户			
				var isExist = false; //表示是否存在该用户，默认表示不存在
				for(var i = 0; i < usernumber.length; i++) {//判断用户是否存在	存在 ，验证密码				
					if(username == usernumber[i].phone && userpwd == usernumber[i].pwd&&usernumber[i].status==0) {					
						isExist = true; //表示存在
						var myPopup3 = $ionicPopup.alert({
							title: "<b>提示您:</b>",
							template: '欢迎登录!',
							scope: $scope,
							okText: '确定',
							okType: 'button-calm'
						});
						myPopup3.then(function(res) {
							console('欢迎登录');
							$rootScope.name=username;
						});
						$timeout(function() {
							myPopup3.close(); //由于某种原因3秒后关闭弹出
						}, 3000);
						usernumber[i].status=1;
						$Storage.set("register", JSON.stringify($scope.usernumber));
						$state.go("tab.user");
						return;
					
					}else{
						var myPopup11= $ionicPopup.alert({
							title: "<b>提示您:</b>",
							template: '该用户已经登录!',
							scope: $scope,
							okText: '确定',
							okType: 'button-calm'
						});
						myPopup11.then(function(res) {
							console('欢迎登录');							
						});
						$state.go("tab.user");
						return;
					}
				}
				//如果不存在,没有找到匹配的用户或密码
				if(!isExist) {

					var myPopup4 = $ionicPopup.alert({
						title: "<b>提示您:</b>",
						template: '您还没有注册或者密码错误',
						scope: $scope,
						okText: '确定',
						okType: 'button-calm'

					});
					myPopup4.then(function(res) {
						console.log('您还没有注册或者密码错误');
					});
					$timeout(function() {
						myPopup4.close(); //由于某种原因3秒后关闭弹出
					}, 3000);
					return;
				}

			}
			else{
				//如果不存在,没有找到匹配的用户或密码
				if(!isExist) {
					var myPopup4 = $ionicPopup.alert({
						title: "<b>提示您:</b>",
						template: '您还没有注册或者密码错误',
						scope: $scope,
						okText: '确定',
						okType: 'button-calm'
					});
					myPopup4.then(function(res) {
						console.log('您还没有注册或者密码错误');
					});
//					$timeout(function() {
//						myPopup4.close(); //由于某种原因3秒后关闭弹出
//					}, 3000);
					return;
				}
			}
		} else {
			//判断 该用户是否已经注册过
					var myPopup5 = $ionicPopup.alert({
						title: "<b>提示您:</b>",
						template: '信息不能为空',
						scope: $scope,
						okText: '确定',
						okType: 'button-calm'
					});
					myPopup5.then(function(res) {
						console.log('登录信息不能为空');
					});
		//			$timeout(function() {
		//				myPopup5.close(); //由于某种原因3秒后关闭弹出
		//			}, 3000);
		
					return;
		}

	}
	//--------------重发验证码------------
	//点击后 刷新页面 重发 验证码  在 url地址 可以 看到


	$scope.time = 60;
	var timer = $interval(function() {
		$scope.time--;
		if($scope.time == 0) {
			$scope.time = "";
			$interval.cancel(timer);
		} else {
			$(".timer").html($scope.time);
		}
	}, 1000);
	//=============================================
	//显示弹窗，用来填写验证码
	$ionicModal.fromTemplateUrl('templates/ma.html', {
		scope: $scope /*让当前的 $scope  可以在 modal.html里面使用 */
	}).then(function(model) {
		$scope.m = model;
	})
	$scope.timeout = function() {
		var testMaData = $Storage.get("testma");
		/*显示模态对话框*/
		$scope.m.show();
		$scope.send = function () {
			$scope.time = 60;
			//随机生成验证码
			var str = ""; //定义一个空字符串存放随机数
			for (var i = 0; i < 4; i++) {
				var num = parseInt(Math.random() * 10);
				//  数字0-9---->48-57
				var isNum = parseInt(Math.random() * 10) + 48;
				//  大写字母A-Z---->65-90
				var isBig = parseInt(Math.random() * 26) + 65;
				//  小写字母a-z---->97-122
				var isSmall = parseInt(Math.random() * 26) + 97;
				if (num % 3 == 0) {
					str += String.fromCharCode(isNum);
				} else if (num % 3 == 1) {
					str += String.fromCharCode(isBig);
				} else {
					str += String.fromCharCode(isSmall);
				}
				$Storage.set("testma", str);
				$scope.testma = str;
				//$(".testModel #virmma").val(str);
			}
			//点击发送验证码 弹出验证码
			alert($scope.testma);
			$(".testModel #virmma").val($scope.testma);
		}
	/*隐藏模态对话框*/
	$scope.closeModal = function() {
		$scope.m.hide();
	};
	$scope.submitTest = function(testma) {
		if($(".testModel .inputMa").val() == $scope.testma) {
			var myPopup5 = $ionicPopup.alert({
				title: "<b>提示您:</b>",
				template: '恭喜您验证成功！',
				scope: $scope,
				okText: '确定',
				okType: 'button-calm'
			});
			myPopup5.then(function(res) {
				console.log('验证成功！');
			});
			$timeout(function() {
				myPopup5.close(); //由于某种原因3秒后关闭弹出
			}, 3000);

			//关闭模态框
			$scope.closeModal();
			$Storage.set("testma", testma);
			$state.go("login");
			return;
		} else {
			alert("验证码错误");
		}

	}
	}

})