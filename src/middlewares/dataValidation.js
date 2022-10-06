const Joi = require('joi');

const regexDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

const schemaData = Joi.object({
  name: Joi.string().min(3).required().messages({
      'string.empty': 'O campo "name" é obrigatório',
      'any.required': 'O campo "name" é obrigatório',
      'string.min': 'O "name" deve ter pelo menos 3 caracteres',
  }),
  age: Joi.number().strict().min(18).required()
  .messages({
      'number.empty': 'O campo "age" é obrigatório',
      'any.required': 'O campo "age" é obrigatório',
      'number.min': 'A pessoa palestrante deve ser maior de idade',
  }),
  talk: Joi.object().required().keys({
    watchedAt: Joi.string().regex(RegExp(regexDate)).required()
    .messages({
      'string.empty': 'O campo "watchedAt" é obrigatório',
      'any.required': 'O campo "watchedAt" é obrigatório',
      'string.pattern.base': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    }),
    rate: Joi.number().min(1).max(5).required()
    .messages({
      'number.empty': 'O campo "rate" é obrigatório',
      'any.required': 'O campo "rate" é obrigatório',
      'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
      'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
    }),
  }).messages({
    'any.required': 'O campo "talk" é obrigatório',
  }),
});

function dataValidation(request, response, next) {
  const { error } = schemaData.validate(request.body);
  if (error) {
    return response.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = {
  dataValidation,
};