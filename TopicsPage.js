const request = require('request');
const cheerio = require('cheerio');
const I1 =require('./IssuePage')


function TopicsPage(name,url){
    request(url,(err,res,html)=>{
        if(err) 
        console.log(err);
        else if(res.statusCode===404){
            console.log("Page not found")
        }else{
            const $ = cheerio.load(html)
            const topics = $('.topic .col-md-8 article')
            for(let i=0;i<8;i++){
                const arr =  $(topics[i]).find('nav ul li')
                const listli = $(arr[1]).find('a').attr('href')
                // console.log('https://github.com'+listli)
                I1.IssuePage(name,`${listli.split('/')[1]}`,'https://github.com'+listli)
            }
        }
       
        
    })
}

module.exports = {TopicsPage}
