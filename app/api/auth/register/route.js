import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"


const prisma = new PrismaClient()

export async function POST(req, res) {
   try {
      const { name, email, password } = await req.json();
      console.log({ name, password, email });

      const exists = await prisma.user.findUnique({
         where: {
           email: email,
         },
       });

      if (exists) {
         return NextResponse.json({message: 'User already exists'}, {status: 500});
      }

      const  hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
         data: {
            name,
            email,
            password: hashedPassword
         }
      });

   } catch (error) {
      console.log("Error register", error);
      return NextResponse.json({ message: `Server Error`}, { status: 500})
   }
}