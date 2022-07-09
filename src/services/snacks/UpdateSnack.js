const Snack = require('../../models/Snack')
const dropImage = require('../../utils/DropFile')

module.exports = class UpdateSnack {

    async update(req, res) {
        const { id, category, value, description, name } = req.body
        var image, oldImage;

        Snack.findOne({ _id: id }).then(async (snack) => {
            if (req.file) {

                oldImage = snack.image
                snack.category = category ? category : snack.category
                snack.value = value ? value : snack.value,
                snack.description = description ? description : snack.description
                snack.name = name ? name : snack.name
                snack.image = req.file.filename

            } else {
                snack.category = category ? category : snack.category
                snack.value = value ? value : snack.value,
                snack.description = description ? description : snack.description
                snack.name = name ? name : snack.name
            }

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
}