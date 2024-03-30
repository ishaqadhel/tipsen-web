import clsx from 'clsx';
import * as React from 'react';

import UnstyledLink from '@/components/shared/UnstyledLink';

type Props = {
    name: string;
    link: string;
    isActive?: boolean;
};

const MenuNavigationBar: React.FC<Props> = ({
    name,
    link,
    isActive = false,
}) => {
    return (
        <UnstyledLink href={link}>
            <p
                className={clsx(
                    'font-normal text-black dark:text-white',
                    isActive &&
                        'text-burnt-sienna-500 dark:text-burnt-sienna-500',
                )}
            >
                {name}
            </p>
        </UnstyledLink>
    );
};

export default MenuNavigationBar;
