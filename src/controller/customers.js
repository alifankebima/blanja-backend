//Controller for customers
const modelCustomers = require('../model/customers');
const commonHelper = require('../helper/common');

let customerController = {

  //Get all customer
  getAllCustomer: async (req, res) => {
    try {
      //Pagination
      const limit = Number(req.query.limit) || 5;
      const page = Number(req.query.page) || 1;
      const { rows: [count] } = await modelCustomers.countData();
      const totalData = Number(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = { currentPage: page, limit, totalData, totalPage };

      //getAllCustomer response
      const result = await modelCustomers.selectAllCustomer();
      commonHelper.response(res, result.rows, 200, "Get all customer successful", pagination);
    } catch (error) {
      res.send(error);
    }
  },

  //Get customer with specified id
  getDetailCustomer: async (req, res) => {
    try {
      //Checks if specified id exists
      const id = Number(req.params.id);
      const { rowCount } = await modelCustomers.findId(id);
      if (!rowCount) return res.json({ Message: "Customer not found" });

      //getDetailCustomer response
      const result = await modelCustomers.selectCustomer(id);
      commonHelper.response(res, result.rows[0], 200, "Get detail customer successful");
    } catch (error) {
      res.send(error);
    }
  },

  //Create customer
  createCustomer: async (req, res) => {
    try {
      //Request body
      const data = req.body;

      //Count the number of records in products table to find out the next id value
      const {rows: [count]} = await modelCustomers.countData();
      const id = Number(count.count) + 1;
      data["id"] = id;

      //createCustomer response
      const result = await modelCustomers.insertCostumer(data);
      commonHelper.response(res, result.rows, 201, "Customer added");
    } catch (error) {
      res.send(error);
    }
  },

  //Update customer
  updateCustomer: async (req, res) => {
    try {
      //Request body
      const data = req.body;

      //Checks if specified id exists
      const id = Number(req.params.id);
      const {rowCount} = await modelCustomers.findId(id);
      if (!rowCount) return res.json({ Message : "data not found" });

      //updateCustomer response
      data["id"] = id;
      const result = await modelCustomers.updateCustomer(data);
      commonHelper.response(res, result.rows, 201, "Customer updated");
    } catch (error) {
      res.send(error);
    }
  },

  //Delete customer
  deleteCustomer: async(req, res) => {
    try {
      //Checks if specified id exists
      const id = Number(req.params.id);
      const {rowCount} = await modelCustomers.findId(id);
      if (!rowCount) return res.json({ Message : "data not found" });
      
      //deleteProduct response
      const result = await modelCustomers.deleteCustomer(id);
      commonHelper.response(res, result.rows, 200, "Product deleted");
    } catch (error) {
      res.send(error);
    }
  },
}

module.exports = customerController;