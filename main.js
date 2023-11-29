const request = require('request');
const cheerio = require('cheerio');
const T1 = require('./TopicsPage')
const url = "https://github.com/topics";

request(url,(err,res,html)=>{
    if(err)
    console.log(err);

    else if(res.statusCode===404){
        console.log('Page not found')
    }
    
    else{
        const $ = cheerio.load(html)
        const topics = $('.container-lg.mt-6>ul>li')
        for(let i=0;i<topics.length;i++){
            const itopics = $(topics[i]).find('div')
            const indi = $(itopics).find('a').attr('href')
            T1.TopicsPage(`${indi.split('/').pop()}`,'https://github.com'+indi)
            
         }
    }
    
})

