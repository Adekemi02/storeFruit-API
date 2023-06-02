const User = require('../models/users');
const {registerValidation, loginValidation} = require('../controllers/validation');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');    


const signUpAUTH = async(req, res) => {
    // Validate the data before we make a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    // Check if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) {
        return res.status(StatusCodes.BAD_REQUEST).send('Email already exists');
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password_hash: hashedPassword,
    });

    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err){
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}

const loginAuth = async(req, res) => {
    // Validate the data before we make a user
    const {error} = loginValidation(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    // Check if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(StatusCodes.BAD_REQUEST).send('Email does not exist');
    }

    // Check if password is correct
    const validatePassword = await bcrypt.compare(req.body.password, user.password_hash);
    if(!validatePassword) {
        return res.status(StatusCodes.BAD_REQUEST).send('Invalid password');
    }

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.Token_Secret, {expiresIn: '1h'})
    res.header('auth-token', token).send(token);
}


module.exports = { 
    signUpAUTH,
    loginAuth
}