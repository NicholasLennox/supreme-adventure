const express = require('express')
const router = express.Router()
const db = require('../models')
const DrinkService = require('../services/drinkService')
const drinkService = new DrinkService(db)

router.get('/', async (req,res) => {
    res.json(await drinkService.getAll())
})

router.post('/', async (req, res) => {
    try {
        const { name, type, ingredients, alcoholic, price } = req.body;

        const newDrink = await drinkService.add({
            name,
            type,
            ingredients,
            alcoholic,
            price
        });

        res.status(201).json({newDrink});
    } catch (error) {
        console.error(error);
        // We have validation on the model
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: error.errors.map(e => e.message)
            });
        }

        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router