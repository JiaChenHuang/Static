$(function(){
/* 下载小米商城APP */
    $('#down').hide();
    $('#down-item').hover(function(){
        $('#down').slideDown(300).stop(false,true);
    },function(){
        $('#down').slideUp(300).stop(false,true);
    });
/* 下载小米商城APP end */
/* 右边购物车 */
    $('#cart-menu').hide();
    $('#topbar-cart').hover(function(){
        $('#cart-menu').slideDown(300).stop(false,true);
    },function(){
        $('#cart-menu').slideUp(300).stop(false,true);
    });
/* 右边购物车 end*/
})