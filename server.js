const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000; //process set by Heroku

app.use(bodyParser.urlencoded({ extended: false })); //this is used to easily intepret our client POST data-- false only allows strings or arrays to be passed


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

app.use(express.static(process.cwd() + "/public")); //process.cwd is built into Node, targets current working directory

app.use(methodOverride("_method")); //package that looks for the text "?_method="*" appended to my POST request action from view.  *(can be PUT or DELETE)

const routes = require("./controllers/burgers_controller.js");

app.use("/", routes); //if I changed the "/" to "/foo" then "/foo" would act as my root folder for these particular routes

app.listen(port, function() {
    console.log(`App listening on port ${port}`);
});