const modelCustomer = require('../model/customer')
const commonHelper = require('../helper/common')

let customerController = {

  //Mengambil data customer berdasarkan id
  getAllCustomer: async (req, res) => {
    try {
      const result = await modelCustomer.getAllCustomer();
      commonHelper.response(res, result.rows, 200, "Get all customer successful");
    } catch (error) {
      console.log(error);
    }
  },
  getDetailCustomer: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await modelCustomer.getDetailCustomer(id);
      commonHelper.response(res, result.rows, 200, "Get detail customer successful");
    } catch (error) {
      console.log(error);
    }
  },
  createCustomer: async (req, res) => {
    try {
      const { name, phone_number, email, password, gender, date_of_birth } = req.body;
      const {rows: [count]} = await modelCustomer.countData();
      const id = Number(count.count) + 1;
      let data = {
        id,
        name,
        phone_number,
        email,
        password,
        gender,
        date_of_birth
      }
      modelCustomer.insertCostumer(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Customer added");
      })
      .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  updateCustomer: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const {rowCount} = await modelCustomer.findId(id);
      console.log(rowCount);
      if (!rowCount) {
        return res.json({
          Message : "data not found"
        })
      }

      const { name, phone_number, email, password, gender, date_of_birth } = req.body;
      let data = {
        id,
        name,
        phone_number,
        email,
        password,
        gender,
        date_of_birth
      }
      modelCustomer.updateCustomer(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Customer updated");
      })
      .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCustomer: async(req, res) => {
    try {
      const id = Number(req.params.id);
      const {rowCount} = await modelCustomer.findId(id);
      if (!rowCount) {
        return res.json({
          Message : "data not found"
        })
      }
      modelCustomer.deleteCustomer(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Customer deleted");
      })
      .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
}

module.exports = customerController;