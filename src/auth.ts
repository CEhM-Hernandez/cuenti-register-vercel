import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from '@lib/prisma'

import authConfig from '@/auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt', maxAge: 60 * 30 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  ...authConfig,
})
