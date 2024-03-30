import clsx from 'clsx';
import * as React from 'react';

import Footer from '@/components/layout/Footer';
import NavigationBar from '@/components/layout/NavigationBar';

type Props = {
    pageTitle?: string;
    children: React.ReactNode;
    withoutPaddingTop?: boolean;
};

const BaseLayout: React.FC<Props> = ({
    pageTitle,
    children,
    withoutPaddingTop,
}) => {
    React.useEffect(() => {
        let title = 'Tipsen App';
        if (pageTitle) title = `${pageTitle} | ${title}`;
        document.title = title;
    }, []);

    return (
        <main className='bg-white dark:bg-dark'>
            <NavigationBar />
            <div className={clsx(!withoutPaddingTop && 'pt-20')}>
                {children}
            </div>
            <Footer />
        </main>
    );
};

export default BaseLayout;
