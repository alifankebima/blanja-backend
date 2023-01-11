//SQL queries for accessing customer table
const pool = require('../config/db');

const selectAllCustomer = () => {
    return pool.query(`select * from customer`);
}

const selectCustomer = (id) => {
    return pool.query(`select * from customer where id=${id}`);
}

const insertCostumer = (data) => {
    const { id, name, phone_number, email, password, gender, date_of_birth} = data;
    return pool.query(`insert into customer values(${id}, '${name}', 
        '${phone_number}', '${email}', '${password}', '${gender}', ${date_of_birth}`);
}

const updateCustomer = (data) => {
    const { id, name, phone_number, email, password, gender, date_of_birth} = data;
    return pool.query(`update customer set name='${name}', phone_number='${phone_number}', 
        email='${email}', password='${password}', gender='${gender}', 
        date_of_birth=${date_of_birth} where id=${id}`);
}

const deleteCustomer = (id) => {
    return pool.query(`delete from customer where id=${id})`);
}

const findId = (id) => {
    return new Promise((resolve, reject) => 
        pool.query(`select id from customer where id=${id}`, (error, result) => {
            if (error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

const findEmail = (email) => {
    return new Promise((resolve, reject) =>
        pool.query(`select email from customer where email='${email}'`, (error, result) => {
            if (error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

module.exports = {
    selectAllCustomer,
    selectCustomer,
    insertCostumer,
    updateCustomer,
    deleteCustomer,
    findEmail,
    findId
}