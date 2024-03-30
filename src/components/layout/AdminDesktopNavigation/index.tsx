import { Disclosure } from '@headlessui/react';
import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import { pageList } from '@/components/layout/AdminNavigationList/data';
import { PageListType } from '@/components/layout/AdminNavigationList/type';
import UnstyledLink from '@/components/shared/UnstyledLink';

import { mergeTailwindClassName } from '@/services/mergeTailwindClassName';

function NestedNavigation({
    navigation: navChildren,
}: {
    navigation: PageListType;
}) {
    const location = useLocation();
    // Recursively check if any children is active
    function checkActive(nav?: PageListType[]): boolean {
        if (!nav) return false;

        const currentRoute: string = location.pathname;

        return nav.some((n) => {
            if (!n.children) {
                const isActive = n.exactMatch
                    ? currentRoute === n.href
                    : currentRoute.startsWith(n.href);

                return isActive;
            }

            return checkActive(n.children);
        });
    }
    return (
        <Disclosure as='div' defaultOpen={checkActive(navChildren.children)}>
            {({ open }) => (
                <div>
                    <Disclosure.Button
                        className={mergeTailwindClassName(
                            'hover:bg-burnt-sienna-500 hover:text-white',
                            'text-typo-burnt-sienna',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
                            'focus-visible:ring-burnt-sienna-500 focus-visible:ring-offset-burnt-sienna-500 focus:outline-none  focus-visible:ring-2',
                            'transition duration-100',
                        )}
                    >
                        <navChildren.icon
                            className={mergeTailwindClassName(
                                'mr-1.5 flex-shrink-0',
                                'text-typo-secondary text-lg group-hover:text-white',
                                open && 'mt-[1px] self-start',
                            )}
                            aria-hidden='true'
                        />
                        <span
                            className={mergeTailwindClassName(
                                'text-left',
                                !open && 'truncate',
                            )}
                        >
                            {navChildren.name}
                        </span>
                        <FiChevronDown
                            className={mergeTailwindClassName(
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
    navigation: PageListType;
    className?: string;
}) {
    const location = useLocation();
    const currentRoute: string = location.pathname;

    const isActive = navigation.exactMatch
        ? currentRoute === navigation.href
        : currentRoute.startsWith(navigation.href);
    return (
        <UnstyledLink
            href={navigation.href}
            className={mergeTailwindClassName(
                isActive
                    ? 'bg-burnt-sienna-600 text-white'
                    : 'text-typo-burnt-sienna hover:bg-burnt-sienna-500 hover:text-white',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                'focus-visible:ring-offset-secondary-500 focus:outline-none focus-visible:ring-2  focus-visible:ring-green-500',
                'transition duration-100',
                className,
            )}
            aria-current={isActive ? 'page' : undefined}
        >
            <navigation.icon
                className={mergeTailwindClassName(
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

const AdminDesktopNavigation: React.FC = () => {
    return (
        <nav className={mergeTailwindClassName('px-2 lg:px-3')}>
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
};

export default AdminDesktopNavigation;
