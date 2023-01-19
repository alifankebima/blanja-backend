const pool = require('../config/db');

const getAllSellers = () => {
    return pool.query(`select * from sellers`);
}

const getSeller = (id) => {
    return pool.query(`select * from sellers where id='${id}'`);
}

const insertSeller = (data) => {
    const { id, email, password, fullname, role, phone_number, gender, 
        date_of_birth, store_name, store_description } = data;
    return pool.query(`insert into sellers values('${id}', '${email}', '${password}', 
        '${fullname}', '${role}', '${phone_number}', '${gender}', '${date_of_birth}',
        '${store_name}', '${store_description}')`);
}

const updateSeller = (data) => {
    const { id, email, password, fullname, role, phone_number, gender, 
        date_of_birth, store_name, store_description } = data;
    return pool.query(`update sellers set email='${email}', password='${password}', 
        fullname='${fullname}', role='${role}', phone_number='${phone_number}', 
        gender='${gender}', date_of_birth='${date_of_birth}', store_name='${store_name}', 
        store_description='${store_description}' where id='${id}'`);
}

const deleteSeller = (id) => {
    return pool.query(`delete from sellers where id='${id}'`);
}

const countData = () => {
    return pool.query(`select count(*) from sellers`);
}

const findId = (id) => {
    return new Promise((resolve, reject) => 
        pool.query(`select id from sellers where id='${id}'`, (error, result) => {
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
        pool.query(`select * from sellers where email='${email}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    )
}

module.exports = {
    getAllSellers,
    getSeller,
    insertSeller,
    updateSeller,
    deleteSeller,
    countData,
    findEmail,
    findId
}