//SQL queries for accessing seller table
const pool = require('../config/db');

const getAllSeller = () => {
    return pool.query(`select * from seller`);
}

const getDetailSeller = (id) => {
    return pool.query(`select * from seller where id=${id}`);
}

const insertSeller = (data) => {
    const { id, name, phone_number, email, password, gender, date_of_birth, store_name, store_description} = data;
    return pool.query(`insert into seller values(${id}, '${name}', 
        '${phone_number}', '${email}', '${password}', '${gender}', '${date_of_birth}', 
        '${store_name}', '${store_description}')`);
}

const updateSeller = (data) => {
    const { id, name, phone_number, email, password, gender, date_of_birth, store_name, store_description} = data;
    return pool.query(`update seller set name='${name}', phone_number='${phone_number}', 
        email='${email}', password='${password}', gender='${gender}', 
        date_of_birth='${date_of_birth}', store_name='${store_name}', store_description='${store_description}' where id=${id}`);
}


const deleteSeller = (id) => {
    return pool.query(`delete from seller where id=${id}`);
}

const countData = () => {
    return pool.query(`select count(*) from seller`);
}

const findId = (id) => {
    return new Promise((resolve, reject) => 
        pool.query(`select id from seller where id=${id}`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

const findEmail = (email) => {
    return new Promise((resolve, reject) =>
        pool.query(`select email from seller where email='${email}'`, (error, result) => {
            if (error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

module.exports = {
    getAllSeller,
    getDetailSeller,
    insertSeller,
    updateSeller,
    deleteSeller,
    countData,
    findEmail,
    findId
}