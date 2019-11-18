$(function(){
    $('.flexslider').flexslider({
        // 两秒钟自动切换
        slideshowSpeed: 3000,
        // 手动切换后继续轮播
        pauseOnAction: false,
        // 显示左右按钮
        directionNav: false 
    });
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
    
    $('.on_left,.on_right').mouseout(function(){
        mytimer = setInterval(myanimate, 5000);;
    })
   
        


// 轮播部分 end

})