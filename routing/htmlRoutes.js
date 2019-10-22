const scraper = require("../scraping/scraper");
module.exports = (app) => {
    app.get("/", (req,res) =>{
        scraper.scrape("https://old.reddit.com/r/todayilearned", result =>{
            res.render('index');
        }); 
    });
}