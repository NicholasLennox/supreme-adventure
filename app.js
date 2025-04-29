const express = require('express')
const app = express()
const db = require('./models')

const port = process.env.PORT || 3000

app.use(express.json())

const drinksRouter = require('./routes/drinks')

app.use('/drinks', drinksRouter)

// If production, use alter, if not, use force
const syncOption = process.env.NODE_ENV === 'production' ? {alter: true} : {force: true}

db.sequelize.sync(syncOption).then( async () => {
    if(await db.Drink.count() === 0) {
        await db.Drink.bulkCreate([
            {
                name: 'Mojito',
                type: 'Cocktail',
                ingredients: 'Rum, Mint, Lime, Sugar, Soda Water',
                alcoholic: true,
                price: 8.50
            },
            {
                name: 'Sunset Smoothie',
                type: 'Smoothie',
                ingredients: 'Mango, Orange Juice, Banana, Strawberry',
                alcoholic: false,
                price: 6.00
            },
            {
                name: 'Cherry Cola',
                type: 'Soda',
                ingredients: 'Cola, Cherry Syrup, Ice',
                alcoholic: false,
                price: 3.50
            },
            {
                name: 'Espresso Martini',
                type: 'Cocktail',
                ingredients: 'Vodka, Espresso, Coffee Liqueur, Sugar Syrup',
                alcoholic: true,
                price: 9.00
            },
            {
                name: 'Virgin Piña Colada',
                type: 'Mocktail',
                ingredients: 'Pineapple Juice, Coconut Cream, Ice',
                alcoholic: false,
                price: 5.50
            }
        ]);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

module.exports = app

