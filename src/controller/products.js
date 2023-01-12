/* eslint-disable no-undef */
//Controller for products
const modelProducts = require('../model/products')
const commonHelper = require('../helper/common')

let productController = {

  //Get all products, filter query with get parameter queries when available
  getAllProduct: async(req, res) => {
    try {
      //Parameter queries
      let searchParam = req.query.search || "";
      let sortBy = req.query.sortBY || "name";
      let sort = req.query.sort || 'ASC';
      const limit = Number(req.query.limit) || 5;
      const page = Number(req.query.page) || 1;
      const offset = (page - 1) * limit;
      const result = await modelProducts.selectAllProduct(searchParam, sortBy, sort, limit, offset);
      
      //Pagination
      const {rows: [count]} = await modelProducts.countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData,
        totalPage,
      };

      //GetAllProduct response
      commonHelper.response(res , result.rows, 200, "Get data successful",pagination);
    } catch (error) {
      console.log(error);
    }
  },

  //Get product with a specified id
  getDetailProduct: async(req, res) => {
    //Parameter id query
    const id = Number(req.params.id);
    
    //Find id in products
    try {
      const {rowCount} = await modelProducts.findId(id);
      if (!rowCount) {
        return res.json({
          Message : "data not found"
        })
      }
    } catch (error) {
      console.log(error);
    }
    modelProducts.selectProduct(id)
    .then((result) => {
      commonHelper.response(res, result.rows[0], 200, "Get data successful");
    })
    .catch((err) => res.send(err));
  },

  //create a product
  createProduct: async(req, res) => {
    const { name, price, description, stock, rating, color, size, id_category, id_seller } = req.body;
    const {rows: [count]} = await modelProducts.countData();    
    const id = Number(count.count) + 1;
    let data = {
      id,
      name,
      price,
      description,
      stock,
      rating,
      color,
      size,
      id_category,
      id_seller
    };
    modelProducts.insertProduct(data)
    .then((result) => {
      commonHelper.response(res, result.rows, 201, "Product created");
    })
    .catch((err) => res.send(err));
  },

  //update a product
  updateProduct: async(req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, price, description, stock, rating, color, size, id_category, id_seller } = req.body;
        const {rowCount} = await modelProducts.findId(id);
        if (!rowCount) {
          return res.json({
            Message : "data not found"
          })
        }
        let data = {
          id,
          name,
          price,
          description,
          stock,
          rating,
          color,
          size,
          id_category,
          id_seller
        };
        modelProducts.updateProduct(data)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "Product updated");
        })
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  //delete product
  deleteProduct: async(req, res) => {
    try {
      const id = Number(req.params.id);
      const {rowCount} = await modelProducts.findId(id);
      if (!rowCount) {
        return res.json({
          Message : "data not found"
        })
      }
      modelProducts.deleteProduct(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Product deleted");
      })
      .catch((err) => res.send(err));
    } catch (error) {
      console.log();
    }
  },
};

module.exports = productController;
