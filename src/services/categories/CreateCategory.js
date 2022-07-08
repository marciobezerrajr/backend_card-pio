const Category = require('../../models/Category')
const dropImage = require('../../utils/DropFile')

module.exports = class CreateCategory {

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
}