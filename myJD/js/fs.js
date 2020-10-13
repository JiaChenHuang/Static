$('.fs-1').load('./fs/fs-1.html');
$('.fs-3').load('./fs/fs-3.html');

$('.slider-banner-wrapper').swiper({
    list : $('.banner-img'),   //轮播图列表
    width : 590,   //轮播图宽度
    height : 470,   //轮播图高度
    type : 'animate',  //轮播图动画效果
    showChangeBtn : true,   //是否显示左右与按钮
    autoTime : 2500,   //自动轮播时间
    showSpotBtn : true,   //是否显示小圆点
    isAuto : true,   //是否自动轮播
})
$('.slider-recommend-wrapper').swiper({
    list : $('.focus-item__recommend'),   //轮播图列表
    width : 190,   //轮播图宽度
    height : 470,   //轮播图高度
    type : 'fade',  //轮播图动画效果
    showChangeBtn : false,   //是否显示左右与按钮
    autoTime : 3000,   //自动轮播时间
    showSpotBtn : false,   //是否显示小圆点
    isAuto : true,   //是否自动轮播
})
$('.slider-recommend-wrapper').hover(function () {
    $('.slider-recommend-wrapper .my-swiper-btn').fadeIn(300);
},function () {
    $('.slider-recommend-wrapper .my-swiper-btn').fadeOut(300);
})
