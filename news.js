const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Sheet = require('./sheet');


(async function () {

    const res = await fetch("https://www.elsiglodetorreon.com.mx/seccion/lalaguna/");
    const text = await res.text();
    const $ = cheerio.load(text);
    const dayNews = {};
    const containers = $('.carmov').toArray();

    const urls = [];
    $('.a-title').each(function(i, elem) {
        // url = $(this).attr('href');
        url = `https://www.elsiglodetorreon.com.mx${$(this).attr('href')}`;
        urls[i] = url;
      });


    const trends = containers.map((c,i) => {
        const active = $(c);
        const heading = active.find('.tcam2').text();
        const img = active.find('img:nth-child(1)').attr('data-src');
        const category = 'LOCAL';
        // const url = `https://www.elsiglodetorreon.com.mx${$('.a-title').attr('href')}`;
        const url = urls[i];
        
        return {heading, img, category, url}
     
      
    })

    console.log(trends);
    
    const sheet = new Sheet();
    await sheet.load();
    await sheet.addRows(trends, 0);



})();