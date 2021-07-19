import Providers from "next-auth/providers";
import db from "../../../firebase";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth";

export default NextAuth({
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	// pages: {
	// 	signIn: "/login",
	// },
	adapter: FirebaseAdapter(db),
});
