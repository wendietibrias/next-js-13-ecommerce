import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextAuth";
import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req : NextRequest,route : { params:{ id:string } }) => {
    try {
       const session = await getServerSession(authOptions);
       if(!session) {
         return NextResponse.json({ message:"Unauthorized" } , { status:401 });
       }

       const id = route.params.id;

       if(id){
          const findTransaction = await prisma.order.findUnique({
             where: {
                id:id 
             }
          });

          return NextResponse.json({ message:"transaction found",data:findTransaction }, { status:200 });
       }

    } catch(err : any) {
        return NextResponse.json({ message:err.message }, { status:500,statusText:err.message });
    }
}