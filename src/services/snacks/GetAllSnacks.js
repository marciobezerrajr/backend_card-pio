const Snack = require('../../models/Snack')

module.exports = class GetAllSnacks {

    async selectAll(req, res) {
        Snack.find().then(snacks => { 
            res.send(snacks)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição,\n ' + err)
        })
    }
}