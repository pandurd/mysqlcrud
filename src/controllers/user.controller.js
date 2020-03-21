const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/image', uploadPic);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.getById(req.user.sub)
    .then(async function(user){
            if(user.isadmin)
                    userService.create(req.body, req)
                        .then(() => res.json({}))
                        .catch(err => next(err));
            else
                throw 'admin only.'
        })
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getById(req.user.sub)
    .then(async function(user){
        console.log(user);
            if(user.isadmin)
                userService.getAll()
                    .then(users => res.json(users))
                    .catch(err => next(err));
            else
                    throw 'admin only.'
            })
            .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.getById(req.user.sub)
    .then(async function(user){
            if(user.isadmin)
                userService.update(req.params.id, req.body, req)
                    .then(() => res.json({}))
                    .catch(err => next(err));
            else
                throw 'admin only'
    }).catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id, req)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function uploadPic(req, res, next){
    userService.addImage(req.body.photo)
    .then(() => res.json({}))
    .catch(err => next(err));
    
}