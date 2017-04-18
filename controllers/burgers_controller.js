

var db = require("../models");


module.exports = function(app) {


    app.get("/", function(req, res) {

        db.Burgers.findAll({
        include: [db.Customers]
        })
        .then(function(result){

            let hbObject = {
                burgers : result
            };
            res.render('index', hbObject);
        });


    });

    app.post("/", function(req, res) {
        const burgerInput = req.body.burgerInput;
        
        db.Burgers.findOrCreate({
            where: {
            burger_name: burgerInput
            }
            }).then(function(result){
            res.redirect("/");

        });
    });

    app.post("/update/:id", function(req, res) {
        const burgerId = req.params.id;
        const consumer = req.body.consumer;

         db.Customers.findOrCreate({
             where: {
            author_name: consumer
             }
        }).then(function(result){
            db.Burgers.update({
            devoured: true,
            CustomerId: result[0].id
        }, 
        {
            where: {
                id: burgerId
            }
        }).then(function(result){
            res.redirect("/");
        });
    });

             });
        

    app.get("/delete/:id", function(req, res) {
        const burgerId = req.params.id;

        db.Burgers.destroy({
            where: {
               id: burgerId
            }
            }).then(function(result){
            res.redirect("/");

        });
    });

    app.get("/deleteConsumer/:id", function(req, res) {
        const CustomerId= req.params.id;

        db.Burgers.destroy({
            where: {
               CustomerId: CustomerId
            }
            }).then(function(result){
            res.redirect("/");

        });
    });

};



