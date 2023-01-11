const modelCustomer = require('./src/model/customers')
const commonHelper = require('./src/helper/common')

let customerController = {

  //Mengambil data customer berdasarkan id
  getIdCustomer: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const {rowCount} = await modelCustomer.findId(id);
      if(!rowCount){
        return res.json({ Message : "Customer not found"});
      }
    } catch (error) {
      console.log(error);
    }
  },
  getEmailCustomer: "",
  createCustomer: "",
  updateCustomer: "",
  deleteCustomer: ""
}

module.exports = customerController;