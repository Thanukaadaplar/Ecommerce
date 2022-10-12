const Joi = require('@hapi/joi')

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@%&*]).{8,}$/;
const authSchema = Joi.object({
    username:Joi.string().max(100).trim().required(),
    email: Joi.string().email().lowercase().required().trim(),
    password : Joi.string().min(8).required().strict().regex(RegExp(pattern))
})
module.exports= {
    authSchema,
}