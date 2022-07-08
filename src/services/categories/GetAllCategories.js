const Category = require('../../models/Category')

module.exports = class GetAllCategories{

    async selectAll(req, res) {
        Category.find().then(categories => {
            res.send(categories)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
}