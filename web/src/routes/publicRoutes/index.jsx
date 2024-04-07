import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { NotFound } from '../../components/notfound';
import { SignIn } from '../../pages/signIn';
import { SignUp } from '../../pages/signUp';

export const PublicRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Outlet />
        </Layout>
    );
};