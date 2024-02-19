'use client'
import { useSession } from 'next-auth/react'
import {redirect} from 'next/navigation'

export default function ClientSide() {

   const session = useSession();

   if (session.status !== 'authenticated') {
      redirect('/')
   }

  return (
    <div>ClientSide</div>
  )
}
