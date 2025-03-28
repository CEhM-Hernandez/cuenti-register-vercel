import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { credentialsRegisterSchema } from '@lib/schemas'
import { validateUserCredentials } from '@lib/authService'
import { ValidationError } from '@/types/errors'

export default {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        isAceptedTerms: {
          label: 'Acepto los términos y condiciones',
          type: 'checkbox',
        },
      },
      authorize: async (credentials) => {
        const parsed = credentialsRegisterSchema.safeParse(credentials)
        if (!parsed.success) {
          const errorObject = parsed.error.issues.map((issue) => {
            return { [issue.path.join('.')]: issue.message }
          })
          throw new ValidationError(errorObject)
        }
        const { email, password } = parsed.data

        return await validateUserCredentials(email, password)
      },
    }),
  ],
} satisfies NextAuthConfig
