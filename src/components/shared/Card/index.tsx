import * as React from 'react';

import { mergeTailwindClassName } from '@/services/mergeTailwindClassName';

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Card: React.FC<Props> = ({ children, className }) => {
    return (
        <div
            className={mergeTailwindClassName(
                'p-4 space-y-6 border border-gray-300 rounded group hover:scale-105 hover:transition hover:duration-100',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Card;
