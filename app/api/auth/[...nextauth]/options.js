import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../../lib/prisma";
import bcrypt from 'bcryptjs';
import connectToDatabase from "../../../../lib/mongo";
// import NextAuth from "next-auth";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const clientIds= process.env.GOOGLE_CLIENT_ID;
const clientSecrets=process.env.GOOGLE_CLIENT_SECRET;
const githubid= process.env.GITHUB_ID;
const githubsecret=process.env.GITHUB_SECRET;
const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: clientIds,
      clientSecret: clientSecrets,
    }),
    GitHubProvider({
      clientId: githubid,
      clientSecret: githubsecret,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        const hashedPassword = user.password;

        // Compare the plain-text password with the hashed password
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        
        if (passwordMatch) {
          //console.log('user returned by authorize:', { id: user.id, email: user.email, name: user.name, villian: user.name });
          
          return { 
            id: user.id, 
            email: user.email, 
            name: user.name, 
            villian: user.name // Set villian
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add userId to the token
        token.villian = user.villian; // Add villian to the token
      }
      return token; // Return the updated token
    },
    async session({ session, token }) {
      session.user.id = token.id; // Include userId in the session
      session.user.villian = token.villian; // Include villian in the session
      console.log('session callback:', session);
      return session; // Return the updated session
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};


export default options;

// before i written export default NextAuth(options). so it doesn't workded, now it is working.


