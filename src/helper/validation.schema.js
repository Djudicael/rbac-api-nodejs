import Joi from '@hapi/joi';

export const registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    username: Joi.string().min(2).required(),
    password: Joi.string().min(2).required(),
});
export const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
});