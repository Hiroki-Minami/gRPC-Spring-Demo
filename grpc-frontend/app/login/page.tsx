'use client';

import Link from 'next/link';
// import { signIn } from 'app/auth';
import { SubmitButton } from '@/app/ui/submit-button';
import { AuthState, login, LoginSchema } from '../lib/auth';
import { useFormState } from 'react-dom';
import { useAuth } from '../auth-context';
import { redirect } from 'next/navigation';

export default function Login() {
  const initialState = { message: null, errors: {} }
  const context = useAuth()
  const submit = async(prevState: AuthState, formData: FormData) => {

    const validatedFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid Fields'
        }
    }
    const { email, password } = validatedFields.data

    try {
      await login(email, password)
      context?.setIsLoggedIn(true)
    } catch {
      return {
          message: 'Connection Error'
      }
    }
    redirect('/')
}
// @ts-ignore
const [state, dispatch] = useFormState(submit, initialState)
  

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold text-black">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <form action={dispatch}
            className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        >
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@acme.com"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
                />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
                />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            <SubmitButton>Sign in</SubmitButton>
            <p className="text-center text-sm text-gray-600">
                {"Don't have an account? "}
                <Link href="/register" className="font-semibold text-gray-800">
                Sign up
                </Link>
                {' for free.'}
            </p>
        </form>
      </div>
    </main>
  );
}