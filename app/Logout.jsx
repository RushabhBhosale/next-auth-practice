'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function Logout({label}) {
  return (
    <button onClick={() => signOut()}>{label}</button>
  )
}
