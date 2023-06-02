import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      // @ts-ignore
      authorize(credentials: { email: string; password: string }, _req) {
        const { email, password } = credentials;
        if (email !== "becky@stubbu.com" && password !== "password") {
          throw new Error("Invalid credentials");
        }

        return { id: "1234", name: "User", email: "user@example.com" };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
