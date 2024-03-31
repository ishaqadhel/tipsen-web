import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from '@tanstack/react-query';
import { MoreVertical, Pen } from 'lucide-react';
import * as React from 'react';
import { Tooltip } from 'react-tooltip';

import Typography from '@/components/shared/Typography';

import useEmployeeManagementHomePageStore from '@/pages/admin/employee-management/home/providers/store/useEmployeeManagementHomePageStore';

import { User } from '@/types/apis/authentication/type';
import { ApiReturnPaginationType } from '@/types/apis/common/type';

type Props = {
    user: User;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => Promise<QueryObserverResult<ApiReturnPaginationType<User[]>, Error>>;
};

const UserInformationCard: React.FC<Props> = ({ user }) => {
    //#region  //*=========== Store ===========
    const { setIsEditModalOpen, setSelectedUser } =
        useEmployeeManagementHomePageStore();
    //#endregion  //*======== Store ===========
    return (
        <div className='relative flex p-4 space-x-2 border rounded-lg'>
            <div className='space-y-2'>
                <div className='space-y-1'>
                    <Typography variant='h5'>{user.name}</Typography>
                    <Typography variant='h6'>
                        {user.deleted_at ? 'Not Active' : 'Active'}
                    </Typography>
                </div>
            </div>
            <Tooltip
                id={`user-management-card-${user.id}`}
                openOnClick={true}
                clickable={true}
                className='z-[600]'
            >
                <div className='p-4 space-y-2'>
                    <div
                        className='flex items-center space-x-4 cursor-pointer'
                        onClick={() => {
                            setSelectedUser(user);
                            setIsEditModalOpen(true);
                        }}
                    >
                        <Pen className='w-4' />
                        <Typography variant='b3'>Edit</Typography>
                    </div>
                </div>
            </Tooltip>
            <MoreVertical
                className='absolute w-6 h-6 right-4 top-4'
                data-tooltip-id={`user-management-card-${user.id}`}
                data-tooltip-place='bottom'
                data-tooltip-variant='light'
            />
        </div>
    );
};

export default UserInformationCard;
