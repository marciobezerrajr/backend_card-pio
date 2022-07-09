const createSnack = require('../services/snacks/CreateSnack')
const deleteSnack = require('../services/snacks/DeleteSnack')
const getAllSnacks = require('../services/snacks/GetAllSnacks')
const getOneSnack = require('../services/snacks/GetOneSnack')
const updateSnack = require('../services/snacks/UpdateSnack')

module.exports = new class snackController {

    async create(req, res) {
        const snack = new createSnack()
        await snack.create(req, res)
    }

    async update(req, res) {
        const snack = new updateSnack()
        await snack.update(req, res)
    }

    async select(req, res) {
        const snack = new getOneSnack()
        await snack.select(req, res)
    }

    async selectAll(req, res) {
        const snack = new getAllSnacks()
        await snack.selectAll(req, res)
    }

    async delete(req, res) {
        const snack = new deleteSnack()
        await snack.delete(req, res)
    }
}

