import React from 'react'
import { createContext } from 'react'
import { auth } from '../../api/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user] = useAuthState(auth)

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }