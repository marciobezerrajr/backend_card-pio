const bcrypt = require('bcryptjs')

module.exports = class ChangePassword {

    async changePassword(req, res) {
        const { email, password, confirmPassword } = req.body

        if (password === confirmPassword) {

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            User.findOne({ email }).then((user) => {
                user.password = hash
                user.save().then(() => {
                    res.status(200).json({ "message": 'Senha alterada com sucesso!' })

                }).catch((err) => {
                    res.status(404).json({ "message": "Houve um erro ao salvar as alterações, tente novamente mais tarde!" })
                })
            }).catch((err) => {
                res.status(404).json({ "message": "Erro, usuário não encontrado!" })
            })

        } else {
            res.status(401).json({ 'message': 'A senha e confirmação de senha não conferem, por favor preencha corretamente!' })
        }
    }
}