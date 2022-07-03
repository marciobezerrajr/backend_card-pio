const Category = require('../models/Category')
const dropImage = require('../utils/DropFile')

module.exports = new class categoryController {

    async create(req, res) {
        const { category } = req.body
        const icon = req.file.key

        const newCategory = {
            category,
            icon
        }

        if (category == undefined || category == "" || category == " ") {
            res.status(400).json({ "message": "A categoria é inválida!" })
            dropImage.Drop(icon)
            return
        }

        const categoryExists = await Category.findOne({ category });

        if (categoryExists != null) {
            res.status(401).json({ "message": "Já existe uma categoria com este nome." })
            dropImage.Drop(icon)
        }
        else {
            try {
                Category.create(newCategory).then(() => {
                    res.status(200).json({ message: "Categoria criada com sucesso!" })
                }).catch((err) => {
                    res.status(404).json({ "message": "Houve um erro ao processar a requisição, tente novamente mais tarde" })
                    dropImage.Drop(icon)
                })
            } catch (err) {
                res.status(500).json({ error: err })
                dropImage.Drop(icon)
            }
        }
    }
    async update(req, res) {
        const id = req.body.id
        const categ = req.body.category
        var icon, oldIcon

        Category.findOne({ _id: id }).then(async (category) => {
            if (req.file) {
                oldIcon = category.icon
                category.category = categ ? categ : category.category
                category.icon = req.file.filename

            } else {
                category.category = categ ? categ : category.category
            }

            category.save().then(() => {
                console.log('Categoria editada com sucesso!')
                res.status(200).json({ "message": 'Categoria editada com sucesso!' })
                dropImage.Drop(oldIcon)

            }).catch((err) => {
                console.log("Erro ao salvar categoria, " + err)
                res.status(404).json({ "message": "Não foi possível salvar a categoria" })
                dropImage.Drop(icon)
            })
        }).catch((err) => {
            console.log("Não foi possível salvar a categoria, " + err)
            res.status(404).json({ "message": "Não foi possível salvar a categoria" })
            dropImage.Drop(icon)
        })
    }
    async select(req, res) {
        Category.findOne({ _id: req.params.id }).then(categories => {
            res.send(categories)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
    async selectAll(req, res) {
        Category.find().then(categories => {
            res.send(categories)
        }).catch((err) => {
            res.send('Houve um erro ao realizar essa requisição, ' + err)
            res.redirect("/")
        })
    }
    async delete(req, res) {
        Category.findById({ _id: req.body.id }).then((category) => {
            const icon = category.icon

            Category.deleteOne({ _id: req.body.id }).then((categories) => {
                try {
                    dropImage.Drop(icon)
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
