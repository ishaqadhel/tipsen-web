'use client';

import * as React from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

import useAuthorizationStore from '@/providers/store/useAuthorizationStore';
import api from '@/services/axios';

import { User } from '@/types/apis/authentication/type';
import { ApiReturnType } from '@/types/apis/common/type';

export interface WithAuthProps {
    user: User;
}

enum RouteRole {
    /**
     * For authentication pages
     * @example /login /register
     */
    auth,
    /**
     * Optional authentication
     * It doesn't push to login page if user is not authenticated
     */
    optional,
    /**
     * For all authenticated user
     * will push to login if user is not authenticated
     */
    all,
}

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */
export default function withAuth<T extends WithAuthProps = WithAuthProps>(
    Component: React.ComponentType<T>,
    routeRole: keyof typeof RouteRole,
) {
    const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
        const navigate = useNavigate();

        //#region  //*=========== STORE ===========
        const { login, logout, isAuthenticated, user, isLoading, stopLoading } =
            useAuthorizationStore();
        //#endregion  //*======== STORE ===========

        const checkAuth = React.useCallback(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                isAuthenticated && logout();
                navigate('/login');
                stopLoading();
                return;
            }
            const loadUser = async () => {
                try {
                    const res =
                        await api.get<ApiReturnType<User>>(
                            '/authentication/me',
                        );
                    login({
                        ...res.data.data,
                    });
                } catch (err) {
                    localStorage.removeItem('token');
                } finally {
                    stopLoading();
                }
            };

            if (!isAuthenticated) {
                loadUser();
            }
        }, [isAuthenticated, login, logout, navigate, stopLoading]);

        React.useEffect(() => {
            // run checkAuth every page visit
            checkAuth();

            // run checkAuth every focus changes
            window.addEventListener('focus', checkAuth);
            return () => {
                window.removeEventListener('focus', checkAuth);
            };
        }, [checkAuth]);

        React.useEffect(() => {
            if (!isLoading) {
                if (isAuthenticated) {
                    // Prevent authenticated user from accessing auth or other role pages
                    if (routeRole === 'auth') {
                        if (user?.is_admin) {
                            navigate(`/admin/dashboard`);
                        } else {
                            navigate('/');
                        }
                    }
                } else {
                    // Prevent unauthenticated user from accessing protected pages
                    if (routeRole !== 'auth' && routeRole !== 'optional') {
                        navigate(`/login`);
                    }
                }
            }
        }, [isAuthenticated, isLoading, navigate, user]);

        if (
            // If the page is still loading or user is unauthenticated and trying to access protected pages
            isLoading ||
            (!isAuthenticated &&
                routeRole !== 'auth' &&
                routeRole !== 'optional')
        ) {
            return (
                <div className='flex flex-col items-center justify-center min-h-screen text-gray-800'>
                    <ImSpinner8 className='mb-4 text-4xl animate-spin' />
                    <p>Loading...</p>
                </div>
            );
        }

        return <Component {...(props as T)} user={user} />;
    };

    return ComponentWithAuth;
}
