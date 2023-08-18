import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import authOptions from '@/lib/nextAuth';
import prisma from '@/lib/prismaClient';
import { ICartState } from '@/interfaces/cart.interface';


export const POST = async (req : Request , res : Response) => {
    const body = await req.json();
    const { name,email,country,city,address,phone,delivery,paymentMethod,cardNumber,detail } = body;

    try {
      const credentialsUser : any = await getServerSession(authOptions);

      if(!credentialsUser) {
        return NextResponse.json({ message:"Unauthorized" } , { status:401,statusText:"Unauthorized" });
      }

      const mapDetail = detail.map((item : ICartState) =>  {
          return {
             title:item.title,
             price:item.price,
             category:item.category,
             total:item.total,
             qty:item.qty,
             thumbnail:item.thumbnail
          }
      });

      if(credentialsUser) {
         const grandTotal = detail.reduce((a : number, b : ICartState) => a + b.total , 0);
         const createOrder = await prisma.order.create({
            data: {
              name,
              email,
              country,
              city,
              address,
              paymentMethod,
              phone,
              cardNumber,
              delivery,
              detail:mapDetail,
              grandTotal,
              userId:credentialsUser.user.id
            }
         });
   
         if(createOrder) {
            return NextResponse.json({ message:"payment success" } , { status:200,statusText:"payment success" });
         }
      }

      return NextResponse.json({ message:"User is not found" } , { status:400 });

    } catch(err : any) {
       console.log(err.message);
       return NextResponse.json({ message:"Internal Server Error" } , { status:500 });
    }
}