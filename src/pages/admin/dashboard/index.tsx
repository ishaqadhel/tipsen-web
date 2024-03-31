import * as React from 'react';

import Card from '@/components/shared/Card';
import StatisticCardWithPicture from '@/components/shared/StatisticCardWithPicture';
import withAuth from '@/components/shared/withAuth';

import AdminLayout from '@/layouts/Admin';

const AdminDashboardPage: React.FC = () => {
    return (
        <AdminLayout pageTitle='Admin Dashboard'>
            <section className='layout'>
                <Card title='User Recently Attendance' withoutAnimation>
                    <div className='space-y-5'>
                        <StatisticCardWithPicture
                            title='Users'
                            subTitle='23 Maret 2024 12:00 PM'
                        />
                        <StatisticCardWithPicture
                            title='Users'
                            subTitle='23 Maret 2024 12:00 PM'
                        />
                        <StatisticCardWithPicture
                            title='Users'
                            subTitle='23 Maret 2024 12:00 PM'
                        />
                        <StatisticCardWithPicture
                            title='Users'
                            subTitle='23 Maret 2024 12:00 PM'
                        />
                        <StatisticCardWithPicture
                            title='Users'
                            subTitle='23 Maret 2024 12:00 PM'
                        />
                    </div>
                </Card>
            </section>
        </AdminLayout>
    );
};

export default withAuth(AdminDashboardPage, 'all');
