const Joi = require('joi');

const schemaToken = Joi.object({
    token: Joi.string().min(16).max(16).required()
    .messages({
        'string.empty': 'Token não encontrado',
        'any.required': 'Token não encontrado',
        'string.min': 'Token inválido',
        'string.max': 'Token inválido',
    }),
});

function validateToken(request, response, next) {
    const { error } = schemaToken.validate({ token: request.headers.authorization });
    if (error) {
        return response.status(401).json({ message: error.details[0].message });
    }
    next();
}

module.exports = { validateToken }; 