'use client';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';
import { FiChevronDown } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import { pageList } from '@/components/layout/AdminNavigationList/data';
import UnstyledLink from '@/components/shared/UnstyledLink';

import { mergeTailwindClassName } from '@/services/mergeTailwindClassName';

export type Navigation = {
    name: string;
    href: string;
    icon: IconType | LucideIcon;
    /**
     * Use this when the route is also used as a nested route
     * @example Use exactMatch for '/dashboard' to avoid both navigation links active when visiting '/dashboard/edit'
     */
    exactMatch?: boolean;
    children?: Navigation[];
    avatar?: string;
    action?: () => void;
};

type NavigationProps = React.ComponentPropsWithoutRef<'nav'>;

export default function AdminNavigationList({
    className,
    ...rest
}: NavigationProps) {
    return (
        <nav className={mergeTailwindClassName(className)} {...rest}>
            <div className='space-y-1.5'>
                {pageList.map((nav) => {
                    return nav.children ? (
                        <NestedNavigation key={nav.name} navigation={nav} />
                    ) : (
                        <NavigationLink key={nav.name} navigation={nav} />
                    );
                })}
            </div>
        </nav>
    );
}

function NestedNavigation({
    navigation: navChildren,
}: {
    navigation: Navigation;
}) {
    const location = useLocation();

    // Recursively check if any children is active
    function checkActive(nav?: Navigation[]): boolean {
        if (!nav) return false;

        return nav.some((n) => {
            if (!n.children) {
                const isActive = n.exactMatch
                    ? location.pathname === n.href
                    : location.pathname.startsWith(n.href);

                return isActive;
            }

            return checkActive(n.children);
        });
    }
    return (
        <Disclosure as='div' defaultOpen={checkActive(navChildren.children)}>
            {({ open }) => (
                <div
                    className={`rounded-xl ${open ? 'md:bg-burnt-sienna-500' : ''}`}
                >
                    <Disclosure.Button
                        className={clsx(
                            'hover:bg-burnt-sienna-600 hover:text-white ',
                            'text-typo-burnt-sienna',
                            'group flex w-full items-center rounded-xl px-2 py-2 text-sm font-medium',
                            'focus-visible:ring-burnt-sienna-500 focus-visible:ring-offset-burnt-sienna-500 focus:outline-none focus-visible:ring-2',
                            'transition duration-100',
                        )}
                    >
                        <navChildren.icon
                            className={clsx(
                                'mr-1.5 flex-shrink-0',
                                'text-typo-secondary text-lg group-hover:text-white',
                                open && 'mt-[1px] self-start',
                            )}
                            aria-hidden='true'
                        />
                        <span
                            className={clsx('text-left', !open && 'truncate')}
                        >
                            {navChildren.name}
                        </span>
                        <FiChevronDown
                            className={clsx(
                                'flex-shrink-0',
                                'text-typo-icons ml-auto text-lg group-hover:text-white',
                                open && 'mt-[1px] rotate-180 self-start',
                            )}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className='ml-5 mt-0.5'>
                        {navChildren.children?.map((nav) =>
                            nav.children ? (
                                <NestedNavigation
                                    key={nav.name}
                                    navigation={nav}
                                />
                            ) : (
                                <NavigationLink
                                    key={nav.name}
                                    navigation={nav}
                                />
                            ),
                        )}
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
}

function NavigationLink({
    navigation,
    className,
}: {
    navigation: Navigation;
    className?: string;
}) {
    const location = useLocation();

    const isActive = navigation.exactMatch
        ? location.pathname === navigation.href
        : location.pathname.startsWith(navigation.href);
    return (
        <UnstyledLink
            href={navigation.href}
            className={mergeTailwindClassName(
                isActive
                    ? 'bg-burnt-sienna-600 text-white'
                    : 'text-typo-burnt-sienna hover:bg-burnt-sienna-600 hover:text-white',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                'focus:outline-none focus-visible:outline-none ',
                'transition duration-100',
                className,
            )}
            aria-current={isActive ? 'page' : undefined}
        >
            <navigation.icon
                className={clsx(
                    'mr-1.5 flex-shrink-0',
                    'text-lg group-hover:text-white',
                    isActive ? 'text-white' : 'text-typo-secondary',
                )}
                aria-hidden='true'
            />
            <span className='truncate'>{navigation.name}</span>
        </UnstyledLink>
    );
}
