import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { NotFound } from '../../components/notfound';
import { Dashboard } from '../../pages/dashboard';
import { MyPost } from '../../pages/myPost';
import { AddPost } from '../../pages/addPost';

export const PrivateRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path="" element={<Dashboard />} />
                <Route path="/myPost" element={<MyPost />} />
                <Route path="/addPost" element={< AddPost />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Outlet />
        </Layout>
    );
};