const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const path =  require('path')

const url = "https://github.com/moby/moby/issues";

function IssuePage(name,repoName,url){
    let IssueData=[];
    request(url,(err,res,html)=>{
        if(err)
        console.log(err)
        else if(res.statusCode===404){
            console.log("Page not found")
        }
        else{
            const $ = cheerio.load(html);
            const arr = $('div[aria-label="Issues"] .pr-3.pr-md-2')
            for(let i=0;i<arr.length;i++){
                const issuerev = $(arr[i]).find('a').attr('href')
                IssueData.push("https://github.com/"+issuerev||"No open Issues")
                // console.log(name," ",repoName," ",'Issue Link',i,' ',issuerev||"No open Issues")
            }
            // console.log(name," ",repoName," ",IssueData)
            let foldername = path.join(__dirname,name);
            directoryCreator(foldername)
            let filename = path.join(foldername,repoName+".json");
            fs.writeFileSync(filename,JSON.stringify(IssueData))
        }
       
        
    })
}

module.exports={IssuePage}
function directoryCreator(foldername){
    if(fs.existsSync(foldername)===false){
        fs.mkdirSync(foldername)
    }
}