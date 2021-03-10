const route = require('express').Router()
const Controllers = require('../controller/Controllers')
route.get('/products', Controllers.getProduct)
route.get('/categories', Controllers.getCategories)
route.post('/add', Controllers.addProduct)
route.put('/edit/:id', Controllers.editProduct)
route.delete('/delete/:id', Controllers.deleteProduct)

module.exports = route