const bcrypt = require('bcryptjs')
const User = require('../../models/User')

module.exports = class Login {

    async login(req, res) {
        const email = req.body.email
        const password = req.body.password

        User.findOne({ email }).then((user) => {
            if (user != undefined) {
                const credential = bcrypt.compareSync(password, user.password)

                if (credential) {
                    req.session.user = {
                        id: user.id,
                        email: user.email
                    }
                    res.status(200).json({ 'message': "Usuário autenticado e sessão criada" })
                } else {
                    res.status(401).json({ 'message': "E-mail ou senha incorretos, tente novamente" })
                }
            } else {
                res.status(401).json({ 'message': "Usuário não encontrado" })
            }
        })
    }
}