$('.service_list').on('mouseenter','.service_frame',function () {
    $('.service-pop').css({
        // top : '28px'
        transform: 'translateY(-100%)'
    });
    $('.service_frame:not(.service_frame2)').css({
        marginTop : '-35px'
    });

    if($(this).hasClass('service_frame2')){
        $(this).css({marginTop : '-56px'});
        console.log($(this));
        
    }
    $('.service-frame-on').removeClass('service-frame-on');
    $(this).addClass('service-frame-on');
})
var key = true;
if(key){
    key = false;
    $('#close').click(function () {
        $('.service-pop').css({
            // top : 240
        transform : 'translateY(0%)'

        });
        $('.service_frame').css({
            marginTop : 0
        })
        $('.service-frame-on').removeClass('service-frame-on');
        key = true;
    })
}