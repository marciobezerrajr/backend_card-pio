const Snack = require('../../models/Snack')
const dropImage = require('../../utils/DropFile')

module.exports = class DeleteSnack {

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