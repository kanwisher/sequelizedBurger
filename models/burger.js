const orm = require('../config/orm.js');




const burger = {

    allBurgers: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    newBurger: function(burger_input, cb) {
        orm.insertOne('burgers', 'burger_name', burger_input, function(res) {
            cb(res);
        });
    },
    eatBurger: function(burgerId, cb) {
        orm.updateOne('burgers', 'devoured', 1, 'id', burgerId, function(res) {
            cb(res);
        });
    },
    deleteBurger: function(burgerId, cb) {
        orm.deleteOne('burgers', 'id', burgerId, function(res) {
            cb(res);
        });
    }

    
}


module.exports = burger;