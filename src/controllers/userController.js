const User = mongoose.model('user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const Token = require('../models/Token')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const secret = "ghfdhdgfk,g2hgf124h53df1gsdf4"

class UserController {
    async selectAll(req, res) {
        User.find().populate("user").sort({_id: "asc"}).then(() => {
            
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }

    async select(req, res) {
        const id = req.params.id
        const user = await User.findByID(id)

        if (user == undefined) {
            res.status(404)
            res.json({})
        } else {
            res.json(user)
        }
    }

    async create(req, res) { // create
        var { email, name, password } = req.body;

        if (email == undefined || email == "" || email == " ") {
            res.status(400);
            res.json({ err: "O e-mail é inválido!" })
            return;
        }
        var emailExists = await User.findEmail(email);

        if (emailExists) {
            res.status(406);
            res.json({ err: "O e-mail já está cadastrado!" })
            return;
        }
        await User.new(email, password, name);

        res.status(200);
        res.send("Usuário cadastrado");
    }

    async update(req, res) {

        const { id, name, role, email } = req.body

        const result = await User.update(id, name, email, role)

        if (result != undefined) {
            if (result.status) {
                res.status(200)
                res.send("Tudo OK")
            } else {
                res.status(406)
                res.send(result.err)
            }
        } else {
            res.status(406)
            res.send("Ocorreu um erro no servidor")
        }
    }

    async delete(req, res) {
        var id = req.params.id

        const result = await User.delete(id)

        if (result.status) {
            res.status(200)
            res.send("Tudo ok")
        } else {
            res.status(406)
            res.send(result.err)
        }
    }

    async recoverPassword(req, res) {
        const email = req.body.email
        const result = await Token.create(email)
        const token = (result.token).toString()

        if(result.status){
            res.send(token)
            res.status(200)
        } else {
            res.status(406)
            res.send(result.err)
        }
    }

    async changePassword(req, res){
        const token = req.body.token
        const password = req.body.password
        const passwordString = password.toString()

        try {
            const tokenIsValid = await Token.validate(token) 
            
            if(tokenIsValid.status){
                await User.changePassword(passwordString, tokenIsValid.token.user_id, tokenIsValid.token.token)

                res.status(200)
                res.send("Senha Alterada com Sucesso")
            } else {
                res.status(406)
                res.send("Este Token é inválido")
            }
        } catch (error) {
            res.status(406)
            res.send("Houve um erro na solicitação")
        }
    }

    async login(req,res){
        const {email, password} = req.body

        const user = await User.findByEmail(email)

        if(user != undefined){
            const result = await bcrypt.compare(password+'', user.password)
            if(result){

                const token = jwt.sign({email: user.email, role: user.role}, secret)
                res.status(200)
                res.json({token: token})
            } else {
                res.status(406)
                res.json({err: "Senha incorreta"})
                //res.send('Senha incorreta')
            }
        } else {
            res.status(406)
            res.send({status: false, err: "O usuário não existe"})
        }
    }
}

module.exports = new UserController()