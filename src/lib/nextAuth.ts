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
             allowDangerousEmailAccountLinking: true
        }),
        CredentialsProvider({
           name:'credentials',
           credentials:{
             email:{ type:"email" },
             password:{ type:"password" }
           },
           async authorize(credentials, req) : Promise<IAuthProviderOutput | any> {
               const findUser = await prisma.user.findUnique({
                  where: {
                     email:credentials?.email
                  }
               });

               if(!findUser) {
                  return null;
               }

               const comparePassword = await bcrypt.compare(credentials?.password , findUser.password);

               if(!comparePassword) {
                  return null;
               }

               return {
                  email:findUser?.email,
                  name:findUser?.name
               };
           },
        })
    ],
    session:{},
    callbacks:{},
    pages:{
      signIn:"/auth/login"
    },
    secret:process.env.NEXT_PUBLIC_AUTH_SECRET
}

export default authOptions;