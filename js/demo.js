$(function(){
// banner部分
    $('.flexslider').flexslider({
        // 两秒钟自动切换
        slideshowSpeed: 3000,
        // 手动切换后继续轮播
        pauseOnAction: false,
        // 显示左右按钮
        directionNav: false 
    });
// banner部分 end
// 轮播部分
    var num = 0;
    var mytimer = setInterval(myanimate, 5000);
    function myanimate(){
        num=num>=3?0:num+1;
        todo(num);
    }
    function todo(num){
        $('.swiper').stop(true,false).animate({left: -num*992 +'px'}, 500);
    }
    $('.on_left').click(function(){
        clearInterval(mytimer);
        num=num<1?0:--num;
        todo(num);
    });
    $('.on_right').click(function(){
        clearInterval(mytimer);
        num=num>2?3:++num;
        todo(num);
    });
    // 鼠标移除自动开始轮播
    $('.on_left,.on_right').mouseleave(function(){
        clearInterval(mytimer);
    });
    $('.on_left,.on_right').mouseout(function(){
        mytimer = setInterval(myanimate, 5000);
    });

// 轮播部分 end
// 计时器部分

showLocalTime();
var LocalTime = setInterval(showLocalTime, 1000)
function showLocalTime(){
    var myDate = new Date();    //获取系统时间
    var myhour = myDate.getHours();     //获取小时
    var myminute = myDate.getMinutes();     //获取分钟
    var mysecond = myDate.getSeconds();     //获取秒钟

    if(myhour < 10){
        myhour = "0" + myhour;
    }
    if(myminute < 10){
        myminute = "0" + myminute;
    }
    if(mysecond < 10){
        mysecond = "0" + mysecond;
    }
    $("#h").html(myhour);
    $('#m').html(myminute);
    $('#s').html(mysecond);
}

// 计时器部分 end



})