'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { isLogin } from "./lib/auth";

interface AuthContextValue {
    isLoggedIn: boolean
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const contextValue = {
        isLoggedIn,
        setIsLoggedIn,
    }

    useEffect(() => {
        if (isLogin()) {
            setIsLoggedIn(true)
        }
        }, []
    )
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
      // console.log('useAuth must be used within an AuthProvider')
    }
    return context
}