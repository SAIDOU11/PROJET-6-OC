const Joi = require("joi");

// REGISTER VALIDATION

const userValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(5)
      .required(),
  });
  return schema.validate(data);
};

module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;
