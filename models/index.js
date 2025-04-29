const { Sequelize, DataTypes } = require('sequelize')
const fs = require('fs');
const path = require('path');

// Only load dotenv outside prod
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


// Create instance
const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectModule: require('mysql2'), // Had to add this for vercel
    define: {
        timestamps: false
    }
})

// Created a wrapper
const db = {}
db.sequelize = sequelize

// Import all models dynamically
fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.model.js'))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes)
        db[model.name] = model
})

// Configure any relationships
Object.keys(db).forEach(prop => {
    if(db[prop].associate) {
        db[prop].associate(db)   
    }
})

// Export wrapper
module.exports = db