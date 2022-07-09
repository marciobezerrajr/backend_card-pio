const nodemailer = require('../../config/nodemailer')
const User = require('../../models/User')

module.exports = class ForgotPassword {

    async forgotPassword(req, res) {
        const { email } = req.body

        User.findOne({ email }).then((user) => {
            try {
                nodemailer.main().catch(console.error) //falta configurar o e-mail e link de recuperação
                res.status(200).json({ 'message': 'Um e-mail de recuperação será enviado para sua caixa postal, por favor, verifique também a caixa de Spam!' })
            } catch (err) {
                console.log(err)
            }
        }).catch((err) => {
            res.status(401).json({ 'message': 'Nenhuma conta com este e-mail foi encontrada ' })
        })
    }
}