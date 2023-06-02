const Joi = require('joi');


// Register Validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
    })
    return schema.validate(data);
}


// Login Validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
    })
    return schema.validate(data);
}

// Stores Validation
const storesValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        address: Joi.string()
            .min(6)
            .required(),
    })
    return schema.validate(data);
}

// Products Validation
const productsValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        price: Joi.number()
            .min(0)
            .required(),
        quantity: Joi.number()
            .min(0)
            .required(),
        storeID: Joi.string()
            .required(),
    })
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.storesValidation = storesValidation;
module.exports.productsValidation = productsValidation;

