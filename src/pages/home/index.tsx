import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { CalendarDays, Check, CircleAlert, Hand, Users } from 'lucide-react';
import moment from 'moment';
import * as React from 'react';

import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import SpinnerLoading from '@/components/shared/SpinnerLoading';
import Typography from '@/components/shared/Typography';
import withAuth from '@/components/shared/withAuth';

import BaseLayout from '@/layouts/Base';
import CreateAttendanceModal from '@/pages/home/components/shared/CreateAttendanceModal';
import useHomePageStore from '@/pages/home/providers/store/useHomePageStore';
import useAuthorizationStore from '@/providers/store/useAuthorizationStore';
import api from '@/services/axios';

import { Attendance } from '@/types/apis/attendance/type';
import { ApiReturnType } from '@/types/apis/common/type';

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

    //#region  //*=========== Store ===========
    const { setIsCreateModalOpen } = useHomePageStore();
    const { user } = useAuthorizationStore();
    //#endregion  //*======== Store ===========

    //#region  //*=========== Query Today Attendance ===========
    const url = `/attendance/user/${user?.id}/today`;
    const {
        data: queryData,
        isLoading: isLoadingData,
        refetch,
        isRefetching,
    } = useQuery<ApiReturnType<Attendance>, Error>([url], {
        keepPreviousData: true,
        queryFn: async () => api.get(url).then((res) => res.data),
    });
    const datas = queryData?.data;
    //#endregion  //*======== Query Today Attendance ===========

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
                            <Typography variant='s1'>{user?.name}</Typography>
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
                {isLoadingData || isRefetching ? (
                    <SpinnerLoading />
                ) : datas ? (
                    <Card className='w-full'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <Check className='w-6 h-6 mr-2 text-black dark:text-white' />
                                <Typography variant='s1'>
                                    Already submit attendance today.
                                </Typography>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card className='w-full'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <CircleAlert className='w-6 h-6 mr-2 text-black dark:text-white' />
                                <Typography variant='s1'>
                                    You haven't submit attendance today.
                                </Typography>
                            </div>
                            <Button onClick={() => setIsCreateModalOpen(true)}>
                                Submit Attendance
                            </Button>
                        </div>
                    </Card>
                )}

                <CreateAttendanceModal refetch={refetch} />
            </section>
        </BaseLayout>
    );
};

export default withAuth(HomePage, 'all');
