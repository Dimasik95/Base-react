import React, { useContext } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from './UI/loader/loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth 
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/posts" />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
    );
};

export default AppRouter;