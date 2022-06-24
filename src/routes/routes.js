const router = require('express').Router()
const userController = require('../controllers/userController');
const snackController = require('../controllers/snackController');
const categoryController = require('../controllers/categoryController');
const imageController = require('../controllers/imageController');
//const router = express.Router();

//--------------- Category Routes ---------------

router.get('/categories', categoryController.selectAll) //router select all category
router.get('/categories/:id', categoryController.select) //router select one category
router.post('/categories', categoryController.create) //router add category
router.delete('/categories/:id', categoryController.delete) //router remove category
router.put('/categories/:id', categoryController.update) //router update category

router.get('/categoryicon', imageController.selectAll) //router to get category icons
router.get('/categoryicon/:id', imageController.get) //router to get one category icon
router.post('/categoryicon', imageController.Create) //router add category icon 
router.delete('/categoryicon/:id', imageController.Delete) //router remove category icon
router.put('/categoryicon/:id', imageController.updateIcon) //router update category icon

//--------------- Snacks Routes ---------------

router.get('/snacks', snackController.selectAll) // select all snacks
router.get('/snacks/:id', snackController.select) // select one snack
router.post('/snacks', snackController.create) // insert snack
router.put('/snacks/:id', snackController.update) // update one snack
router.put('/snacks/:id', snackController.updateAll) // update all snack
router.delete('/snacks/:id',  snackController.delete) //remove snack

router.get('/snackimage', imageController.selectAll) //router to get all snack images
router.get('/snackimage/:id', imageController.get) //router to get one snack image
router.post('/snackimage', imageController.Create) //router add snack image
router.delete('/snackimage/:id', imageController.Delete) //router remove snack image
router.put('/snackimage/:id', imageController.updateIcon) //router update snack image

//--------------- User Routes ---------------

router.post('/register', userController.create) //register
router.post('/auth', userController.login); //user login
router.get('/logout', userController.logout) //logout
router.get('/recoverpassword/:id', userController.recoverPassword)  //forget password
router.post('/changepassword/:id', userController.changePassword) //alter password
router.post('/select/:id', userController.select) //select one user
router.post('/selectAll', userController.selectAll) //select all users

module.exports = router