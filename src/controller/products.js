/* eslint-disable no-undef */
const modelProduct = require('../model/products')
const commonHelper = require('../helper/common')

let productController = {
  getAllProduct: async(req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      let sortBY = req.query.sortBY || "name";
      let sort = req.query.sort || 'ASC';
      let searchParam = req.query.search || "";
      const result = await modelProduct.selectAllProduct(limit, offset, searchParam,sortBY,sort);
      const {
        rows: [count],
      } = await modelProduct.countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(res , result.rows, 200, "get data success",pagination);
    } catch (error) {
      console.log(error);
    }
  },
  getDetailProduct: async(req, res) => {
    const id = Number(req.params.id);
    const {rowCount} = await modelProduct.findId(id);
    if (!rowCount) {
      return res.json({
        Message : "data not found"
      })
    }
    modelProduct.selectProduct(id)
    .then((result) => {
      commonHelper.response(res, result.rows[0], 200, "get data success");
    })
    .catch((err) => res.send(err));
  },
  createProduct: async(req, res) => {
    const { name, price, stock } = req.body;
    const {rows: [count]} = await modelProduct.countData();    
    const id = Number(count.count) + 1;
    let data = {
      id,
      name,
      price,
      stock,
    };
    modelProduct.insertProduct(data)
    .then((result) => {
      commonHelper.response(res, result.rows, 201, "Product created");
    })
    .catch((err) => res.send(err));
  },
  updateProduct: async(req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, price, stock } = req.body;
        const {rowCount} = await modelProduct.findId(id);
        if (!rowCount) {
          return res.json({
            Message : "data not found"
          })
        }
        let data = {
          id,
          name,
          price,
          stock,
        };
        modelProduct.updateProduct(data)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "Product updated");
        })
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async(req, res) => {
    try {
      const id = Number(req.params.id);
      const {rowCount} = await modelProduct.findId(id);
      if (!rowCount) {
        return res.json({
          Message : "data not found"
        })
      }
      modelProduct.deleteProduct(id)
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
