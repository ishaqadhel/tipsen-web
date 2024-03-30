import * as React from 'react';

import Typography from '@/components/shared/Typography';

import { mergeTailwindClassName } from '@/services/mergeTailwindClassName';

type Props = {
    children: React.ReactNode;
    className?: string;
    withoutAnimation?: boolean;
    rightTitleComponent?: React.ReactNode;
    title?: string;
    subTitle?: string;
};

const Card: React.FC<Props> = ({
    children,
    className,
    withoutAnimation,
    title,
    subTitle,
    rightTitleComponent,
}) => {
    return (
        <div
            className={mergeTailwindClassName(
                'p-4 space-y-6 border border-gray-300 rounded group',
                !withoutAnimation &&
                    'hover:scale-105 hover:transition hover:duration-100',
                className,
            )}
        >
            {title && (
                <div className='p-4 border-b border-typo-divider'>
                    <div className='flex items-center justify-between'>
                        <Typography variant='h3'>{title}</Typography>
                        {rightTitleComponent}
                    </div>

                    {subTitle && (
                        <Typography variant='b2'>{subTitle}</Typography>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
