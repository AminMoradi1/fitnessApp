import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        await connectDB();

        if (!email || !password)
          throw new Error("لطفا اطلاعات را کامل پرکنید!❌");

        const user = await User.findOne({ email });
        if (!user) throw new Error("!حساب کاربری وجود ندارد❌");

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("نام کاربری یا رمزعبور اشتباه است!❌");

        return { id: user._id, email: user.email };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
