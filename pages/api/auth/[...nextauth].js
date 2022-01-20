import NextAuth from "next-auth/next";
import Discord from "next-auth/providers/discord";

export default NextAuth({
    providers: [
        Discord({
            clientId: "779182081833566218",
            clientSecret: "fdvYdjDsuveYOjEtBtkmFHiNXwMddRnp",
        })
    ],
    secret: "9DB7E829-FE93-44F6-B9AF-E3BA1BFD43B9",
    theme: {
        colorScheme: "dark",
        brandColor: "#D7282F",
        logo: "/assets/opse_logo.png"
    },
    callbacks: {
        async session({ session, user, token }) {
            session.user["id"] = token.sub;
            return session;
        },
    }
})