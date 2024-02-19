import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient, Role } from "@prisma/client"
import { compare } from "bcrypt"

const prisma = new PrismaClient();

export const authOptions = {

   session: {
      strategy: "jwt",
   },

   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: { label: "email", type: "email" },
            password: { label: "password", type: "password" },
         },

         async authorize(credentials, req) {

            if (!credentials.email || !credentials.password) {
               throw new Error("Provided credentials")
            }

            const user = await prisma.user.findUnique({
               where: {
                  email: credentials.email,
               }
            });

            console.log(user);

            if (!user) {
               return null
            }

            const isPasswordValid = await compare(credentials.password, user.password);

            if (!isPasswordValid) {
               throw new Error("Invalid credentials")
            }


            return {
               id: user.id,
               email: user.email,
               name: user.name,
               role: user.role,
            }
         },
      })
   ],

   pages: {
      signIn: '/login'
   },

   debug: process.env.NODE_ENV === 'development',
   jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET
   },
   secret: process.env.NEXTAUTH_SECRET,

   callbacks: {
      async session({ session, token }) {
         console.log('session token);', token);
         return {
            ...session,
            id: token.id,
            email: token.email,
            name: token.name,
            role: token.role
         }
      },
      async jwt({ token, user }) {
         if (user) {
            return {
               ...token,
               id: user.id,
               email: user.email,
               name: user.name,
               role: user.role
            }
         }
         return token
      }
   }

}

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET }