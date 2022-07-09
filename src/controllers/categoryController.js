const createCategory = require('../services/categories/CreateCategory')
const deleteCategory = require('../services/categories/DeleteCategory')
const getAllCategories = require('../services/categories/GetAllCategories')
const getOneCategory = require('../services/categories/GetOneCategory')
const updateCategory = require('../services/categories/UpdateCategory')

module.exports = new class categoryController {

    async create(req, res) {
        const category = new createCategory()
        await category.create(req, res)
    }

    async update(req, res) {
        const category = new updateCategory()
        await category.update(req, res)
    }

    async select(req, res) {
        const category = new getOneCategory()
        await category.select(req, res)
    }

    async selectAll(req, res) {
        const category = new getAllCategories()
        await category.selectAll(req, res)
    }
    
    async delete(req, res) {
        const category = new deleteCategory()
        await category.delete(req, res)
    }
}
