const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const snackController = require('../controllers/snackController');

const upload = require('multer')
const multerConfig = require ('../middlewares/multer')

//--------------- Category Routes ---------------

router.get('/categories', categoryController.selectAll) //router select all category
router.get('/categories/:id', categoryController.select) //router select one category
router.post('/categories', upload(multerConfig).single('image'), categoryController.create) //router add category  upload(multerConfig).single('image')
router.put('/categories', upload(multerConfig).single('image'), categoryController.update) //router update category  upload(multerConfig).single('image')
router.delete('/categories', categoryController.delete) //router remove category

//--------------- Snacks Routes ---------------

router.get('/snacks', snackController.selectAll) // select all snacks
router.get('/snacks/:id', snackController.select) // select one snack
router.post('/snacks', upload(multerConfig).single('image'), snackController.create) // insert snack
router.put('/snacks', upload(multerConfig).single('image'), snackController.update) // update one snack
router.delete('/snacks', snackController.delete) //remove snack

//--------------- User Routes ---------------

router.post('/users', userController.create) //register
router.get('/users/:id', userController.select) //select one user
router.get('/users', userController.selectAll) //select all users
router.put('/users', userController.update) //select all users
router.delete('/users', userController.delete) //select all users

router.post('/auth', userController.login); //user login
router.get('/logout', userController.logout) //logout
router.get('/forgotpassword/:id', userController.forgotPassword)  //forgot password
router.put('/changepassword', userController.changePassword) //alter password

module.exports = router