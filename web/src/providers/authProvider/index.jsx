// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(false);

    const login = (userData) => {
        // Logic to authenticate user (e.g., send request to server)
        // Upon successful authentication, set the user state
        setUser(userData);
    };

    const logout = () => {
        // Logic to log out user
        setUser(null);
    };

    useEffect(() => {
        console.log("Init Loading");
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
