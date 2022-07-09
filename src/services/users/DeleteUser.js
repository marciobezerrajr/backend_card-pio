const User = require('../../models/User')

module.exports = class DeleteUser {
    
    async delete(req, res) {
        User.findById({ _id: req.body.id }).then((user) => {
            User.deleteOne({ _id: req.body.id }).then((user) => {
                try {
                    res.status(200).json({ "message": "Usuário excluido com sucesso!" })
                    return
                } catch (err) {
                    res.status(404).json({ "message": "Houve um erro ao tentar excluir este usuário, por favor tente novamente mais tarde\n" + err })
                }
            }).catch((err) => {
                res.status(404).json({ "message": "Houve um erro ao tentar excluir este usuário, por favor tente novamente mais tarde\n" + err })
            })
        }).catch((err) => {
            res.status(404).json({ "message": "Usuário não encontrado\n" + err })
        })
    }
}