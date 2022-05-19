const express = require('express');
const userController = require('../controllers/userController');
const snackController = require('../controllers/snackController');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

//--------------- Category Routes ---------------

router.get('/category', categoryController.selectAll) //router select all category
router.get('/category/:id', categoryController.select) //router select one category
router.post('/category', categoryController.create) //router add category
router.delete('/category/:id', categoryController.delete) //router remove category
router.put('/category/:id', categoryController.update) //router update category

//--------------- Snacks Routes ---------------

router.get('/snack', snackController.selectAll) // select all snacks
router.get('/snack/:id', snackController.select) // select one snack
router.post('/snack', snackController.create) // insert snack
router.put('/snack/:id', snackController.update) // update one snack
router.put('/snack/:id', snackController.updateAll) // update all snack
router.delete('/snack/:id',  snackController.delete) //remove snack

//--------------- User Routes ---------------

router.post('/register', userController.create) //register
router.post('/auth', userController.login); //user login
router.get('/logout', userController.logout) //logout
router.get('/recoverpassword/:id', userController.recoverPassword)  //forget password
router.post('/changepassword/:id', userController.changePassword) //alter password
router.post('/select/:id', userController.select) //select one user
router.post('/selectAll', userController.selectAll) //select all users

module.exports = router