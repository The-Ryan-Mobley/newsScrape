const scraper = require("../scraping/scraper");
module.exports = (app) => {
    app.get("/", (req, res) => {
        scraper.scrape("https://old.reddit.com/r/todayilearned", result => {
            if( result === "200") {
                scraper.query(result => {
                    res.render('index', {
                        entry: result
                    });
                });
            } else{
                res.render('index');
            }
        });
        
    });
}