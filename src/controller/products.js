const { v4: uuidv4 } = require('uuid');
const googleDrive = require('../config/googleDrive');
const modelProducts = require('../model/products');
const commonHelper = require('../helper/common');

const productController = {

  createProduct: async (req, res) => {
    try {
      const data = req.body;
      data.id = uuidv4();

      // Google drive
      const uploadResult = await googleDrive.uploadImage(req.file)
      const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
      data.photo = parentPath.concat(uploadResult.id)
      // const HOST = process.env.RAILWAY_STATIC_URL || 'localhost';
      // data.photo = `http://${HOST}/img/${req.file.filename}`;

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
      if (!result.rows[0]) return res.json({ message: "No product found" });

      //Pagination info
      const { rows: [count] } = await modelProducts.countData();
      const totalData = Number(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = { currentPage: page, limit, totalData, totalPage };

      commonHelper.response(res, result.rows, 200, "Get all products successful", pagination);
    } catch (error) {
      if (error.name == "error") return res.json({ message: "Incorrect parameter query" });
      res.send(error);
    }
  },

  getDetailProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { rowCount } = await modelProducts.findId(id);
      if (!rowCount) return res.json({ message: "Product not found" });

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
      const oldProduct = await modelProducts.selectProduct(id);
      if (!oldProduct.rowCount) return res.json({ message: "Product not found" });
      const data = req.body;
      console.log(data)
      data.id = id;
      // Google drive
      if (req.file) {
        const oldImage = oldProduct.rows[0].photo;
        const oldImageId = oldImage.split("=")[1];
        const updateResult = await googleDrive.updateImage(req.file, oldImageId)
        const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
        data.photo = parentPath.concat(updateResult.id)
      }
      // const HOST = process.env.RAILWAY_STATIC_URL || 'localhost';
      // data.photo = `http://${HOST}/img/${req.file.filename}`;

      const result = await modelProducts.updateProduct(data);
      commonHelper.response(res, result.rows, 200, "Product updated");
    } catch (error) {
      res.send(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      
      const id = req.params.id;
      const oldProduct = await modelProducts.selectProduct(id);
      if (!oldProduct.rowCount) return res.json({ message: "Product not found" });
      // console.log(oldProduct.rows[0].photo === null);
      if (oldProduct.rows[0].photo != "null") {
        const oldPhoto = oldProduct.rows[0].photo;
        const oldPhotoId = oldPhoto.split("=")[1];
        await googleDrive.deleteImage(oldPhotoId);
      }
      

      const result = await modelProducts.deleteProduct(id);

      commonHelper.response(res, result.rows, 200, "Product deleted");
    } catch (error) {
      res.send(error);
    }
  },
}

module.exports = productController;