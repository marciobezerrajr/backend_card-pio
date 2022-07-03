const User = require('../models/User')
const bcrypt = require('bcryptjs')
const nodemailer = require('../services/nodemailer')

class UserController {

    async selectAll(req, res) {
        User.find().then((users) => {
            res.send(users)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
    async select(req, res) {
        User.findOne({ _id: req.params.id }).then((user) => {
            res.send(user)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
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
                    // res.redirect('/')
                }).catch((err) => {
                    res.status(403).json({ 'message': "Erro ao processar essa requisição" })
                    console.log(err)
                })
            } else {
                res.status(401).json({ 'message': "Já existe um cadastro com este e-mail" })
            }
        })
    }
    async update(req, res) {
        const { id, name, email, password, isAdmin } = req.body

        User.findOne({ _id: id }).then(async (user) => {

            user.name = name ? name : user.name
            user.email = email ? email : user.email,
                user.password = password ? password : user.password
            user.isAdmin = isAdmin ? isAdmin : user.isAdmin

            user.save().then(() => {
                console.log('Usuário editado com sucesso!')
                res.status(200).json({ "message": 'Usuário editado com sucesso!' })

            }).catch((err) => {
                console.log("Erro ao salvar as alterações, " + err)
                res.status(404).json({ "message": "Não foi possível salvar as alterações" })
            })
        }).catch((err) => {
            console.log("Lanche não encontrado, verifique novamente, " + err)
            res.status(404).json({ "message": "Não foi possível salvar as alterações" })
        })
    }
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

    async forgotPassword(req, res) {
        const { email } = req.body

        User.findOne({ email }).then((user) => {
            try {
                nodemailer.main().catch(console.error)
                res.status(200).json({ 'message': 'Um e-mail de recuperação será enviado para sua caixa postal, por favor, verifique também a caixa de Spam!' })
            } catch (err) {
                console.log(err)
            }
        }).catch((err) => {
            res.status(401).json({ 'message': 'Nenhuma conta com este e-mail foi encontrada ' })
        })
    }

    async changePassword(req, res) {
        const { email, password, confirmPassword } = req.body

        if (password === confirmPassword) {

            User.findOne({ email }).then((user) => {
                user.password = password
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

    async logout(req, res) {
        req.session.destroy(function (err) { })
        res.redirect('/')
    }

}

module.exports = new UserController()