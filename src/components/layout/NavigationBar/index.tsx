'use client';

import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { useColorScheme } from '@/hooks/useColorScheme';

import MenuNavigationBar from '@/components/layout/MenuNavigationBar';
import { menu } from '@/components/layout/NavigationBar/data';
import IconButton from '@/components/shared/IconButton';
import Image from '@/components/shared/Image';

const NavigationBar: React.FC = () => {
    const location = useLocation();
    const { isDark, setIsDark } = useColorScheme();
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
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
