(function () {
    // logo部分鼠标移入移除效果切换
var logoBg = $('.logo-bg')
$('.logo').hover(function () {
    if(logoBg.hasClass('hover-in')){
        return false;
    }
    logoBg.fadeIn().removeClass('hover-out');   //鼠标移入的时候移除hover-out类名
    logoBg.css({
        background : '#fff url(https://img1.360buyimg.com/da/jfs/t1/31918/19/6335/274370/5c90a8beEefd9bfb9/e24970e34ce77262.gif?v=' + Math.random() + ') no-repeat',
        backgroundSize: '70%',
        backgroundPosition: '20px 0'
    }).addClass('hover-in').removeClass('animate-end')
    setTimeout(function () {
        logoBg.addClass('animate-end');   //当动画结束后添加上class类名animate-end
        $('.hover-out').fadeOut().removeClass('hover-in');
    },4000)
},function () {
    $('.animate-end').fadeOut().removeClass('hover-in');   //如果hover出去、并且当前动画已经结束则logo消失
    logoBg.addClass('hover-out');   //hover移除时添加hover-out类名
});


//设置输入框占位符数据的更新
var placeholderData = ['小饼干','仔仔面','熊字饼','娃哈哈','卫龙大面筋'];
setInterval(function () {
    $('#search-inp').attr('placeholder',placeholderData[Math.ceil(Math.random() * (placeholderData.length))]);
    // console.log(Math.ceil(Math.random() * (placeholderData.length)));
    
},3000)


// 搜索框数据
// jsonp : json and padding
// 用立即执行函数包裹之后全局函数需要拼接上window
window.renderSearchList = function (data) {   //渲染jsonp请求回来的数据
    // console.log(data.result[1][0]);
    var data = data.result;
    var str = '';
    for(var i = 0; i < data.length; i ++){
        str += `<li><a href="#">${data[i][0]}</a></li>`;
    }
    $('.search-list').html(str).show()
}
var timer = null;
$('#search-inp').on('input',function (){   //数据防抖处理、防止每次用户按下键盘去获取数据
    var val = $(this).val();
    clearTimeout(timer);
    if(val){
        timer = setTimeout(function () {
            getData(val)
        },500)
    }
}).focus(function () {   //如果鼠标聚焦在搜索框内、判断是否有值、如果有则获取列表数据
    var val = $(this).val();
    if(val){
        getData(val)
    }
})
function getData (val){   //jsonp请求数据
    $.ajax({
        url : 'https://suggest.taobao.com/sug',
//协议：https://  域名：suggest.taobao.com/sug  请求参数：?code=utf-8&q=yifu&_ksTS=1589638989453_308&callback=jsonp309&k=1&area=c2c&bucketid=7
        type : 'GET',
        dataType : 'jsonp',
        data : {
            code : 'utf-8',
            q : val,
            callback : 'renderSearchList',
        }
    })
}
var mouseleaveTime = null;
$('.search-box').mouseleave(function () {   //鼠标移出搜索区域则列表隐藏
    mouseleaveTime = setTimeout (function () {   //延迟执行、防止用户将鼠标快速移入移除
        $('.search-list').hide()
    },500)
}).mouseenter(function () {
    clearTimeout(mouseleaveTime);
})

// $('#search-btn').




})()