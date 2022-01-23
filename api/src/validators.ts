import { Validator } from '@cfworker/json-schema';

export const commentValidator = new Validator({
  type: 'object',
  required: ['name', 'email', 'content'],
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    content: { type: 'string' },
  },
});
