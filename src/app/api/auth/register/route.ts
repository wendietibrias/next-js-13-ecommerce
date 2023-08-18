import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import bcrypt from "bcrypt";

const salt : number = 10;

export const POST = async (req : Request) => {
    const body = await req.json();
    const { email , password,confirm,name } = body;

    try {
     //check if user exists
     const findUser = await prisma.user.findUnique({
         where: {
            email:email 
         }
     });

     if(findUser) {
        return  NextResponse.json({ message:"account already exists" } , { status:400 });
     }

     if(!password || password === "") {
        return NextResponse.json({ message:"please complete credentials" } , { status:400 });
     }

     if(password !== confirm) {
        return  NextResponse.json({ message:"password is not match" } , { status:400 });
     }

     const saltRounds = await bcrypt.genSalt(salt);
     const hashPassword = await bcrypt.hash(password, saltRounds);

     const createUser = await prisma.user.create({
        data: {
            name,
            email,
            password:hashPassword,
            provider:"credentials"
        }
     });

     if(createUser) {
        return NextResponse.json({ message:"success create account",status:200 } , { status:200 });
     }

    } catch(err : any) {
        NextResponse.json({ message:err.message,status:500 } , { status:500,statusText:"Internal Server Error" });
    }
}
