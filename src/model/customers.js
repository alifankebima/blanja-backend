const pool = require('../config/db');

const getAllCustomers = () => {
    return pool.query(`select * from customers`);
}

const getCustomer = (id) => {
    return pool.query(`select * from customers where id='${id}'`);
}

const insertCostumer = (data) => {
    const { id, email, password, fullname, role, phone_number, gender, date_of_birth } = data;
    return pool.query(`insert into customers values('${id}', '${email}', '${password}', 
        '${fullname}', '${role}', '${phone_number}', '${gender}', '${date_of_birth}')`);
}

const updateCustomer = (data) => {
    const { id, email, password, fullname, role, phone_number, gender, date_of_birth} = data;
    return pool.query(`update customers set email='${email}', password='${password}',
        fullname='${fullname}', role='${role}', phone_number='${phone_number}',
        gender='${gender}', date_of_birth='${date_of_birth}' where id='${id}'`);
}

const deleteCustomer = (id) => {
    return pool.query(`delete from customers where id='${id}'`);
}

const countData = () => {
    return pool.query(`select count(*) from customers`);
}

const findId = (id) => {
    return new Promise((resolve, reject) => 
        pool.query(`select id from customers where id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    )
}

const findEmail = (email) => {
    return new Promise((resolve, reject) =>
        pool.query(`select * from customers where email='${email}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    )
}

module.exports = {
    getAllCustomers,
    getCustomer,
    insertCostumer,
    updateCustomer,
    deleteCustomer,
    countData,
    findEmail,
    findId
}