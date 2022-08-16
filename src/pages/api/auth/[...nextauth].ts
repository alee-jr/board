import firebase from "firebase";
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
        const lastDonate = await firebase
          .firestore()
          .collection("users")
          .doc(String(token.sub))
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              return snapshot.data().lastDonate.toDate();
            }
            return null;
          });

        return {
          ...session,
          id: token.sub,
          vip: lastDonate ? true : false,
          lastDonate,
        };
      } catch (err) {
        return {
          ...session,
          id: null,
          vip: false,
          lastDonate: null,
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
