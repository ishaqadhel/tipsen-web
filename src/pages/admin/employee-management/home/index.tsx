import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import * as React from 'react';

import Button from '@/components/shared/Button';
import IconButton from '@/components/shared/IconButton';
import SpinnerLoading from '@/components/shared/SpinnerLoading';
import withAuth from '@/components/shared/withAuth';

import AdminLayout from '@/layouts/Admin';
import UserAttendanceModal from '@/pages/admin/employee-management/home/components/shared/UserAttendanceModal';
import UserCreateModal from '@/pages/admin/employee-management/home/components/shared/UserCreateModal';
import UserEditModal from '@/pages/admin/employee-management/home/components/shared/UserEditModal';
import UserInformationCard from '@/pages/admin/employee-management/home/components/shared/UserInformationCard';
import useEmployeeManagementHomePageStore from '@/pages/admin/employee-management/home/providers/store/useEmployeeManagementHomePageStore';
import api from '@/services/axios';

import { User } from '@/types/apis/authentication/type';
import { ApiReturnPaginationType } from '@/types/apis/common/type';

const AdminEmployeeManagementPage: React.FC = () => {
    //#region  //*=========== Fetch Data ===========
    const [url, setUrl] = React.useState('/master-data/user?limit=10&page=1');
    const [currentPage, setCurrentPage] = React.useState(0);
    const {
        data: queryData,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<ApiReturnPaginationType<User[]>, Error>([url], {
        keepPreviousData: true,
        queryFn: async () => api.get(url).then((res) => res.data),
    });
    const datas = queryData?.data.data ?? [];
    const metas = queryData?.data.meta ?? { last_page: 0, total: 0 };
    //#endregion  //*======== Fetch Data ===========

    //#region  //*=========== Store ===========
    const { setIsCreateModalOpen } = useEmployeeManagementHomePageStore();
    //#endregion  //*======== Store ===========

    React.useEffect(() => {
        refetch();
    }, [url]);

    return (
        <AdminLayout pageTitle='Admin Employee Management'>
            <section className='layout'>
                <div className='space-y-2'>
                    {isLoading || isRefetching ? (
                        <SpinnerLoading />
                    ) : (
                        datas.map((user, index) => (
                            <UserInformationCard
                                key={index}
                                user={user}
                                refetch={refetch}
                            />
                        ))
                    )}
                </div>
                <div className='flex items-center justify-center w-full my-4'>
                    <div className='flex space-x-2'>
                        {Array(metas.last_page)
                            .fill(null)
                            .map((_, index) => (
                                <Button
                                    key={index}
                                    variant={
                                        index + 1 === currentPage
                                            ? 'primary'
                                            : 'light'
                                    }
                                    size='sm'
                                    onClick={() => {
                                        setUrl(
                                            `/master-data/user?limit=10&page=${index + 1}`,
                                        );
                                        setCurrentPage(index + 1);
                                    }}
                                    className='flex items-center justify-center w-8 h-8'
                                    type='submit'
                                >
                                    {index + 1}
                                </Button>
                            ))}
                    </div>
                </div>
            </section>
            <div className='fixed bottom-4 right-4'>
                <div className='flex items-center space-x-2'>
                    <IconButton
                        variant='primary'
                        icon={Plus}
                        size='lg'
                        onClick={() => setIsCreateModalOpen(true)}
                    />
                </div>
            </div>
            <UserCreateModal refetch={refetch} />
            <UserEditModal refetch={refetch} />
            <UserAttendanceModal />
        </AdminLayout>
    );
};

export default withAuth(AdminEmployeeManagementPage, 'all');
