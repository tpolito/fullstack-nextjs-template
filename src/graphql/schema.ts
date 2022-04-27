import { builder } from './builder';
import { db } from './db';

builder.prismaObject('User', {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name', {
      nullable: true,
    }),
    email: t.exposeString('email', {
      nullable: true,
    }),
    image: t.exposeString('image', {
      nullable: true,
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    getAllUsers: t.prismaField({
      type: ['User'],
      resolve: async (query, root, args, ctx, info) => {
        return await db.user.findMany({});
      },
    }),
    getSingleUser: t.prismaField({
      type: 'User',
      args: {
        email: t.arg.string({ required: true }),
      },
      // HACK: Used an 'any' here. MaybePromise<...> error?
      resolve: async (query, root, args, ctx, info): Promise<any> => {
        return await db.user.findFirst({
          where: {
            email: args.email,
          },
        });
      },
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createUser: t.prismaField({
      type: 'User',
      args: {
        name: t.arg.string({ required: true }),
        email: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        const { name, email } = args;
        return db.user.create({
          data: {
            name,
            email,
          },
        });
      },
    }),
  }),
});

export const schema = builder.toSchema({});
