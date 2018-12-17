import './less/xxz.less';

import './less/xxz001.less';

import Swiper from 'swiper';

let swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loop         : true,

});