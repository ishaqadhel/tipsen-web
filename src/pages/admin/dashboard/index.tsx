import { CalendarDays } from 'lucide-react';
import moment from 'moment';
import * as React from 'react';

import Card from '@/components/shared/Card';
import Typography from '@/components/shared/Typography';
import withAuth from '@/components/shared/withAuth';

import AdminLayout from '@/layouts/Admin';

const AdminDashboardPage: React.FC = () => {
    //#region  //*=========== Time ===========
    const [currentDate, setCurrentDate] = React.useState(new Date());
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    //#endregion  //*======== Time ===========
    return (
        <AdminLayout pageTitle='Admin Dashboard'>
            <section className='layout'>
                <Card title='Hello Admin!' withoutAnimation>
                    <div className='space-y-5'>
                        <Card className='w-full'>
                            <div className='flex items-center'>
                                <CalendarDays className='w-6 h-6 mr-2 text-black dark:text-white' />
                                <Typography variant='s1'>
                                    {moment(currentDate).format(
                                        'dddd, MMMM Do YYYY h:mm:ss a',
                                    )}
                                </Typography>
                            </div>
                        </Card>
                    </div>
                </Card>
            </section>
        </AdminLayout>
    );
};

export default withAuth(AdminDashboardPage, 'all');
