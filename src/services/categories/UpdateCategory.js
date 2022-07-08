const Category = require('../../models/Category')
const dropImage = require('../../utils/DropFile')

module.exports = class UpdateCategory{

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
}