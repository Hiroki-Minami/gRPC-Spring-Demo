// TODO: header link to register, login, logout, 
'use client'
import Link from "next/link";
import { logout, isLogin } from "../lib/auth";
import { useAuth } from "../auth-context";

export default function Header() {
    // const router = useRouter()
    const context = useAuth()

    const signout = async () => {
        try {
            await logout()
            context?.setIsLoggedIn(false)
            window.location.href = '/login';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <nav className="fixed top-0 left-0 w-full h-14 py-6 content-center text-white bg-black">
            <div className='flex w-full justify-end content-center px-6 space-x-6'>
                {!context?.isLoggedIn &&
                    <Link href={'/login'} className='font-medium hover:text-gray-300'>
                        <p>Login</p>
                    </Link>
                }
                {!context?.isLoggedIn &&
                    <Link href={'/register'} className='font-medium hover:text-gray-300'>
                        <p>Register</p>
                    </Link>
                }
                {context?.isLoggedIn &&
                    <div onClick={() => signout()} className='font-medium hover:text-gray-300'>
                        <p>Logout</p>
                    </div>
                }
            </div>
        </nav>
    )
}