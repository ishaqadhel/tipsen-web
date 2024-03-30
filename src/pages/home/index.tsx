import clsx from 'clsx';
import { CalendarDays, CircleAlert, Hand, Users } from 'lucide-react';
import moment from 'moment';
import * as React from 'react';

import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import Typography from '@/components/shared/Typography';

import BaseLayout from '@/layouts/Base';

const HomePage: React.FC = () => {
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
        <BaseLayout pageTitle='Home'>
            <section
                className={clsx(
                    'layout relative flex min-h-screen flex-col items-center justify-center space-y-5',
                )}
            >
                <Card className='w-full'>
                    <div className='flex items-center'>
                        <Hand className='w-6 h-6 mr-2 text-black dark:text-white' />
                        <Typography variant='s1'>
                            Hello, Welcome To Tipsen App.
                        </Typography>
                    </div>
                </Card>
                <div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-2'>
                    <Card className='w-full'>
                        <div className='flex items-center'>
                            <Users className='w-6 h-6 mr-2 text-black dark:text-white' />
                            <Typography variant='s1'>
                                User - Fullstack Developer
                            </Typography>
                        </div>
                    </Card>
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
                <Card className='w-full'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <CircleAlert className='w-6 h-6 mr-2 text-black dark:text-white' />
                            <Typography variant='s1'>
                                You haven't submit attendance today.
                            </Typography>
                        </div>
                        <Button>Submit Attendance</Button>
                    </div>
                </Card>
            </section>
        </BaseLayout>
    );
};

export default HomePage;
