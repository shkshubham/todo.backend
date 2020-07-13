import validate from '@feathers-plus/validate-joi';
import  { createSchema, updateSchema, joiOptions} from './todo.validator';
export default {
  before: {
    all: [],
    find: [
      (context: any) => {
        const { query } = context.params
        if (typeof query.completed === 'string') {
          query.completed = (query.completed === 'true');
        }
      }
    ],
    get: [],
    create: [
      validate.form(createSchema, joiOptions)
    ],
    update: [
      validate.form(updateSchema, joiOptions)
    ],
    patch: [
      validate.form(updateSchema, joiOptions)
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
