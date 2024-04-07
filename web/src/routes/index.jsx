import React from 'react';
import { useAuth } from '../providers/authProvider';
import { PrivateRoutes } from './privateRoutes';
import { PublicRoutes } from './publicRoutes';

export const AppRoutes = () => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn)
        return <PrivateRoutes />
    else
        return <PublicRoutes />
};