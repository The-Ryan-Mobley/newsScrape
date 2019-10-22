const scraper = require("./controller/scraper");
module.exports = (app) => {
    app.get("/scrape", (req, res) =>{
        console.log(`******************************************\n
                     *                SCRAPING                *\n
                     ******************************************`);
        scraper.scrape("https://old.reddit.com/r/todayilearned", result => {
            if( result = "200") {
                console.log(`******************************************\n
                             *                  DONE                  *\n
                             ******************************************`);
            }
        });
        
    });
}