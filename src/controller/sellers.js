const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const modelSellers = require("../model/sellers");
const commonHelper = require("../helper/common");
const authHelper = require('../helper/auth');

let sellerController = {

  registerSeller: async (req, res) => {
    try {
      //Checks if email is already used
      let data = req.body;
      const { rowCount } = await modelSellers.findEmail(data.email);
      if (rowCount) return res.json({ Message: "Email is already used" });

      //Hash password
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(data.password, salt);

      //registerSeller response
      const id = uuidv4();
      data = {...data, id, password: passwordHash, role: "seller"};
      
      const result = await modelSellers.insertSeller(data);
      commonHelper.response(res, result.rows, 200, "Register seller successful");
    } catch (error) {
      res.send(error);
    }
  },

  loginSeller: async (req, res) => {
    try {
      //Login data validation
      const data = req.body;
      const { rows: [user] } = await modelSellers.findEmail(data.email);
      if (!user) return res.json({ Message: "Email is invalid" });
      const isValidPassword = bcrypt.compareSync(data.password, user.password);
      if (!isValidPassword) return res.json({ Message: "Password is invalid" });

      //Generate token
      delete user.password;
      const payload = { email: user.email, role: user.role };
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.generateRefreshToken(payload);
      
      //loginSeller response
      commonHelper.response(res, user, 201, "Login is successful");
    } catch (error) {
      res.send(error);
    }
  },

  refreshToken: (req, res) => {
    const decoded = jwt.verify(req.body.refreshToken, process.env.SECRETKEY_JWT);
    let payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },

  profile: async (req, res) => {
    const email = req.payload.email;
    const { rows: [user] } = await modelSellers.findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  
  getAllSellers: async (req, res) => {
    try {
      //Pagination
      const limit = Number(req.query.limit) || 5;
      const page = Number(req.query.page) || 1;
      const { rows: [count] } = await modelSellers.countData();
      const totalData = Number(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = { currentPage: page, limit, totalData, totalPage };

      //getAllSellers response
      const result = await modelSellers.getAllSellers();
      commonHelper.response(res, result.rows, 200, "Get all sellers successful", 
        pagination);
    } catch (error) {
      res.send(error);
    }
  },

  getDetailSeller: async (req, res) => {
    try {
      //Checks if specified id exists
      const id = Number(req.params.id);
      const { rowCount } = await modelSellers.findId(id);
      if (!rowCount) return res.json({ Message: "Seller not found" });

      //getDetailSeller response
      const result = await modelSellers.getSeller(id);
      commonHelper.response(res, result.rows[0], 200, "Get seller successful");
    } catch (error) {
      res.send(error);
    }
  },

  updateSeller: async (req, res) => {
    try {
      //Checks if specified id exists
      const id = req.params.id;
      const { rowCount } = await modelSellers.findId(id);
      if (!rowCount) return res.json({ Message: "Seller not found" });

      //updateSeller response
      const data = req.body;
      data.id = id;
      const result = await modelSellers.updateSeller(data);
      commonHelper.response(res, result.rows, 201, "Seller updated");
    } catch (error) {
      res.send(error);
    }
  },

  deleteSeller: async (req, res) => {
    try {
      //Checks if specified id exists
      const id = req.params.id;
      const { rowCount } = await modelSellers.findId(id);
      if (!rowCount) return res.json({ Message: "Seller not found" });

      //deleteSeller response
      const result = modelSellers.deleteSeller(id);
      commonHelper.response(res, result.rows, 200, "Seller deleted");
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = sellerController;