const pool = require('../config/db');

const selectAllProduct = (searchParam, sortBy, sort, limit, offset) => {
    return pool.query(`select * from products where name like '%${searchParam}%'
        order by ${sortBy} ${sort} limit ${limit} offset ${offset}`);
}

const selectProduct = (id) => {
    return pool.query(`select * from products where id='${id}'`);
}

const insertProduct = (data) => {
    const { id, name, stock, price, photo, description, color, size, rating,
        id_category, id_seller } = data;
    return pool.query(`insert into products values('${id}', '${name}', ${stock},
        ${price}, '${photo}', '${description}', '${color}', ${size}, ${rating},
        ${id_category}, ${id_seller})`);
}

const updateProduct = (data) => {
    const { id, name, stock, price, photo, description, color, size, rating,
        id_category, id_seller } = data;
    return pool.query(`update products set name='${name}', stock=${stock},
        price=${price}, photo='${photo}', description='${description}', 
        color='${color}', size=${size}, rating=${rating}, id_category='${id_category}', 
        id_seller='${id_seller}' where id='${id}'`);
}

const deleteProduct = (id) => {
    return pool.query(`delete from products where id='${id}'`);
}

const countData = () => {
    return pool.query(`select count(*) from products`);
}

const findId = (id) => {
    return new Promise((resolve, reject) => 
        pool.query(`select id from products where id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
       })
    )
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