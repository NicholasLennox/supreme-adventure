class DrinkService {
    constructor(db) {
        this.db = db
        this.drinks = db.Drink
    }

    async getAll() {
        return await this.drinks.findAll()
    }

    async add(payload) {
        return await this.drinks.create(payload)
    }
}

module.exports = DrinkService