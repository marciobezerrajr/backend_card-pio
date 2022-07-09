const User = require('../../models/User')
const bcrypt = require('bcryptjs')

module.exports = class CreateUser {

    async create(req, res) {
        const { email, password, isAdmin, name } = req.body

        User.findOne({ email }).then((user) => {
            if (user == undefined) {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)

                User.create({
                    name,
                    email,
                    isAdmin,
                    password: hash
                    
                }).then(() => {
                    res.status(200).json({ 'message': 'Usuário criado com sucesso' })
                    
                }).catch((err) => {
                    res.status(403).json({ 'message': "Erro ao processar essa requisição" })
                    console.log(err)
                })
            } else {
                res.status(401).json({ 'message': "Já existe um cadastro com este e-mail" })
            }
        })
    }
}