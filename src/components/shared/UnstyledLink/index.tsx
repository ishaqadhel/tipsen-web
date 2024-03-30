import * as React from 'react';
import { Link } from 'react-router-dom';

import { mergeTailwindClassName } from '@/services/mergeTailwindClassName';

export type UnstyledLinkProps = {
    href: string;
    children: React.ReactNode;
    openNewTab?: boolean;
    className?: string;
} & React.ComponentPropsWithRef<'a'>;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
    ({ children, href, openNewTab, className, ...rest }, ref) => {
        const isNewTab =
            openNewTab !== undefined
                ? openNewTab
                : href && !href.startsWith('/') && !href.startsWith('#');

        if (!isNewTab) {
            return (
                <Link to={href} ref={ref} className={className} {...rest}>
                    {children}
                </Link>
            );
        }

        return (
            <a
                ref={ref}
                target='_blank'
                rel='noopener noreferrer'
                href={href}
                {...rest}
                className={mergeTailwindClassName('cursor-newtab', className)}
            >
                {children}
            </a>
        );
    },
);

export default UnstyledLink;
