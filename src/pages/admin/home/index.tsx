import * as React from 'react';

import Card from '@/components/shared/Card';
import StatisticCardWithPicture from '@/components/shared/StatisticCardWithPicture';

import AdminLayout from '@/layouts/Admin';

const AdminHomePage: React.FC = () => {
    return (
        <AdminLayout pageTitle='Home'>
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

export default AdminHomePage;
