$(function () {
    var windowWidth = $(window).width();
    var htmlStr = $('#pageplugin').html();
    var timer = null;
    $(window).on('resize',function() {
        var resizedWidth = $(window).width();
        if(windowWidth != resizedWidth && resizedWidth < 500) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                $('#pageplugin').html(htmlStr);
                window.FB.XFBML.parse();
　　　　　　　　　　　//window.FB.XFBML.parse()で再レンダリングします。
                var windowWidth = $(window).width();
            }, 500);
        }
    });
});



var KEKOKE = KEKOKE || {};
KEKOKE.common = {};

KEKOKE.common = {
    init : function(){
        this.setParameters();
        this.alignHeight();
        this.bindEvent();
        this.slideShow();
        this.logoAnimation();
    },
    //初期値設定
    setParameters : function(){
        this.$window = $(window);
        this.artistList = $('.artistDetailList').find('li');
        this.$targetList = $('.artistDetailList').find('li:nth-child(even)');
        this.$nuvLink = $('.nuv').find('a');
        this.SCROLLSPEED = 1000;
        this.WINDOWWIDTH = this.$window.width();
    },
    //背景画像の切り替え
    slideShow : function(){
        var $viewer = $('#viewer'),
            $setImg = $('#viewer').find('img'),
            $firstImage = $('#viewer').find('img:first-child'),

            FADESPEED = 1000,
            SWITCHDELAY = 3000;

            $setImg.css({opacity:'0'});
            $firstImage.stop().animate({opacity:'1',zIndex:'20'},FADESPEED);
            setInterval(function(){
                $firstImage = $('#viewer').find('img:first-child');
                $firstImage.animate({opacity:'0'},FADESPEED).next('img').animate({opacity:'1'},FADESPEED).end().appendTo($viewer);
            },SWITCHDELAY);
    },
    //ロゴ画像のフェード表示
    logoAnimation: function(){
        $('.logo').fadeIn(2000);
    },
    //作家詳細の横並び時に隣の要素の高さを揃える
    alignHeight : function(){
        this.WINDOWWIDTH = this.$window.width();
        if(this.WINDOWWIDTH > 1099) {
            this.$targetList.each(function(){
                var leftHeight = $(this).prev().height(),
                    rightHeight = $(this).height();
                if(leftHeight > rightHeight) {
                    $(this).height(leftHeight);
                } else {
                    $(this).prev().height(rightHeight);
                }
            });
        } else {
            this.artistList.height('');
        }
    },
    //ナビゲーションメニューを押した時にスクロールさせながら移動
    smoothScroll : function(x){
            var href= x.attr("href"),
                targetContents = $(href == "#" || href == "" ? 'html' : href),
                position = targetContents.offset().top - 60;

            $("html, body").animate({scrollTop:position}, this.SCLOLLSPEED, "swing");
            return false;
    },
    //イベント処理
    bindEvent : function(){
        var _self = this,
            timer = false;

        this.$window.resize(function() {
            if (timer !== false) {
                clearTimeout(timer);
            }
            timer = setTimeout(function() {
                 _self.alignHeight();
            }, 200);
        });
        this.$nuvLink.on('click', function() {
            _self.smoothScroll($(this));
        });

    }
};

$(function(){
    KEKOKE.common.init();
});