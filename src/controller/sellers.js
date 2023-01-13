//Controller for sellers
const modelSellers = require('../model/sellers');
const commonHelper = require('../helper/common');

let sellerController = {

  //Get all seller
  getAllSeller: async (req, res) => {
    try {
      //Pagination
      const limit = Number(req.query.limit) || 5;
      const page = Number(req.query.page) || 1;
      const { rows: [count] } = await modelSellers.countData();
      const totalData = Number(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = { currentPage: page, limit, totalData, totalPage };

      //getAllSeller response
      const result = await modelSellers.getAllSeller();
      commonHelper.response(res, result.rows, 200, "Get all seller successful", pagination);
    } catch (error) {
      res.send(error);
    }
  },

  //Get seller with specified id
  getDetailSeller: async (req, res) => {
    try {
      //Checks if specified id exists
      const id = Number(req.params.id);
      const { rowCount } = await modelSellers.findId(id);
      if (!rowCount) return res.json({ Message: "Seller not found" });

      //getDetailSeller response
      const result = await modelSellers.getDetailSeller(id);
      commonHelper.response(res, result.rows[0], 200, "Get detail seller successful");
    } catch (error) {
      res.send(error);
    }
  },

  //Create seller
  createSeller: async (req, res) => {
    try {
      //Request body
      const data = req.body;

      //Count the number of records in products table to find out the next id value
      const {rows: [count]} = await modelSellers.countData();
      const id = Number(count.count) + 1;

      //createSeller response
      data["id"] = id;
      const result = modelSellers.insertSeller(data);
      commonHelper.response(res, result.rows, 201, "seller added");
    } catch (error) {
      res.send(error);
    }
  },

  //Update seller
  updateSeller: async (req, res) => {
    try {
      //Request body
      const data = req.body;
      
      //Checks if specified id exists
      const id = Number(req.params.id);
      const {rowCount} = await modelSellers.findId(id);
      if (!rowCount) return res.json({ Message : "data not found" });

      //updateSeller response
      data["id"] = id;
      const result = await modelSellers.updateSeller(data);
      commonHelper.response(res, result.rows, 201, "seller updated");
    } catch (error) {
      res.send(error);
    }
  },

  //Delete seller
  deleteSeller: async(req, res) => {
    try {
      //Checks if specified id exists
      const id = Number(req.params.id);
      const {rowCount} = await modelSellers.findId(id);
      if (!rowCount) return res.json({ Message : "data not found" });

      //deleteSeller response
      const result = modelSellers.deleteSeller(id);
      commonHelper.response(res, result.rows, 200, "seller deleted");
    } catch (error) {
      res.send(error);
    }
  },
}

module.exports = sellerController;