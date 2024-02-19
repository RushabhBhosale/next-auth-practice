import Link from 'next/link';
import Logout from './Logout';

export default function Home() {

  return (
    <div>
      Home 
      <span className='flex gap-16 mt-12'> 
        <Link href='/client'>Client</Link>
        <Link href='/client-side'>Client-Side</Link>
        <Link href='/admin'>Admin</Link>
        <Link href='/auth/login'>Login</Link>
        <Link href='/auth/register'>Register</Link>
        <Logout label='Logout'/>
      </span>
    </div>
  );
}
