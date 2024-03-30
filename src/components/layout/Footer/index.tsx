import * as React from 'react';
import {
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaMailBulk,
    FaTwitter,
} from 'react-icons/fa';

import UnstyledLink from '@/components/shared/UnstyledLink';

type Props = {
    dummy?: string;
};

const Footer: React.FC<Props> = () => {
    return (
        <footer className='py-10 text-center layout'>
            <div className='flex justify-center py-5 space-x-5 text-3xl'>
                <UnstyledLink href='mailto:ishaq.adhel@gmail.com'>
                    <FaMailBulk className='text-black dark:text-white hover:text-burnt-sienna-600' />
                </UnstyledLink>
                <UnstyledLink href='https://github.com/ishaqadhel'>
                    <FaGithub className='text-black dark:text-white hover:text-burnt-sienna-600' />
                </UnstyledLink>
                <UnstyledLink href='https://www.linkedin.com/in/ishaq-adheltyo-b53832106/'>
                    <FaLinkedinIn className='text-black dark:text-white hover:text-burnt-sienna-600' />
                </UnstyledLink>
                <UnstyledLink href='https://instagram.com/ishaqadhel'>
                    <FaInstagram className='text-black dark:text-white hover:text-burnt-sienna-600' />
                </UnstyledLink>
                <UnstyledLink href='https://x.com/ishaqadhel'>
                    <FaTwitter className='text-black dark:text-white hover:text-burnt-sienna-600' />
                </UnstyledLink>
            </div>
            <p className='text-center text-black dark:text-white'>
                © Tipsen App - Ishaq Adheltyo
            </p>
        </footer>
    );
};

export default Footer;
