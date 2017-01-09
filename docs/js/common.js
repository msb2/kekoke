(function(){
    'use strict';
    var setImg = '#viewer',
    FADESPEED = 1000,
    SWITCHDELAY = 3000;

    $(setImg).children('img').css({opacity:'0'});
    $(setImg + ' img:first').stop().animate({opacity:'1',zIndex:'20'},FADESPEED);

    setInterval(function(){
        $(setImg + ' :first-child').animate({opacity:'0'},FADESPEED).next('img').animate({opacity:'1'},FADESPEED).end().appendTo(setImg);
    },SWITCHDELAY);
    $('.logo').fadeIn(2000);
})();