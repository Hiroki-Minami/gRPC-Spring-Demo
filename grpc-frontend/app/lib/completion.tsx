'use client';
// TODO: calling the completion function
// TODO: get token from cookie
// TODO: set Authorization Header
// TODO: if response code is unauthorized redirect to login

import { redirect } from "next/navigation"
import { string, z } from "zod";
import { getToken } from "./auth";

export const promptSchema = z.string({invalid_type_error: 'Prompt is required'})

export type PromptState = {
    errors: {
        prompt?: string[]
    }
    message?: string | null
}

interface CompletionResult {
    result: string
}

// TODO: completion
export async function getCompletion(prompt: string) {

    // const validatedFields = promptSchema.safeParse({
    //     prompt
    // })

    // if (!validatedFields.success) {
    //     return {
    //         errors: validatedFields.error.flatten().fieldErrors,
    //         message: 'Prompt is required'
    //     }
    // }

    const token = getToken()
    // if (!token) {
    //     redirect('/login')
    // }
    
    try {
        const response = await fetch('http://localhost:8085/api/completion', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ prompt })
        })
        const result: CompletionResult = await response.json()
        return result.result
    } catch {
        throw Error('Something went wrong')
    }
}