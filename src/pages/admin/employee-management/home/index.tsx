import { Plus } from 'lucide-react';
import * as React from 'react';

import Card from '@/components/shared/Card';
import IconButton from '@/components/shared/IconButton';
import StatisticCardWithPicture from '@/components/shared/StatisticCardWithPicture';

import AdminLayout from '@/layouts/Admin';

const AdminEmployeeManagementPage: React.FC = () => {
    return (
        <AdminLayout pageTitle='Admin Employee Management'>
            <section className='layout'>
                <Card title='User Recently Attendance' withoutAnimation>
                    <div className='space-y-5'>
                        <StatisticCardWithPicture
                            title='Users'
                            subTitle='23 Maret 2024 12:00 PM'
                        />
                    </div>
                </Card>
            </section>
            <div className='fixed bottom-4 right-4'>
                <div className='flex items-center space-x-2'>
                    <IconButton variant='primary' icon={Plus} size='lg' />
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminEmployeeManagementPage;
