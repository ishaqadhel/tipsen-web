import clsx from 'clsx';
import * as React from 'react';
import { ImSpinner8 } from 'react-icons/im';

type Props = {
    fullScreen?: boolean;
};

const SpinnerLoading: React.FC<Props> = ({ fullScreen }) => {
    return (
        <div
            className={clsx(
                'flex flex-col items-center justify-center  text-burnt-sienna-500',
                fullScreen && 'min-h-screen',
            )}
        >
            <ImSpinner8 className='mb-4 text-4xl animate-spin' />
            <p>Loading...</p>
        </div>
    );
};

export default SpinnerLoading;
