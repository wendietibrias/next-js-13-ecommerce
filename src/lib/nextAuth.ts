import { NextAuthOptions } from "next-auth";
import { IAuthProviderOutput } from "@/interfaces/auth.interface";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prismaClient";
import bcrypt from "bcrypt";

const authOptions : NextAuthOptions = {
    providers:[
        GoogleProvider({
             clientId:`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
             clientSecret:`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}`,
             allowDangerousEmailAccountLinking: true,
             
             
        }),
        CredentialsProvider({
           name:'credentials',
           credentials:{
             email:{ type:"email" },
             password:{ type:"password" }
           },
           async authorize(credentials, req) : Promise<IAuthProviderOutput | null> {
               const findUser = await prisma.user.findUnique({
                  where: {
                     email:credentials?.email
                  }
               });
               if(!findUser) {
                  throw new Error("user not found");
               }

               const comparePassword = await bcrypt.compare(credentials?.password , findUser.password);
               if(!comparePassword) {
                  throw new Error("Invalid password or email");
               }
               
               return {
                  id:findUser.id,
                  email:findUser?.email,
                  name:findUser?.name,
               };
           },
        })
    ],
    session: {
      strategy: "jwt",
      maxAge:60 * 60 * 24 * 60 * 60 
    },
    callbacks:{
       async signIn({ account,credentials,user }){
          return true;
       },
       async jwt({ token,session,user,account }) {
          if(user) {
             return {
               ...token,
                id:user.id,
                provider:account?.provider
             }
          }
         
          return token;
       },
       async session({ user,token,session }) {
          return {
            ...session,
            user: {
               ...session.user,
               id:token.id
            }
          }
       }
    },
    pages:{
      signIn:"/auth/login"
    },
    secret:process.env.NEXT_PUBLIC_AUTH_SECRET
}

export default authOptions;