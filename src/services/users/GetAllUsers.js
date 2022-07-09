const User = require('../../models/User')

module.exports = class GetAllUsers {
    
    async selectAll(req, res) {
        User.find().then((users) => {
            res.send(users)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
}