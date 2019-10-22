const scraper = require("../scraping/scraper");
module.exports = (app) => {
    app.get("/", (req,res) =>{
        scraper.query(result =>{
            res.render('index', {entry: result});
        }); 
    });
}