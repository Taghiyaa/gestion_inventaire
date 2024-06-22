import clientPromise from "@/lib/db";
import * as bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "inventaire",
      name: "inventaire",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username as string;
        const password = credentials?.password as string;
        // const user = { username: username, role: "admin" };

        const client = await clientPromise;
        const db = client.db("inventaire");
        const user = await db.collection("users").findOne({ username });

        if (!user) {
          console.log("user");
          return null;
        }
        if (!bcrypt.compare(password as string, user.password)) {
          console.log("bcrypt");
          return null;
        }

        delete user?.password;
        return user as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token._id = user._id.toString();
        token.username = user.username;
      } else if (trigger === "update") {
        const client = await clientPromise;
        const db = client.db("inventaire");
        const userData = await db
          .collection("users")
          .findOne({ _id: new ObjectId(token._id) });
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      session.user._id = token._id;

      return session;
    },
  },
};

export default NextAuth(authOptions);
