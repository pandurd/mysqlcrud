const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

function register(req, res, next) {
    userService.create(req.body, req)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body, req)
        .then(() => res.json({}))
        .catch(err => next(err));
};

function _delete(req, res, next) {
    userService.delete(req.params.id, req)
        .then(() => res.json({}))
        .catch(err => next(err));
}

async function create() {
    const { Client } = require('pg')
    const client = new Client({
      user: "yqibwidetitjus",
      password: "c474861a5478b64850e4ed7092379f8b923b4f3fc7513f10ee755caf2ac1be7d",
      database: "da4cq00t6pfvr5",
      port: 5432,
      host: "ec2-23-22-156-110.compute-1.amazonaws.com",
      ssl: true
  }); 
    await client.connect()
    const res = await client.query('CREATE TABLE account(' +
       'username VARCHAR (50) UNIQUE NOT NULL,' +
       'password VARCHAR (50) NOT NULL,' +
       'name VARCHAR (355) UNIQUE NOT NULL,' +
       'isadmin BOOLEAN NOT NULL)'
    );
    await client.end()
  }

  async function insert() {
    const { Client } = require('pg')
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
    "VALUES ('test', 'test', 'Test', 'true')");
    await client.end()
  }
  
function createTable(){
    create().then(function(){
    })
}
  
router.get('/createtable', createTable);
router.post('/register', register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

