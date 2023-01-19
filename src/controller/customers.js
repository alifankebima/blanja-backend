const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const modelCustomers = require('../model/customers');
const commonHelper = require('../helper/common');
const authHelper = require('../helper/auth');

let customerController = {

  registerCustomer : async (req, res)=>{
    try {
      const { fullname, email, password, phone_number, gender, date_of_birth } = req.body;
      const {rowCount} = await modelCustomers.findEmail(email);
      if(rowCount) return res.json({ Message: "Email is already used" });
      
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const id = uuidv4();

      let data = { id, email, password: passwordHash, fullname, role: "user", phone_number, gender, date_of_birth };
      const result = await modelCustomers.insertCostumer(data);
      commonHelper.response(res, result.rows, 200, "Register successful");
    } catch (error) {
      res.send(error);
    }
  },

  loginCustomer : async (req, res) => {
    try {
      const { email, password } = req.body;
      const {rows: [user]} = await modelCustomers.findEmail(email);
      if(!user) return res.json({ Message: "Email is invalid" });

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if(!isValidPassword) return res.json({ Message: "Password is invalid" });

      delete user.password;
      let payload = {
        email: user.email,
        role: user.role
      }
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.generateRefreshToken(payload);
      commonHelper.response(res, user, 201, "Login is successful");
      
    } catch (error) {
      res.send(error);
    }
  },

  refreshToken : (req,res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETKEY_JWT);
    let payload = {
      email : decoded.email,
      role : decoded.role,
    }
    const result = {
      token : authHelper.generateToken(payload),
      refreshToken : authHelper.generateRefreshToken(payload)
    }
    commonHelper.response(res, result, 200);
  },
  
  profile : async (req, res) => {
    const email = req.payload.email;
    const {rows: [user]} = await modelCustomers.findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  
  getAllCustomers: async (req, res) => {
    try {
      //Pagination
      const limit = Number(req.query.limit) || 5;
      const page = Number(req.query.page) || 1;
      const { rows: [count] } = await modelCustomers.countData();
      const totalData = Number(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = { currentPage: page, limit, totalData, totalPage };

      //getAllCustomer response
      const result = await modelCustomers.getAllCustomers();
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
      const result = await modelCustomers.getCustomer(id);
      commonHelper.response(res, result.rows[0], 200, "Get detail customer successful");
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