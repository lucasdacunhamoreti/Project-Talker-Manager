const Joi = require('joi');
const crypto = require('crypto');

const schemaUser = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'O campo "email" não pode estar vazio',
        'any.required': 'O campo "email" é obrigatório',
        'string.email': 'O "email" deve ter o formato "email@email.com"',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'O campo "password" não pode estar vazio',
        'any.required': 'O campo "password" é obrigatório',
        'string.min': 'O "password" deve ter pelo menos 6 caracteres',
    }),
});

function authenticationUser(request, response) {
    const { error } = schemaUser.validate(request.body);
    if (error) {
        return response.status(400).json({ message: error.details[0].message });
    }
    return response.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
}

module.exports = { authenticationUser };