(function () {
    var myDate = new Date();
    var newDate = new Date(myDate.setDate(myDate.getDate() + 1))
    // console.log(newDate.getDate());
    var endTime = new Date(newDate.getFullYear() +'-'+ (newDate.getMonth() + 1) +'-' + newDate.getDate() +' 12:00:00');
    setInterval(function () {
        var newTime = new Date().getTime();
        var range = endTime.getTime() - newTime;
        var hoor = Math.floor(range / 1000 / 60 / 60);
        var minute = Math.floor(range / 1000 / 60 % 60);
        var second = Math.floor(range / 1000 % 60);
        if(hoor < 10){
            hoor = '0' + hoor;
        }
        if(minute < 10){
            minute = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }
        $('.timmer__unit--hour').text(hoor)
        $('.timmer__unit--minute').text(minute)
        $('.timmer__unit--second').text(second)
    });

    $('.seckill-list').swiper({
        list : $('.seckill-wrapper-item'),
        width : 800,   //轮播图宽度
        height : 260,   //轮播图高度
        type : 'animate',  //轮播图动画效果
        showChangeBtn : true,   //是否显示左右与按钮
        autoTime : 3000,   //自动轮播时间
        showSpotBtn : false,   //是否显示小圆点
        isAuto : true,   //是否自动轮播
    })
    $('.seckill-brand').swiper({
        list : $('.seckill-brand-item'),
        width : 180,   //轮播图宽度
        height : 260,   //轮播图高度
        type : 'fade',  //轮播图动画效果
        showChangeBtn : false,   //是否显示左右与按钮
        autoTime : 2000,   //自动轮播时间
        showSpotBtn : true,   //是否显示小圆点
        isAuto : true,   //是否自动轮播
    })



})()