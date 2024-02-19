'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link  from 'next/link';
import { useRef, useState } from 'react'

export default function RegisterPage() {

  const ref = useRef();

  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    if (!userInfo?.email || !userInfo?.password) {
      setError('Please fill out all fields');
    }

    try {
      setPending(true);

      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
        callbackUrl: process.env.NEXTAUTH_URL
      });

      if (!res.ok) {
        setError("Failed to register account.");
      }

      if (res.error) {
        setError("Invalid credentials provided.");
        setPending(false);
        return
      }

      setPending(false);

      router.replace("/");

    } catch (error) {
      setPending(false);
      setError("An error occurred while processing your request.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form ref={ref} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            name="password"
            value={userInfo.password}
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          {error && <span className="text-red-600 m-2 mb-4 px-2">{error}</span>}
          <button
            disabled={pending === true}
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {pending ? 'Loggin in..' : 'Log In'}
          </button>
          <p className='text-black mt-4'>Dont have an account. <Link className='text-red-500' href='/auth/register'>Register</Link></p>
        </div>
      </form>
    </div>
  )
}
