import { LayoutDashboard, User } from 'lucide-react';

import { PageListType } from '@/components/layout/AdminNavigationList/type';

export const pageList: PageListType[] = [
    {
        name: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        name: 'Employee Management',
        href: '/admin/employee-management',
        icon: User,
    },
];
