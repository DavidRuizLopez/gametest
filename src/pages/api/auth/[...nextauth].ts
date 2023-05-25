import NextAuth from "next-auth";
import { authOptions } from "gametest/server/auth";

export default NextAuth(authOptions);
