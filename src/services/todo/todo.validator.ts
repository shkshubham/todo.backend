import Joi from '@hapi/joi';

const title = Joi.string().trim().min(1).max(256);
const completed = Joi.boolean();

export const createSchema =  Joi.object().keys({
  title: title.required(),
  completed: completed.required(),
});

export const updateSchema =  Joi.object().keys({
  title,
  completed
});

export const joiOptions = { convert: true, abortEarly: false };