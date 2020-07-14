import validate from '@feathers-plus/validate-joi';
import  { createSchema, updateSchema, joiOptions} from './todo.validator';
import { HookContext } from '@feathersjs/feathers';


// before: {
// create: [async (context: HookContext) => {
//   context.data.createdAt = new Date();

//   return context;
// }],

// update: [async (context: HookContext) => {
//   context.data.updatedAt = new Date();

//   return context;
// }],

// patch: [async (context: HookContext) => {
//   context.data.updatedAt = new Date();
    
//   return context;
// }]
// },

function setUpdatedAt(context: HookContext) {
  context.data.updatedAt = new Date();
}

export default {
  before: {
    all: [],
    find: [
      (context: HookContext) => {
        const { query } = context.params;
        if (query && typeof query.completed === 'string') {
          query.completed = (query.completed === 'true');
        }
        return context;
      }
    ],
    get: [],
    create: [
      validate.form(createSchema, joiOptions),
      (context: HookContext) => {
        context.data.createdAt = new Date();
        setUpdatedAt(context);
        return context;
      }

    ],
    update: [
      validate.form(updateSchema, joiOptions),
      (context: HookContext) => {
        setUpdatedAt(context);
        return context;
      }
    ],
    patch: [
      validate.form(updateSchema, joiOptions),
      (context: HookContext) => {
        return context;
      }
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
