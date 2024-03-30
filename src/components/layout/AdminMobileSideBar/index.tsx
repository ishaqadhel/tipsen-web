'use client';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

import AdminNavigationList from '@/components/layout/AdminNavigationList';

type MobileNavigationProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
};

type AdminMobileSideBarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
};

function MobileNavigationList({
    sidebarOpen,
    setSidebarOpen,
}: MobileNavigationProps) {
    return (
        <Transition.Root show={sidebarOpen} as={React.Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 z-[300] flex lg:hidden'
                onClose={() => setSidebarOpen(false)}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter='transition-opacity ease-linear duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='transition-opacity ease-linear duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <Dialog.Overlay className='fixed inset-0 bg-white bg-opacity-75' />
                </Transition.Child>
                <Transition.Child
                    as={React.Fragment}
                    enter='transition ease-in-out duration-300 transform'
                    enterFrom='-translate-y-full'
                    enterTo='translate-y-0'
                    leave='transition ease-in-out duration-300 transform'
                    leaveFrom='translate-y-0'
                    leaveTo='-translate-y-full'
                >
                    <div className='relative flex flex-col flex-1 pt-3 pb-5 bg-white top-14 h-max'>
                        <nav className='flex-1 overflow-y-auto'>
                            <ul className='px-10 space-y-5'>
                                <AdminNavigationList />
                            </ul>
                        </nav>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}

export default function AdminMobileSideBar({
    setSidebarOpen,
    sidebarOpen,
}: AdminMobileSideBarProps) {
    return (
        <>
            <MobileNavigationList
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
            />
        </>
    );
}
