const { Client } = require('pg')

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    const client = new Client({
        user: "yqibwidetitjus",
        password: "c474861a5478b64850e4ed7092379f8b923b4f3fc7513f10ee755caf2ac1be7d",
        database: "da4cq00t6pfvr5",
        port: 5432,
        host: "ec2-23-22-156-110.compute-1.amazonaws.com",
        ssl: true
      }); 
    
    await client.connect()
    const res = await client.query('select * from account');
    await client.end();
    return res.rows;
}

async function getById(id) {
    const client = new Client({
        user: "yqibwidetitjus",
        password: "c474861a5478b64850e4ed7092379f8b923b4f3fc7513f10ee755caf2ac1be7d",
        database: "da4cq00t6pfvr5",
        port: 5432,
        host: "ec2-23-22-156-110.compute-1.amazonaws.com",
        ssl: true
      }); 
    
    await client.connect()
    const res = await client.query('select * from account where username=\'' + id + "'");
    await client.end();
    return res.rows[0];
}

async function create(userParam, req) {
    const client = new Client({
        user: "yqibwidetitjus",
        password: "c474861a5478b64850e4ed7092379f8b923b4f3fc7513f10ee755caf2ac1be7d",
        database: "da4cq00t6pfvr5",
        port: 5432,
        host: "ec2-23-22-156-110.compute-1.amazonaws.com",
        ssl: true
      }); 
    
    await client.connect()
    const res = await client.query('INSERT INTO account(username, password, name, isadmin)'+
    "VALUES ('" + userParam.username + "', '" + userParam.password+ "', '" + userParam.name +"', '" + userParam.isadmin + "')");
    await client.end();
    return res.rows;
}

async function update(id, userParam, req) {
    const client = new Client({
        user: "yqibwidetitjus",
        password: "c474861a5478b64850e4ed7092379f8b923b4f3fc7513f10ee755caf2ac1be7d",
        database: "da4cq00t6pfvr5",
        port: 5432,
        host: "ec2-23-22-156-110.compute-1.amazonaws.com",
        ssl: true
      }); 
    
    await client.connect()
    const res = await client.query("UPDATE account set name='" + userParam.name + 
    "', password='" + userParam.password + "', isadmin='" + userParam.isadmin
     +"' WHERE username='"  + userParam.username  + "'");
    await client.end();
    return res.rows;
}

async function _delete(id, req) {
    const client = new Client({
        user: "yqibwidetitjus",
        password: "c474861a5478b64850e4ed7092379f8b923b4f3fc7513f10ee755caf2ac1be7d",
        database: "da4cq00t6pfvr5",
        port: 5432,
        host: "ec2-23-22-156-110.compute-1.amazonaws.com",
        ssl: true
      }); 
    
    await client.connect()
    const res = await client.query("DELETE FROM account WHERE username='" + id + "'");
    await client.end();
    return res.rows;
}
