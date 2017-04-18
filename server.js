var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000; //process set by Heroku
var db = require("./models");

app.use(express.static(process.cwd() + "/public")); //process.cwd is built into Node, targets current working directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


var hbs = exphbs.create({ //create my own instance of handlebars so I can create my own helpers (can be used globally)
    helpers: {
        inc: function (index) { 
              return parseInt(index) + 1; 
         }
    },
    defaultLayout: 'main'
    });

app.engine('handlebars', hbs.engine) // use my handlebars instance
app.set('view engine', 'handlebars'); //set view engine to handlebars



app.use(methodOverride("_method")); //package that looks for the text "?_method="*" appended to my POST request action from view.  *(can be PUT or DELETE)

require("./controllers/burgers_controller.js")(app);

db.sequelize.sync().then(function() {
    console.log("database synced");
    app.listen(port, function() {
        console.log(`App listening on port ${port}`);
    });
});