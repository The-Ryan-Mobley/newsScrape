const scraper = require("../scraping/scraper");
module.exports = (app) => {
    app.get("/scrape", (req, res) =>{
        console.log(`******************************************
                     *                SCRAPING                *
                     ******************************************`);
        scraper.scrape("https://old.reddit.com/r/todayilearned", result => {
            if( result === "200") {
                console.log(`******************************************
                             *                  DONE                  *
                             ******************************************`);
                res.sendStatus("200");
            }
        });
        
    });
    app.post("/comment/:id", (req,res) => {
        let id = req.params.id;
        scraper.insertComment(req.body, id, (result)=>{
            if(result !== "404"){
                res.sendStatus("200");

            } else {
                res.sendStatus("404");
            }

        });

    });
    app.get("/comment/:id",(req,res)=>{
        let id = req.params.id;
        
        scraper.viewComments(id, (result)=>{
            if(result !== "404"){
                res.json(result);
            }
            else{
                res.sendStatus("404");
            }
        });
        
    })
}