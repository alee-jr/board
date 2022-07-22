import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      try {
        return {
          ...session,
          id: token.sub,
        };
      } catch (err) {
        return {
          ...session,
          id: null,
        };
      }
    },
    async signIn(user) {
      const { email } = user;
      try {
        return true;
      } catch (err) {
        console.log("Deu ERRO: ", err);
        return false;
      }
    },
  },
  secret: process.env.SECRET_KEY,
});
