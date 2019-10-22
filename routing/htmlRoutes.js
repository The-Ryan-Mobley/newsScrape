const scraper = require("./controller/scraper");
module.exports = (app) => {
    app.get("/", (req,res) =>{
        scraper.scrape((result) =>{
            scraper.pushToDb(result);
            res.render('index');

        }); 
    });
}