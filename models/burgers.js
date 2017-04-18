
module.exports = function(sequelize, DataTypes) {
    var Burgers = sequelize.define("Burgers", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        classMethods: {
            associate: function(models) {
                Burgers.belongsTo(models.Customers, {
                    foreignKey: {
                        allowNull: true
                    }
                });
            }
        }
    });
    return Burgers;
};