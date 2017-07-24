$(function(){
	
//	$scope.$(".find_nav .find_nav_bar li").click(function(){
//		console.log("sssdfsf");
//		$(this).siblings().removeClass("active");
//		$(this).addClass("active");
//	})
//回到顶部
    $(window).scroll(function () {
//获取当前的top值
        var curTop = $(this).scrollTop();
        if (curTop >= window.screen.height / 2) {
            $(".back_top").show();
        } else {
            $(".back_top").hide();
        }
    });
//点击缓冲运动回到顶部
    $(".back_top").click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 700); //某个元素执行动画，这里的元素是$('body,html')，滚动条的位置为0
        return false; //防止执行默认动作
    });
	
	
})
