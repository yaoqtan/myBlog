import './less/xxz.less';

import lang from './lang'

let baseLang='en';

const changeLang = ()=>{
    if(baseLang==='en'){
        baseLang='tc';
    }else{
        baseLang='en';
    }
    console.log(lang[baseLang]);

};
/*
const langDom=document.querySelector('#lang');
console.log(langDom)
langDom.addEventListener('click',changeLang,false);*/




