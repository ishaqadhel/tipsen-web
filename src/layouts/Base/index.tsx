import * as React from 'react';

type Props = {
    pageTitle?: string;
    children: React.ReactNode;
};

const BaseLayout: React.FC<Props> = ({ pageTitle, children }) => {
    React.useEffect(() => {
        let title = 'Tipsen App';
        if (pageTitle) title = `${pageTitle} | ${title}`;
        document.title = title;
    }, []);

    return <main>{children}</main>;
};

export default BaseLayout;
