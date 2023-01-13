//Controller for products
const modelProducts = require('../model/products');
const commonHelper = require('../helper/common');

const productController = {

  //Get all products, filter query with parameter queries when available
  getAllProduct: async (req, res) => {
    try {
      //Parameter queries
      const searchParam = req.query.search || '';
      const sortBy = req.query.sortBy || 'name';
      const sort = req.query.sort || 'ASC';
      const limit = Number(req.query.limit) || 5;
      const page = Number(req.query.page) || 1;
      const offset = (page - 1) * limit;
      const result = await modelProducts.selectAllProduct(searchParam, sortBy, sort, limit, offset);
      if (!result.rows[0]) return res.json({ Message: "No product found" });

      //Pagination
      const { rows: [count] } = await modelProducts.countData();
      const totalData = Number(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = { currentPage: page, limit, totalData, totalPage };

      //getAllProducts response
      commonHelper.response(res, result.rows, 200, "Get all product successful", pagination);
    } catch (error) {
      if (error.name == "error") return res.json({ Message: "Incorrect parameter query" });
      res.send(error);
    }
  },

  //Get product with specified id
  getDetailProduct: async (req, res) => {
    try {
      //Checks if specified id exists
      const id = Number(req.params.id);
      const { rowCount } = await modelProducts.findId(id);
      if (!rowCount) return res.json({ Message: "Product not found" });

      //getDetailProduct response
      const result = await modelProducts.selectProduct(id);
      commonHelper.response(res, result.rows[0], 200, "Get product successful");
    } catch (error) {
      res.send(error);
    }
  },

  //Create product
  createProduct: async (req, res) => {
    try {
      //Request body
      const data = req.body;

      //Count the number of records in products table to find out the next id value
      const { rows: [count] } = await modelProducts.countData();
      const id = Number(count.count) + 1;
      data["id"] = id;

      //createProduct response
      const result = await modelProducts.insertProduct(data);
      commonHelper.response(res, result.rows, 201, "Product created");
    } catch (error) {
      res.send(error);
    }
  },

  //Update a product
  updateProduct: async (req, res) => {
    try {
      //Request body
      const data = req.body;

      //Checks if specified id exists
      const id = Number(req.params.id);
      const { rowCount } = await modelProducts.findId(id);
      if (!rowCount) return res.json({ Message: "Product not found" });

      //updateProduct response
      data["id"] = id;
      const result = await modelProducts.updateProduct(data);
      commonHelper.response(res, result.rows, 200, "Product updated");
    } catch (error) {
      res.send(error);
    }
  },

  //Delete a product
  deleteProduct: async (req, res) => {
    try {
      //Checks if specified id exists
      const id = Number(req.params.id);
      const { rowCount } = await modelProducts.findId(id);
      if (!rowCount) return res.json({ Message: "Product not found" });
      
      //deleteProduct response
      const result = await modelProducts.deleteProduct(id);
      commonHelper.response(res, result.rows, 200, "Product deleted");
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = productController;