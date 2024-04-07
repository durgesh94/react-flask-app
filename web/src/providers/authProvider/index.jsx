// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { signIn, signUp, currentUser } from '../../api/user'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);

    const login = (userData) => {
        setError(null);
        setLoading(true);
        signIn(userData)
            .then((data) => {
                setUser(data);
                localStorage.setItem('token', data.token);
                getUser();
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    };

    const register = (userData) => {
        setError(null);
        setLoading(true);
        signUp(userData)
            .then((data) => console.log(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    const logout = () => {
        // Logic to log out user
        setUser(null);
        localStorage.removeItem('token');
    };

    const getUser = () => {
        setError(null);
        currentUser()
            .then((data) => setUser(data))
            .catch((error) => setError(error))
            .finally(() => setLoadingInitial(false));
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!user,
            user,
            error,
            loading,
            login,
            register,
            logout
        }}>
            {loadingInitial && <div>Loading....!</div>}
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};
