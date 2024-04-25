// TODO: calling API to auth
// TODO: set jwt token in cookie
// TODO: redirect to completion
'use client';
import { redirect } from "next/navigation"
import { z } from "zod"
import Cookies from 'js-cookie'

// TODO: register
// TODO: login
// TODO: logout
// TODO: isLogin
interface RegisterRequest {
    email: string,
    password: string,
}

interface LoginRequest {
    email: string,
    password: string,
}

const emailSchema = z.string().email({message: 'Invalid email format'})
const passwordSchema = z.string().min(8, {message: 'Enter the password longer than 8 characters'})
const passwordConfirmSchema = z.string().min(8)

export const LoginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})

export const RegisterSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema
})
.refine((data) => data.password === data.passwordConfirm, {
    message: 'Password and Password Confirm do not match',
    path: ['passwordConfirm']
})

// export type State = {
//     errors?: {
//         email?: string[]
//         password?: string[]
//         passwordConfirm?: string[]
//     },
//     message?: string | null
// }

export type AuthState = {
    errors?: {
        email?: string[];
        password?: string[];
        passwordConfirm?: string[];
    };
    message?: string | null;
  };
//   export type State = {
//     errors?: {
//       customerId?: string[];
//       amount?: string[];
//       status?: string[];
//     };
//     message?: string | null;
//   };

export async function register(prevState: AuthState, formData: FormData) {

    const validatedFields = RegisterSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        passwordConfirm: formData.get('passwordConfirm')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid Fields'
        }
    }
    const { email, password } = validatedFields.data

    try {
        const response = await fetch('http://localhost:8085/api/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        const result = await response.json()
        Cookies.set('token', result.token)
        // console.log(result)
        // Cookies.set('token', '')
    } catch {
        return {
            message: 'Connection Error'
        }
    }
    redirect('/')
}

export async function register2(email: string, password: string) {

    try {
        const response = await fetch('http://localhost:8085/api/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        const result = await response.json()
        Cookies.set('token', result.token)
    } catch {
        throw Error('Connection Error')
    }
}

export async function login(email: string, password: string) {
    try {
        const response = await fetch('http://localhost:8085/api/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        const result = await response.json()
        Cookies.set('token', result.token)
    } catch {
        throw Error('Connection Error')
        // return {
        //     message: 'Connection Error'
        // }
    }
}

// export async function login(prevState: AuthState, formData: FormData) {

//     const validatedFields = LoginSchema.safeParse({
//         email: formData.get('email'),
//         password: formData.get('password'),
//     })

//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Invalid Fields'
//         }
//     }
//     const { email, password } = validatedFields.data

//     try {
//         const response = await fetch('http://localhost:8085/api/login', {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password })
//         })
//         const result = await response.json()
//         Cookies.set('token', result.token)
//     } catch {
//         // throw Error('Connection Error')
//         return {
//             message: 'Connection Error'
//         }
//     }
// }

export async function logout() {
    try {
        // Remove the token
        Cookies.remove('token');
        // Other cleanup or actions can be done here
    } catch (error) {
        console.error('Error during logout:', error);
        // Handle any errors here
    }
    // Cookies.remove('token')
    // redirect('/')
}

export function isLogin(): boolean {
    const token = Cookies.get('token')
    return !!token
}

export function getToken(): string | null {
    const token = Cookies.get('token')
    return !token ? null: token
}