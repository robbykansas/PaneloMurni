const axios = require('axios')
const {Product, Category} = require('../models')
class Controllers{
  static async getProduct(req, res) {
    try {
      const page = req.query.page
      const limit = req.query.limit

      const startIndex = (page - 1)*limit
      const endIndex = page * limit

      const categories = await Category.findAll()
      if (categories.length === 0) {
        const getData = await axios.get('https://portal.panelo.co/paneloresto/api/productlist/18')
        let objCategory = []
        let objProduct = []
        getData.data.products.forEach(category => {
          objCategory.push({
            id: category.id,
            name: category.name,
          })
          category.products.forEach(product => {
            objProduct.push({
              id: product.id,
              title: product.title,
              slug: product.slug,
              price: product.price.price,
              poster: product.preview.content,
              stock: product.stock.stock,
              createdAt: product.created_at,
              updatedAt: product.updated_at,
              CategoryId: category.id
            })
          })
        })
        await Category.bulkCreate(objCategory.map(category => {return category}))
        await Product.bulkCreate(objProduct.map(product => {return product}))
        const databaseProduct = await Product.findAll({
          include: [
            {model: Category}
          ]
        })
        const result = databaseProduct.slice(startIndex, endIndex)
        res.status(200).json(result)
      } else {
        const databaseProduct = await Product.findAll({
          include: [
            {model: Category}
          ]
        })
        const result = databaseProduct.slice(startIndex, endIndex)
        res.status(200).json(result)
        // res.status(200).json(databaseProduct)
      }
    } catch (e) {
      res.status(500).json('internal server error')
    }
  }
  static async getCategories(req, res) {
    try{
      const databaseProduct = await Category.findAll({
        include: [
          {
            model: Product
          }
        ]
      })
      res.status(200).json(databaseProduct)
    } catch (e) {
      res.status(500).json('internal server error')
    }
  }
  static async addProduct(req, res) {
    try{
      const obj = {
        title: req.body.title,
        price: req.body.price,
        poster: req.body.poster,
        stock: req.body.stock,
        CategoryId: req.body.CategoryId
      }
      const add = await Product.create(obj)
      res.status(201).json(add)
    } catch (e) {
      res.status(500).json('internal server error')
    }
  }
  static async editProduct(req, res) {
    try{
      const id = req.params.id
      const obj = {
        title: req.body.title,
        price: req.body.price,
        poster: req.body.poster,
        stock: req.body.stock,
        CategoryId: req.body.CategoryId
      }
      const edit = await Product.update(obj, {
        where: {
          id
        },
        returning: true
      })
      res.status(200).json(edit)
    } catch (e) {
      res.status(500).json('internal server error')
    }
  }
  static async deleteProduct(req, res) {
    try {
      const id = req.params.id
      await Product.destroy({
        where: {
          id
        }
      })
      res.status(200).json('Data deleted successfully')
    } catch (e) {
      res.status(500).json('internal server error')
    }
  }
}

module.exports = Controllers