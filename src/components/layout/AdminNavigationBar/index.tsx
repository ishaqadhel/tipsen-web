import { LucideAlignJustify, Power, User, X } from 'lucide-react';
import * as React from 'react';
import { Tooltip } from 'react-tooltip';

import Typography from '@/components/shared/Typography';

import useAdminLayoutStore from '@/providers/store/useAdminLayoutStore';
import { mergeTailwindClassName } from '@/services/mergeTailwindClassName';

type Props = {
    pageTitle?: string;
    withBottomBorder?: boolean;
    itemComponent?: React.ReactNode;
};

const AdminNavigationBar: React.FC<Props> = ({
    pageTitle,
    withBottomBorder = true,
    itemComponent,
}) => {
    //#region  //*=========== Store ===========
    const { isMobileSideBarOpen, setIsMobileSideBarOpen } =
        useAdminLayoutStore();
    //#endregion  //*======== Store ===========

    return (
        <header
            className={mergeTailwindClassName(
                'border-b-burnt-sienna-500 fixed z-[200] w-full space-y-5 bg-white p-4 lg:border-b-2',
                withBottomBorder && 'border-b-2',
            )}
        >
            <div className='flex items-center justify-between'>
                <div className='fixed z-[200] flex items-center bg-white px-3 py-4 lg:hidden'>
                    <div className='absolute z-50'>
                        {isMobileSideBarOpen ? (
                            <X
                                className='w-6 text-burnt-sienna-500'
                                onClick={() => setIsMobileSideBarOpen(false)}
                            />
                        ) : (
                            <LucideAlignJustify
                                className='w-6 text-burnt-sienna-500'
                                onClick={() => setIsMobileSideBarOpen(true)}
                            />
                        )}
                    </div>
                </div>

                <LucideAlignJustify className='invisible w-6 text-burnt-sienna-500 lg:hidden' />
                <Typography variant='b1' className='text-burnt-sienna-500 '>
                    TIPSEN APP
                </Typography>
                {pageTitle && (
                    <Typography
                        variant='h1'
                        className='hidden text-burnt-sienna-500 lg:block'
                    >
                        {pageTitle}
                    </Typography>
                )}
                <User
                    data-tooltip-id='profile-menu'
                    data-tooltip-place='bottom'
                    data-tooltip-variant='light'
                    className='w-8 rounded-full'
                />
                <Tooltip
                    id='profile-menu'
                    openOnClick={true}
                    clickable={true}
                    className='dark:bg-dark'
                >
                    <div className='border rounded-md'>
                        <div className='p-4'>
                            <Typography variant='h6'>User</Typography>
                            <Typography variant='b3'>
                                Fullstack Developer
                            </Typography>
                        </div>
                        <hr className='w-full border' />
                        <div className='p-4 space-y-2'>
                            <div className='flex items-center space-x-4'>
                                <Power className='w-4' />
                                <Typography variant='b3'>Logout</Typography>
                            </div>
                        </div>
                    </div>
                </Tooltip>
            </div>
            {pageTitle && (
                <div className='text-center lg:hidden'>
                    <Typography variant='h1' className='text-burnt-sienna-500'>
                        {pageTitle}
                    </Typography>
                </div>
            )}
            {itemComponent}
        </header>
    );
};

export default AdminNavigationBar;
