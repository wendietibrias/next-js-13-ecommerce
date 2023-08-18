import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextAuth";
import prisma from "@/lib/prismaClient";

export const GET = async (req : Request) => {
     try {
       const session : any = await getServerSession(authOptions);

       if(!session) {
          return NextResponse.json({ message:"Unauthorized" } , {  status:401 ,statusText:"Unauthorized" });
       }

       const findOrder = await prisma.order.findMany({
         where: {
            userId:session.user.id
         }
       });

       return NextResponse.json({ data:findOrder,message:`${findOrder.length} transaction was found` } , { status:200 });

     } catch(err : any) {
        return NextResponse.json({ message:err.message }, { status:500,statusText:"Internal Server Error" });
     }
}