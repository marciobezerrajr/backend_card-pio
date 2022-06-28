const Snack = require('../models/Snack')
const Category = require('../models/Category')
const dropImage = require('../utils/DropFile')

class snackController {

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
                    res.status(404).json({ "message": "Houve um erro ao processar a requisição, tente novamente mais tarde" })
                    dropImage.Drop(image)
                })
            } catch (err) {
                res.status(500).json({ error: err })
                dropImage.Drop(image)
            }
        }
    }

    async update(req, res) {
        
        const { category, value, description, name } = req.body
        const image = req.file.image
       
        Snack.findOne({ _id: id }).then(async (snack) => {

            const snackExists = await Snack.findOne({ name });

            //ARRUMAR VALIDAÇÃO E UPDATE
            if (snackExists) {
                res.status(401).json({ "message": "Já existe uma categoria com este nome." })
                dropImage.Drop(image)
                return
            }

            snack.snack = categegory,
            snack.image = image
            snack.value = value
            snack.description = description
            snack.name = name

            snack.save().then(() => {
                console.log('Categoria editada com sucesso!')
                res.status(200).json({ "message": 'Categoria editada com sucesso!' })

            }).catch((err) => {
                console.log("Erro ao salvar categoria, " + err)
                res.status(404).json({ "message": "Não foi possível salvar a categoria" })
                dropImage.Drop(image)
            })
        }).catch((err) => {
            console.log("Não foi possível salvar a categoria, " + err)
            res.status(404).json({ "message": "Não foi possível salvar a categoria" })
            dropImage.Drop(image)
        })
    }
    async select(req, res) {
        const id = req.params.id

        Snack.findOne({ _id: id }).populate('snacks').then(snacks => {
            res.send(snacks)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
    async selectAll(req, res) {
        Snack.find().populate('snacks').then(snacks => {
            res.send(snacks)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
    async delete(req, res) {
        Snack.findById({ _id: req.body.id }).then((snack) => {
            const image = snack.image

            Snack.deleteOne({ _id: req.body.id }).then((snacks) => {
                try {
                    dropImage.Drop(image)
                    res.status(200).json({ "message": "Categoria deletada com sucesso!" })
                    console.log("Categoria deletada com sucesso!")
                    return

                } catch (err) {
                    res.status(404).json({ "message": "Houve um erro ao tentar excluir esta categoria, por favor tente novamente mais tarde" })
                    console.log(err)
                }
            }).catch((err) => {
                res.status(404).json({ "message": "Houve um erro ao realizar essa requisição, por favor tente novamente mais tarde" })

            })
        }).catch((err) => {
            res.status(404).json({ "message": "Houve um erro ao realizar essa requisição, por favor tente novamente mais tarde" })

        })
    }
}

module.exports = new snackController()