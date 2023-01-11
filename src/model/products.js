const pool = require('../config/db');

const selectAllProduct = () => {
    return pool.query(`select * from products`);
}

const selectProduct = (id) => {
    return pool.query(`select * from products where id=${id}`);
}

const insertProduct = (data) => {
    const { id, name, price, description, stock, rating, color, size, id_category, id_seller } = data;
    return pool.query(`insert into products values
        (${id}, '${name}', ${price}, '${description}', ${stock}, 
        ${rating}, '${color}, ${size}, ${id_category}, ${id_seller})`);
}

const updateProduct = (data) => {
    const { id, name, price, description, stock, rating, color, size, id_category, id_seller } = data;
    return pool.query(`update products set name='${name}', price=${price}, 
        description='${description}', stock=${stock}, rating=${rating}, color=${color}, 
        size=${size}, id_category=${id_category}, id_seller=${id_seller} where id=${id})`);
}

const deleteProduct = (id) => {
    return pool.query(`delete from products where id=${id})`);
}

const countData = () => {
    return pool.query(`select count(*) from products`);
}

const findId = (id) => {
    return new Promise((resolve, reject) => pool.query(`select id from products where id=${id}`, (error, result) => {
        if (error) {
            resolve(result)
        } else {
            reject(error)
        }
    }))
}

module.exports = {
    selectAllProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countData,
    findId
}