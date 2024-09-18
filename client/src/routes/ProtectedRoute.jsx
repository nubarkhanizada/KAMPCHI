import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        if (user !== undefined) {
            setIsLoading(false);
        }
    }, [user]);

    if (!isLoading && !user) {
        return <Navigate to="/auth/login" />;
    }

    if (!isLoading) {
        const roleId = user.userRoleId;

        if (pathname === '/business/seller' && roleId !== 3) {
            return <Navigate to="/business" />;
        }
        if (pathname === '/business/guide' && roleId !== 2) {
            return <Navigate to="/business" />;
        }
        return <Component {...rest} />;
    }

    return <div>Loading...</div>;
};

export default ProtectedRoute;
