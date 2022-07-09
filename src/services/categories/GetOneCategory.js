const Category = require('../../models/Category')

module.exports = class GetOneCategory {

    async select(req, res) {
        Category.findOne({ _id: req.params.id }).then(categories => {
            res.send(categories)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
}