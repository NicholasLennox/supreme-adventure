module.exports = (sequelize, DataTypes) => {
    const Drink = sequelize.define('Drink',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    len: {
                        args: [2, 255],
                        msg: 'Name must be at least 2 characters long'
                    }
                }
            },
            type: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Type must not be empty'
                    }
                }
            },
            // Comma delimited list for simplicity
            ingredients: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Ingredients must not be empty'
                    }
                }
            },
            alcoholic: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            price: {
                type: DataTypes.DECIMAL(5,2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        msg: 'Price must be a decimal number'
                    },
                    min: {
                        args: [0],
                        msg: 'Price must be positive'
                    }
                }
            }
        }
    );

    Drink.associate = (db) => {
        // No associations
    };

    return Drink;
};
