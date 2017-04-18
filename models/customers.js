
module.exports = function(sequelize, DataTypes) {
    var Customers = sequelize.define("Customers", {
        author_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        classMethods: {
            associate: function(models) {
                Customers.hasMany(models.Burgers, {
                        onDelete: "cascade"
                });
            }
        }
    });
    return Customers;
};