const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const User = db.User;
const Customer = db.Customer;

module.exports = {
    authenticate,
    getAll,
    getAllCustomer,
    getById,
    create,
    update,
    delete: _delete,
    getAllCustomerWithDate,
    addImage,
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    console.log("found", user, username, password);
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, isadmin: user.isadmin }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getAllCustomer() {
    return await Customer.find().select('-hash');
}

 function getAllCustomerWithDate(startDate, endDate) {

   return new Promise(function (resolve, reject){
        Customer.find({
            date: { 
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            }
            }, null,function(err, docs){ 
            console.log(docs, startDate, endDate);
            resolve(docs);
        });
   });
   
}


async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam, req) {


    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);


    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    user.isadmin = userParam.isadmin;

    // save user
    await user.save();
}

async function update(id, userParam, req) {

        

    const user = await User.findOne({ 'username': id });

 

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }


    user.isadmin = userParam.isadmin;
    // copy userParam properties to user
    Object.assign(user, userParam);

    user.isadmin = userParam.isadmin;
    await user.save();
}

async function _delete(id, req) {
    let cuuruser  = await getById(req.user.sub);
    if(!cuuruser.isadmin)
        return;
        
    await User.findByIdAndRemove(id);
}

async function addImage(img) {

    const image = new db.Image();
    console.log(img);
    image.image = Binary(img);
    // save user
    await image.save();
}