const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const modelSellers = require("../model/sellers");
const commonHelper = require("../helper/common");
const authHelper = require('../helper/auth');

const sellerController = {

  registerSeller: async (req, res) => {
    try {
      let data = req.body;
      const { rowCount } = await modelSellers.findEmail(data.email);
      if (rowCount) return res.json({ message: "Email is already used" });

      data.id = uuidv4();
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
      data.role = "seller";

      const result = await modelSellers.insertSeller(data);
      commonHelper.response(res, result.rows, 200, "Register seller successful");
    } catch (error) {
      res.send(error);
    }
  },

  loginSeller: async (req, res) => {
    try {
      const data = req.body;
      
      const { rows: [user] } = await modelSellers.findEmail(data.email);
      if (!user) return res.status(403).json({ message: "Email is invalid" });
      const isValidPassword = bcrypt.compareSync(data.password, user.password);
      if (!isValidPassword) return res.status(403).json({ message: "Password is invalid" });

      const payload = {
        email: user.email,
        role: user.role
      };
      
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.generateRefreshToken(payload);
      
      delete user.password;
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
      const { rows: [count] } = await modelSellers.countData();

      //Pagination info
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const totalData = Number(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = { currentPage: page, limit, totalData, totalPage };

      const result = await modelSellers.getAllSellers();
      commonHelper.response(res, result.rows, 200, "Get all sellers successful", pagination);
    } catch (error) {
      res.send(error);
    }
  },

  getDetailSeller: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await modelSellers.findId(id);
      if (!rowCount) return res.json({ message: "Seller not found" });

      const result = await modelSellers.getSeller(id);
      commonHelper.response(res, result.rows[0], 200, "Get seller successful");
    } catch (error) {
      res.send(error);
    }
  },

  updateSeller: async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;
      const { rowCount } = await modelSellers.findId(id);
      if (!rowCount) return res.json({ message: "Seller not found" });

      data.id = id;
      const result = await modelSellers.updateSeller(data);
      commonHelper.response(res, result.rows, 201, "Seller updated");
    } catch (error) {
      res.send(error);
    }
  },

  deleteSeller: async (req, res) => {
    try {
      const id = req.params.id;
      const { rowCount } = await modelSellers.findId(id);
      if (!rowCount) return res.json({ message: "Seller not found" });

      const result = modelSellers.deleteSeller(id);
      commonHelper.response(res, result.rows, 200, "Seller deleted");
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = sellerController;