import { compare } from "bcrypt-ts";
import NextAuth, { User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";


import { getUser } from "@/queries/queries";

import { authConfig } from "./auth.config";

interface ExtendedSession extends Session {
  user: User;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        let response = await getUser(email);
      
        if (!response || (response instanceof Response && !response.ok)) {
          return null;
        }
    
        let users = response instanceof Response ? await response.json() : response;
      
        if (!users.password) {
          throw new Error("User data is missing a password field");
        }
      
        let passwordsMatch = await compare(password, users.password);
        if (passwordsMatch) return users as any;
      
        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
