import * as React from 'react';

import AdminDesktopNavigation from '@/components/layout/AdminDesktopNavigation';

const AdminDesktopSideBar: React.FC = () => {
    return (
        <div className='hidden lg:fixed lg:inset-y-0 lg:top-10 lg:flex lg:w-56 lg:flex-col'>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className='flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r-2 border-primary-500'>
                <div className='flex flex-col flex-grow mt-5'>
                    <nav className='flex-1 pb-4 space-y-1'>
                        <AdminDesktopNavigation />
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AdminDesktopSideBar;
