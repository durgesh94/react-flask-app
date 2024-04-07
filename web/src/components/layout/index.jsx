import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../../providers/authProvider';


export const Layout = ({ children }) => {

    const { isLoggedIn, logout, user } = useAuth();

    return (
        <Router>
            {isLoggedIn &&
                <>
                    <Link to={'/'}>Dashboard</Link>
                    <Link style={{ marginLeft: "8px" }} to={'/myPost'}>My Post</Link>
                    <Link style={{ marginLeft: "8px" }} to={'/addPost'}>Add Post</Link>
                    <span style={{ marginLeft: "16px" }}>{user?.email}</span>
                    <button onClick={logout} style={{ marginLeft: "8px" }}>Logout</button>
                </>
            }
            {children}
        </Router >
    );
}