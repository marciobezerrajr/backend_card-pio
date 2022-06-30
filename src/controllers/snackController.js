const Snack = require('../models/Snack')
const Category = require('../models/Category')
const dropImage = require('../utils/DropFile')

module.exports = new class snackController {

    async create(req, res) {
        const { category, value, description, name } = req.body
        const image = req.file.key

        const newSnack = { category, value, description, name, image }

        function isEmpty(object) {
            return Object.keys(object).length === 0
        }

        if (isEmpty(newSnack)) {
            res.status(401).json({ "message": `inválido` })
            dropImage.Drop(image)
            return;
        }

        const snackExists = await Snack.findOne({ name });

        if (snackExists != null) {
            res.status(401).json({ "message": "Já existe um lanche com este nome." })
            dropImage.Drop(image)
        }
        else {
            try {
                Snack.create(newSnack).then(() => {
                    res.status(200).json({ "message": "Lanche inserido com sucesso!" })
                }).catch((err) => {
                    res.status(404).json({ "message": err })
                    dropImage.Drop(image)
                })
            } catch (err) {
                res.status(500).json({ error: err })
                dropImage.Drop(image)
            }
        }
    }
    async update(req, res) {

        const { id, category, value, description, name } = req.body
        const image = req.file.image

        Snack.findOne({ _id: id }).then(async (snack) => {
            const oldImage = snack.image
            
            snack.category = category ? category : snack.category
            snack.value = value ? value : snack.value,
            snack.description = description ? description : snack.description
            snack.name = name ? name : snack.name
            snack.image = image ? image : snack.image
           
            snack.save().then(() => {
                console.log('Lanche editada com sucesso!')
                res.status(200).json({ "message": 'Lanche editado com sucesso!' })
                dropImage.Drop(oldImage)

            }).catch((err) => {
                console.log("Erro ao salvar as alterações, " + err)
                res.status(404).json({ "message": "Não foi possível salvar as alterações" })
                dropImage.Drop(image)

            })
        }).catch((err) => {
            console.log("Lanche não encontrado, verifique novamente, " + err)
            res.status(404).json({ "message": "Não foi possível salvar as alterações" })
            dropImage.Drop(image)
        })
    }
    async select(req, res) {
        const id = req.params.id

        Snack.findOne({ _id: id }).then(snacks => { //.populate('snack')
            res.send(snacks)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
    async selectAll(req, res) {
        Snack.find().then(snacks => { //.populate('snack')
            res.send(snacks)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição,\n ' + err)
        })
    }
    async delete(req, res) {
        Snack.findById({ _id: req.body.id }).then((snack) => {
            const image = snack.image

            Snack.deleteOne({ _id: req.body.id }).then((snacks) => {
                try {
                    dropImage.Drop(image)
                    res.status(200).json({ "message": "Categoria deletada com sucesso!" })
                    return

                } catch (err) {
                    res.status(404).json({ "message": "Houve um erro ao tentar excluir esta categoria, por favor tente novamente mais tarde\n" + err })
                }
            }).catch((err) => {
                res.status(404).json({ "message": "Houve um erro ao tentar excluir esta categoria, por favor tente novamente mais tarde\n" + err })
            })
        }).catch((err) => {
            res.status(404).json({ "message": "Houve um erro ao tentar excluir esta categoria, por favor tente novamente mais tarde\n" + err })

        })
    }
}

