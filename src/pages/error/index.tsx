/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { useRouteError } from 'react-router-dom';

import Typography from '@/components/shared/Typography';

import BaseLayout from '@/layouts/Base';

const ErrorPage: React.FC = () => {
    const error = useRouteError();

    return (
        <BaseLayout>
            <div className='flex flex-col items-center justify-center min-h-screen text-center layout'>
                <RiAlarmWarningFill
                    size={60}
                    className='text-red-500 drop-shadow-glow animate-flicker'
                />
                <Typography className='my-8' variant='h1'>
                    {(error as any).statusText || (error as any).message}
                </Typography>
            </div>
        </BaseLayout>
    );
};

export default ErrorPage;
