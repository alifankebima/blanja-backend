const { v4: uuidv4 } = require('uuid');

const modelProducts = require('../model/products');
const commonHelper = require('../helper/common');

const productController = {

  createProduct: async (req, res) => {
    try {
      const data = req.body;
      data.id = uuidv4();
      const HOST = process.env.HOST || 'localhost';
      const PORT = process.env.PORT || 5000;
      data.photo = `http://${HOST}:${PORT}/img/${req.file.filename}`;

      const result = await modelProducts.insertProduct(data);
      commonHelper.response(res, result.rows, 200, "Product created");
    } catch (error) {
      res.send(error);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      //Search and pagination query
      const searchParam = req.query.search || '';
      const sortBy = req.query.sortBy || 'name';
      const sort = req.query.sort || 'ASC';
      const limit = Number(req.query.limit) || 5;
      const page = Number(req.query.page) || 1;
      const offset = (page - 1) * limit;

      const result = await modelProducts.selectAllProduct(searchParam, sortBy, sort, limit, offset);
      if (!result.rows[0]) return res.json({ Message: "No product found" });

      //Pagination info
      const { rows: [count] } = await modelProducts.countData();
      const totalData = Number(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = { currentPage: page, limit, totalData, totalPage };

      commonHelper.response(res, result.rows, 200, "Get all products successful", pagination);
    } catch (error) {
      if (error.name == "error") return res.json({ Message: "Incorrect parameter query" });
      res.send(error);
    }
  },

  getDetailProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { rowCount } = await modelProducts.findId(id);
      if (!rowCount) return res.json({ Message: "Product not found" });

      const result = await modelProducts.selectProduct(id);
      commonHelper.response(res, result.rows[0], 200, "Get product successful");
      //client.setEx(`products/${id}`, 60 * 60, JSON.stringify(result.rows));
    } catch (error) {
      res.send(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { rowCount } = await modelProducts.findId(id);
      if (!rowCount) return res.json({ Message: "Product not found" });

      const data = req.body;
      data.id = id;
      const HOST = process.env.HOST || 'localhost';
      const PORT = process.env.PORT || 5000;
      data.photo = `http://${HOST}:${PORT}/img/${req.file.filename}`;

      const result = await modelProducts.updateProduct(data);
      commonHelper.response(res, result.rows, 200, "Product updated");
    } catch (error) {
      res.send(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { rowCount } = await modelProducts.findId(id);
      if (!rowCount) return res.json({ Message: "Product not found" });

      const result = await modelProducts.deleteProduct(id);
      commonHelper.response(res, result.rows, 200, "Product deleted");
    } catch (error) {
      res.send(error);
    }
  },
}

module.exports = productController;