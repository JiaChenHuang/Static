(function () {   //立即执行函数、封闭作用域
/**
 * 
 * @param {Object} opt 轮播图对象数据
 * @param {Element} wrap 要添加轮播图的元素
 */

function Slider(opt, wrap) {   //构造函数的this指向由构造函数构造出的对象、及下文的obj
    this.wrap = wrap;
    this.list = opt.list || [];   //轮播图列表
    this.width = opt.width || wrap.width();   //轮播图宽度
    this.height = opt.height || wrap.height();   //轮播图高度
    this.type = opt.type || 'fade';   //轮播图动画效果
    this.showChangeBtn = opt.showChangeBtn || opt.showChangeBtn == undefined ? true : opt.showChangeBtn;   //是否显示左右与按钮
    this.autoTime = opt.autoTime || 1500;   //自动轮播时间
    this.showSpotBtn = opt.showSpotBtn || opt.showSpotBtn == undefined ? true : opt.showSpotBtn;   //是否显示小圆点
    this.isAuto = opt.isAuto || opt.isAuto == undefined ? true : opt.isAuto;   //是否自动轮播
    this.nowIndex = 0;   //当前显示的这张图片
    this.listLength = this.list.length;   //轮播图片的总个数
    this.isAnimate = false;   //当前是否正在执行动画
    this.timer = null;
    this.init = function () {   //初始化轮播图结构样式行为的工作
        // 1、轮播图结构的构建
        this.createDom();
        //2、初始化样式
        this.initStyle();
        //3、绑定事件
        this.bindEvent();
        if (this.isAuto == true) {
            this.autoChange()
        }

    }

}

Slider.prototype.createDom = function () {   //原型链上轮播图结构的构建
    var sliderWraper = $('<div class="my-swiper-wrapper"></div>');   //最外层包裹区域
    var sliderContent = $('<ul class="my-swiper-list"></ul>');   //轮播区域
    var leftBtn = $('<div class="my-swiper-btn my-swiper-lbtn">&lt;</div>');   //左按钮
    var rightBtn = $('<div class="my-swiper-btn my-swiper-rbtn">&gt;</div>');   //右按钮
    var spotBtn = $('<div class="my-swiper-spots"></div>');   //小圆点
    for (var i = 0; i < this.list.length; i++) {
        $('<li class="my-swiper-item"></li>').append(this.list[i]).appendTo(sliderContent);
        $('<span></span>').appendTo(spotBtn)
    }
    if (this.type == 'animate') {
        $('<li class="my-swiper-item"></li>').append($(this.list[0]).clone()).appendTo(sliderContent);

    }
    sliderWraper.append(sliderContent)
        .append(leftBtn)
        .append(rightBtn)
        .append(spotBtn)
        .appendTo(this.wrap)
        .addClass('my-swiper-' + this.type)
}

Slider.prototype.initStyle = function () {   //初始化样式
    $('.my-swiper-wrapper', this.wrap).css({
        width: this.width,
        height: this.height,
    }).find('.my-swiper-item').css({ width: this.width, height: this.height });
    if (this.type == 'fade') {   //如果动画类型是淡入淡出效果
        $('.my-swiper-item', this.wrap).hide().eq(this.nowIndex).show();
    } else if (this.type == 'animate') {   //如果是动画类型是切换效果
        $('.my-swiper-list', this.wrap).css({
            width: this.width * (this.list.length + 1),
            position: 'absolute'
        }, 1000 / 60).addClass('after')
    }
    this.showChangeBtn == true ? $('.my-swiper-btn', this.wrap).show() : $('.my-swiper-btn', this.wrap).hide();   //是否显示左右按钮
    this.showSpotBtn == true ? $('.my-swiper-spots', this.wrap).show() : $('.my-swiper-spots', this.wrap).hide();   //是否显示小圆点
    $('.my-swiper-spots > span', this.wrap).eq(this.nowIndex).addClass('active');   //为小圆点添加active样式
}

Slider.prototype.bindEvent = function () {   //为页面绑定点击事件
    var self = this;
    $('.my-swiper-lbtn', this.wrap).click(function () {   //点击左侧按钮
        if (self.isAnimate) {
            return false;
        }
        self.isAnimate = true;
        if (self.nowIndex == 0) {
            if (self.type == 'animate') {
                $('.my-swiper-list', self.wrap).css({
                    left: -self.width * self.list.length
                })
            }
            self.nowIndex = self.list.length - 1;
        } else {
            self.nowIndex--;
        }
        self.change();
    })
    $('.my-swiper-rbtn', this.wrap).click(function () {   //点击右侧按钮
        if (self.isAnimate) {
            return false;
        }
        self.isAnimate = true;

        if (self.type == 'fade' && self.nowIndex == self.list.length - 1) {
            self.nowIndex = 0;
        } else if (self.type == 'animate' && self.nowIndex == self.list.length) {
            $('.my-swiper-list', this.wrap).css({
                left: 0
            });
            self.nowIndex = 1;
        } else {
            self.nowIndex++;
        }
        self.change();
    })
    $('.my-swiper-wrapper', this.wrap).mouseenter(function () {   //鼠标移入清除定时器
        clearInterval(self.timer)
    }).mouseleave(function () {   //鼠标移除开启定时器
        if (self.isAuto) {
            self.autoChange()
        }
    });
    $('.my-swiper-spots > span', this.wrap).mouseenter(function () {   //鼠标移入小圆点显示对应的图片
        if (self.isAnimate) {
            return false;
        }
        self.isAnimate = true;
        self.nowIndex = $(this).index()
        self.change();

    })
}

Slider.prototype.change = function () {   //样式上的切换
    var self = this;
    if (this.type == 'fade') {   //如果是淡入淡出的动画则为所有的轮播内容添加淡入淡出效果、上一张图片消失淡出、当前图片淡入
        $('.my-swiper-item', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function () {
            self.isAnimate = false;
        });
    } else if (this.type == 'animate') {   //如果是动画类型是切换效果
        $('.my-swiper-list', this.wrap).animate({
            left: -this.width * this.nowIndex
        }, function () {
            self.isAnimate = false;
        })
    }
    //当nowIndex === thisLength的时候、代表当前是最后一张图片、需要让第0个小圆点显示样式
    $('.my-swiper-spots > span', this.wrap).removeClass('active').eq(this.nowIndex % this.list.length).addClass('active');   //当前小圆点切换

}

Slider.prototype.autoChange = function () {   //是否自动轮播
    var self = this;
    this.timer = setInterval(function () {
        $('.my-swiper-rbtn', self.wrap).click()
    }, this.autoTime)
}

$.fn.extend({
    swiper: function (options) {
        //一个构造函数可以构造出多个对象、每个对象之间相互独立、每个实例调用这个方法都会创建这个对象
        var obj = new Slider(options, this);
        obj.init()
    }
})

})()