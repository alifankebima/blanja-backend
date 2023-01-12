const modelSeller = require('../model/seller')
const commonHelper = require('../helper/common')

let sellerController = {

  //Mengambil data seller berdasarkan id
  getAllSeller: async (req, res) => {
    try {
      const result = await modelSeller.getAllSeller();
      commonHelper.response(res, result.rows, 200, "Get all seller successful");
    } catch (error) {
      console.log(error);
    }
  },
  getDetailSeller: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await modelSeller.getDetailSeller(id);
      commonHelper.response(res, result.rows, 200, "Get detail seller successful");
    } catch (error) {
      console.log(error);
    }
  },
  createSeller: async (req, res) => {
    try {
      const { name, phone_number, email, password, gender, date_of_birth, store_name, store_description } = req.body;
      const {rows: [count]} = await modelSeller.countData();
      const id = Number(count.count) + 1;
      let data = {
        id,
        name,
        phone_number,
        email,
        password,
        gender,
        date_of_birth,
        store_name,
        store_description
      }
      modelSeller.insertSeller(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "seller added");
      })
      .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  updateSeller: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const {rowCount} = await modelSeller.findId(id);
      console.log(rowCount);
      if (!rowCount) {
        return res.json({
          Message : "data not found"
        })
      }

      const { name, phone_number, email, password, gender, date_of_birth, store_name, store_description } = req.body;
      let data = {
        id,
        name,
        phone_number,
        email,
        password,
        gender,
        date_of_birth,
        store_name,
        store_description
      }
      modelSeller.updateSeller(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "seller updated");
      })
      .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteSeller: async(req, res) => {
    try {
      const id = Number(req.params.id);
      const {rowCount} = await modelSeller.findId(id);
      if (!rowCount) {
        return res.json({
          Message : "data not found"
        })
      }
      modelSeller.deleteSeller(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "seller deleted");
      })
      .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
}

module.exports = sellerController;