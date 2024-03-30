import { User } from 'lucide-react';
import * as React from 'react';

import Typography from '@/components/shared/Typography';

type Props = {
    title: string;
    subTitle?: string;
};

const StatisticCardWithPicture: React.FC<Props> = ({ title, subTitle }) => {
    return (
        <div className='flex items-center p-2 space-x-2 rounded-lg bg-burnt-sienna-100'>
            <User className='text-black dark:text-white' />
            <div className='space-y-1'>
                <Typography variant='h5'>{title}</Typography>
                {subTitle && <Typography variant='c1'>{subTitle}</Typography>}
            </div>
        </div>
    );
};

export default StatisticCardWithPicture;
