import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '../../../src/graphql/db';

export default NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: 'YOUR_GITHUB_CLIENT_ID',
      clientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
    }),
  ],
});
