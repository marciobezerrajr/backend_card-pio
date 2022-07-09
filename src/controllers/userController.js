const createUser = require('../services/users/CreateUser')
const updateUser = require('../services/users/UpdateUser')
const getOneUser = require('../services/users/GetOneUser')
const getAllUsers = require('../services/users/GetAllUsers')
const deleteUser = require('../services/users/DeleteUser')

module.exports = new class UserController {

    async create(req, res) {
        const user = new createUser()
        await user.create(req, res)
    }

    async update(req, res) {
        const user = new updateUser()
        await user.update(req, res)
    }

    async select(req, res) {
        const user = new getOneUser()
        await user.select(req, res)
    }

    async selectAll(req, res) {
        const user = new getAllUsers()
        await user.selectAll(req, res)
    }

    async delete(req, res) {
        const user = new deleteUser()
        await user.delete(req, res)
    }
}
