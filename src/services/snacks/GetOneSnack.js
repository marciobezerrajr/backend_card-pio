const Snack = require('../../models/Snack')

module.exports = class GetOneSnacks {

    async select(req, res) {
        const id = req.params.id

        Snack.findOne({ _id: id }).then(snacks => { //.populate('snack')
            res.send(snacks)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
}