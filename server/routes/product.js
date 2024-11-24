const router = require('express').Router()
const {createProduct, getProducts, getRecentProducts, searchProductsByName, getProductById, getProductsByCategoryId, getProductsByUserId, filterProducts, updateProduct, deleteProduct} = require('../controllers/product')

router.post('/create', createProduct)

router.get('/all', getProducts)

router.get('/recents', getRecentProducts)

router.get('/search', searchProductsByName)

router.get('/sort', filterProducts)

router.get('/details/:id', getProductById)

router.get('/category/:id', getProductsByCategoryId)

router.get('/user/:id', getProductsByUserId)

router.put('/update/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router