const User = require('../../models/User')
const bcrypt = require('bcryptjs')
                
module.exports = class UpdateUser {
    
    async update(req, res) {
        const { id, name, email, password, isAdmin } = req.body
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        User.findOne({ _id: id }).then(async (user) => {

            user.name = name ? name : user.name
            user.email = email ? email : user.email,
            user.password = password ? hash : user.password
            user.isAdmin = isAdmin ? isAdmin : user.isAdmin

            user.save().then(() => {
                console.log('Usuário editado com sucesso!')
                res.status(200).json({ "message": 'Usuário editado com sucesso!' })

            }).catch((err) => {
                console.log("Erro ao salvar as alterações, " + err)
                res.status(404).json({ "message": "Não foi possível salvar as alterações" })
            })

        }).catch((err) => {
            res.status(404).json({ "message": "Usuário não encontrado" })
        })
    }
}
