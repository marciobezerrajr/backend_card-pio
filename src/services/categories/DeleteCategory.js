const Category = require('../../models/Category')
const dropImage = require('../../utils/DropFile')

module.exports = class DeleteCategory {

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