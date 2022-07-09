const User = require('../../models/User')

module.exports = class GetOneUser {
    
    async select(req, res) {
        User.findOne({ _id: req.params.id }).then((user) => {
            res.send(user)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
}