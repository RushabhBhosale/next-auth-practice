import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";

export default async function CLient() {

   const session = await getServerSession(authOptions);

   if (!session) {
      redirect('/auth/login');
   }

   return (
      <>
         <div>Logged User: {session?.user.name}</div>
         <div>Logged User: {session?.user.email}</div>
      </>
   )
}
