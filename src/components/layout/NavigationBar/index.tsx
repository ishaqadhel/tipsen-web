'use client';

import { Moon, Power, Sun, User } from 'lucide-react';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { useColorScheme } from '@/hooks/useColorScheme';

import MenuNavigationBar from '@/components/layout/MenuNavigationBar';
import { menu } from '@/components/layout/NavigationBar/data';
import IconButton from '@/components/shared/IconButton';
import Image from '@/components/shared/Image';
import Typography from '@/components/shared/Typography';

import useAuthorizationStore from '@/providers/store/useAuthorizationStore';

const NavigationBar: React.FC = () => {
    const location = useLocation();
    const { isDark, setIsDark } = useColorScheme();
    const { user, logout } = useAuthorizationStore();
    const onLogout = () => {
        logout();
        localStorage.removeItem('token');
    };
    return (
        <nav className='fixed top-0 z-50 w-full bg-white py-4 dark:bg-[#161615]'>
            <div className='flex items-center content-between justify-between layout'>
                <Image alt='logo' src='/logo192.png' width={30} height={30} />
                <div className='items-center hidden space-x-5 md:flex'>
                    {menu.map((data) => (
                        <MenuNavigationBar
                            key={data.name}
                            name={data.name}
                            link={data.path}
                            isActive={location.pathname === data.path}
                        />
                    ))}
                </div>
                <div className='flex items-center space-x-3 '>
                    <IconButton
                        icon={isDark ? Moon : Sun}
                        variant='outline'
                        onClick={() => setIsDark(!isDark)}
                    />
                    <IconButton
                        icon={User}
                        variant='outline'
                        data-tooltip-id='profile-menu'
                        data-tooltip-place='bottom'
                        data-tooltip-variant='light'
                    />
                    <Tooltip
                        id='profile-menu'
                        openOnClick={true}
                        clickable={true}
                        className='dark:bg-dark'
                    >
                        <div className='border rounded-md '>
                            <div className='p-4'>
                                <Typography variant='h6'>
                                    {user?.name}
                                </Typography>
                            </div>
                            <hr className='w-full border' />
                            <div className='p-4 space-y-2'>
                                <div
                                    className='flex items-center space-x-4 hover:cursor-pointer'
                                    onClick={() => onLogout()}
                                >
                                    <Power className='w-4 text-black dark:text-white' />
                                    <Typography variant='b3'>Logout</Typography>
                                </div>
                            </div>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
