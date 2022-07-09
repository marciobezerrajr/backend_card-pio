const Snack = require('../../models/Snack')
const dropImage = require('../../utils/DropFile')

module.exports = class CreateSnack {

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
}