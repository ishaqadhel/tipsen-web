import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import * as React from 'react';

import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import Image from '@/components/shared/Image';
import Modal from '@/components/shared/Modal';
import SpinnerLoading from '@/components/shared/SpinnerLoading';
import Typography from '@/components/shared/Typography';

import useEmployeeManagementHomePageStore from '@/pages/admin/employee-management/home/providers/store/useEmployeeManagementHomePageStore';
import api from '@/services/axios';

import { Attendance } from '@/types/apis/attendance/type';
import { ApiReturnType } from '@/types/apis/common/type';

const UserAttendanceModal: React.FC = () => {
    //#region  //*=========== Store ===========
    const { selectedUser, isAttendanceModalOpen, setIsAttendanceModalOpen } =
        useEmployeeManagementHomePageStore();
    //#endregion  //*======== Store ===========

    //#region  //*=========== Fetch Data ===========
    const url = `/attendance/user/${selectedUser?.id}`;
    const {
        data: queryData,
        isLoading,
        isRefetching,
    } = useQuery<ApiReturnType<Attendance[]>, Error>([url], {
        keepPreviousData: true,
        queryFn: async () => api.get(url).then((res) => res.data),
    });
    const datas = queryData?.data ?? [];
    //#endregion  //*======== Fetch Data ===========
    return (
        <Modal
            open={isAttendanceModalOpen}
            setOpen={() => setIsAttendanceModalOpen(false)}
            title={`${selectedUser?.name}'s Attendance`}
        >
            <Modal.Section>
                <div className='p-4 space-y-4'>
                    <div className='relative flex p-4 space-x-2 overflow-y-scroll rounded-lg'>
                        <div className='w-full space-y-2'>
                            {isLoading || isRefetching ? (
                                <SpinnerLoading />
                            ) : (
                                datas.map((attendance, index) => (
                                    <Card>
                                        <div className='space-y-1' key={index}>
                                            <Typography variant='h5'>
                                                Date{' '}
                                                {moment(
                                                    attendance.created_at,
                                                ).format('YYYY-MM-DD HH:mm:ss')}
                                            </Typography>
                                            <Typography variant='h6'>
                                                Notes:{' '}
                                                {attendance?.notes ?? '-'}
                                            </Typography>
                                            <Image
                                                src={
                                                    attendance.proof_of_work_picture_url
                                                }
                                                alt='proof'
                                                width={150}
                                                height={150}
                                            />
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </Modal.Section>
            <Modal.Section>
                <div className='flex items-center justify-between'>
                    <div>
                        <Button
                            variant='light'
                            onClick={() => setIsAttendanceModalOpen(false)}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </Modal.Section>
        </Modal>
    );
};

export default UserAttendanceModal;
