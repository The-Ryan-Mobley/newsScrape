const scraper = require("../scraping/scraper");
module.exports = (app) => {
    app.get("/", (req, res) => {
        scraper.curateDb((curator) => {
            if (curator !== "504") {
                scraper.scrape("https://old.reddit.com/r/todayilearned", result => {
                    scraper.query(result => {
                        console.table(result);
                        res.render('index', {
                            
                            entry: result
                        });
                    });
                });
            } else {
                scraper.scrape("https://old.reddit.com/r/todayilearned", result => {
                    scraper.query(result => {
                        res.render('index', {
                            entry: result
                        });
                    });
                });
            }

        });


    });
}