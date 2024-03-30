import * as React from 'react';

import { menu } from '@/components/layout/NavigationBar/data';
import UnstyledLink from '@/components/shared/UnstyledLink';

type Props = {
    dummy?: string;
};

type MenuProps = {
    name: string;
    link: string;
    isLast: boolean;
};

const Menu: React.FC<MenuProps> = ({ name, link, isLast = false }) => {
    return (
        <div>
            <UnstyledLink href={link}>
                <div className='p-2 text-center text-black dark:text-white'>
                    <p className='text-xs text-black dark:text-white'>{name}</p>
                </div>
            </UnstyledLink>
            {!isLast && <hr className='border border-burnt-sienna-500' />}
        </div>
    );
};

const MobileMenuNavigationBar: React.FC<Props> = () => {
    return (
        <div className='border-burnt-sienna-500 rounded border bg-white dark:bg-[#161615]'>
            {menu.map((data, index) => (
                <Menu
                    link={data.path}
                    name={data.name}
                    key={data.name}
                    isLast={index + 1 === menu.length}
                />
            ))}
        </div>
    );
};

export default MobileMenuNavigationBar;
