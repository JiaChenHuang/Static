var menuList = [{
    titles: ['家用电器'],
    content: {
        tabs: ['家电馆', '镇乡专卖店', '家电服务'],
        subs: [{
            title: '电视',
            items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
        }, {
            title: '空调',
            items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
        }]
    }
}, {
    titles: ['手机', '运营商', '数码'],
    content: {
        tabs: ['手机','5G新品','套餐'],
        subs: [{
            title: '手机',
            items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
        }, {
            title: '手表',
            items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
        }]
    }
}, {
    titles: ['电脑', '办公'],
    content: {
        tabs: ['家电馆', '镇乡专卖店', '家电服务'],
        subs: [{
            title: '电视',
            items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
        }, {
            title: '空调',
            items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
        }]
    }
}, {
    titles: ['家居', '家具', '家装', '厨具'],
    content: {
        tabs: ['家居', '镇乡专卖店', '家电服务'],
        subs: [{
            title: '电视',
            items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
        }, {
            title: '空调',
            items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
        }]
    }
}];

function renderMenuList(data){   //渲染数据
    var str = '';
    for(var i = 0; i < data.length; i ++){
        var titles = data[i].titles;
        str += `<li>
            ${titles.map(function(title) {   //数组中的一个方法、会遍历一个数组、并且会返回一个新的数组
                return `<a href="#">${title}</a>`
            }).join('<span>/</span>')}
                </li>`
        $('.fs-menu').html(str);
    }
}

renderMenuList(menuList);
$('.fs-menu').on('mouseenter','li',function () {
    $('.menu-item-on').removeClass('menu-item-on');
    $(this).addClass('menu-item-on');
    var index = $(this).index();   //获取当前鼠标移入菜单的索引值
    renderMenuContent(menuList[index].content);
    $('.menu-content').show();
})
$('.fs-1').mouseleave(function () {
    $('.menu-content').hide();
    $('.menu-item-on').removeClass('menu-item-on');
    
})
function renderMenuContent(data){   //右侧内容区的数据、也就是menuList.content
    var tabsNav = $('<div class="tabs-nav"></div>');
    var cateDetails = $('<div class="cate-details"></div>');
    data.tabs.forEach(function(tab){
        $(`<a href="#">${tab}<i class="iconfont">&#xe607;</i></a>`).appendTo(tabsNav);
    });
    data.subs.forEach(function (sub) {
        var dl = $('<dl class="cate-item clear"></dl>');
        $(`<dt><a href="#">${sub.title}<i class="iconfont">&#xe607;</i></a></dt>`).appendTo(dl);
        var dd = $('<dd></dd>');
        sub.items.forEach(function (item) {
            $(`<a href="#">${item}</a>`).appendTo(dd)
        })
        
        dl.append(dd).appendTo(cateDetails);
    })

    $('.menu-content').empty().append(tabsNav).append(cateDetails);

}