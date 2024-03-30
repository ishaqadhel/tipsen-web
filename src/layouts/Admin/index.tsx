import * as React from 'react';

import AdminDesktopSideBar from '@/components/layout/AdminDesktopSideBar';
import AdminMobileSideBar from '@/components/layout/AdminMobileSideBar';
import AdminNavigationBar from '@/components/layout/AdminNavigationBar';

import useAdminLayoutStore from '@/providers/store/useAdminLayoutStore';
import { mergeTailwindClassName } from '@/services/mergeTailwindClassName';

type Props = {
    pageTitle?: string;
    children: React.ReactNode;
    navigationBarItemComponent?: React.ReactNode;
    withBottomBorder?: boolean;
    mainClassName?: string;
};

const AdminLayout: React.FC<Props> = ({
    children,
    pageTitle,
    navigationBarItemComponent,
    withBottomBorder = true,
    mainClassName,
}) => {
    //#region  //*=========== Store ===========
    const { isMobileSideBarOpen, setIsMobileSideBarOpen } =
        useAdminLayoutStore();
    //#endregion  //*======== Store ===========
    return (
        <>
            <AdminMobileSideBar
                sidebarOpen={isMobileSideBarOpen}
                setSidebarOpen={setIsMobileSideBarOpen}
            />
            <AdminDesktopSideBar />
            <AdminNavigationBar
                pageTitle={pageTitle}
                withBottomBorder={withBottomBorder}
                itemComponent={navigationBarItemComponent}
            />
            <main
                className={mergeTailwindClassName(
                    'pb-6 pt-36 lg:pl-56 lg:pt-24',
                    mainClassName,
                )}
            >
                {children}
            </main>
        </>
    );
};

export default AdminLayout;
