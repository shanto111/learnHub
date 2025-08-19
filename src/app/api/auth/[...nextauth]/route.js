import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { dbConnection } from "@/utils/dbConnection";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const db = await dbConnection();
          const usersCollection = db.collection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) return null;

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || "student",
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.role = user.role ?? "student";
        token.id = user.id;
        token.name = user.name;
      }

      if (account?.provider === "google") {
        const db = await dbConnection();
        const usersCollection = db.collection("users");

        let dbUser = await usersCollection.findOne({ email: profile.email });

        if (!dbUser) {
          const newUser = {
            name: profile.name,
            email: profile.email,
            role: "student",
            image: profile.picture,
            provider: "google",
            createdAt: new Date(),
          };
          const result = await usersCollection.insertOne(newUser);
          dbUser = { ...newUser, _id: result.insertedId };
        }

        token.id = dbUser._id.toString();
        token.name = dbUser.name;
        token.role = dbUser.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token.role ?? "student";
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
