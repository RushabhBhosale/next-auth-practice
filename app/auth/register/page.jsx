'use client'
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react'

export default function RegisterPage() {

   const ref = useRef();

   const router = useRouter();;

   const [userInfo, setUserInfo] = useState({
      name: '',
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
      if (!userInfo?.name || !userInfo?.email || !userInfo?.password) {
         setError('Please fill out all fields');
      }

      try {
         setPending(true);
         const res = await fetch(`/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
         });

         if (res.ok) {
            setPending(false);
            ref?.current.reset();
            router.push('/auth/login');
            console.log("Registration Successful");
         } else {
            let errorMessage = await res.json();
            setError(errorMessage.message);
            console.log("Something wrong i can feel it");
            setPending(false);
         }

      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="min-h-screen flex items-center justify-center">
         <form ref={ref} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Username
               </label>
               <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  required
               />
            </div>
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
                  {pending ? 'Registering' : 'Sign Up'}
               </button>
            </div>
         </form>
      </div>
   )
}
