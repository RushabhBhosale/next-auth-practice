'use client'
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'

export default function Admin() {

  const session = useSession();

  if (!session?.data?.role) {
    redirect('/access-denied')
  }

  return (
    <div>ADMIN</div>
  )
}
