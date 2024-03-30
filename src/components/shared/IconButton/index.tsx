import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import { mergeTailwindClassName } from '@/services/mergeTailwindClassName';

const IconButtonVariant = [
    'primary',
    'outline',
    'ghost',
    'light',
    'dark',
    'success',
] as const;

const IconButtonSize = ['xs', 'sm', 'base', 'md', 'lg'] as const;

type IconButtonProps = {
    isLoading?: boolean;
    isDarkBg?: boolean;
    variant?: (typeof IconButtonVariant)[number];
    icon?: IconType | LucideIcon;
    classNames?: {
        icon?: string;
    };
    size?: (typeof IconButtonSize)[number];
} & React.ComponentPropsWithRef<'button'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            className,
            disabled: buttonDisabled,
            isLoading,
            variant = 'primary',
            isDarkBg = false,
            size = 'base',
            icon: Icon,
            classNames,
            ...rest
        },
        ref,
    ) => {
        const disabled = isLoading || buttonDisabled;

        return (
            <button
                ref={ref}
                type='button'
                disabled={disabled}
                className={mergeTailwindClassName(
                    'inline-flex items-center justify-center rounded font-medium',
                    'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
                    'shadow-sm',
                    'transition-colors duration-75',
                    'min-h-[28px] min-w-[28px] p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
                    [
                        size === 'lg' && [
                            'min-h-[3.25rem] min-w-[3.25rem] md:min-h-[3.5rem] md:min-w-[3.5rem]',
                            'text-base',
                        ],
                        size === 'md' && [
                            'min-h-[2.75rem] min-w-[2.75rem] md:min-h-[3rem] md:min-w-[3rem]',
                            'text-base',
                        ],
                        size === 'base' && [
                            'min-h-[2.25rem] min-w-[2.25rem] md:min-h-[2.5rem] md:min-w-[2.5rem]',
                            'text-sm md:text-base',
                        ],
                        size === 'sm' && [
                            'min-h-[1.75rem] min-w-[1.75rem] md:min-h-[2rem] md:min-w-[2rem]',
                            'text-xs md:text-sm',
                        ],
                        size === 'xs' && ['p-1', 'text-xs md:text-sm'],
                    ],
                    //#region  //*=========== Variants ===========
                    [
                        variant === 'primary' && [
                            'bg-burnt-sienna-500 text-white',
                            'border-burnt-sienna-500 border',
                            'hover:bg-burnt-sienna-600 hover:text-white',
                            'active:bg-burnt-sienna-700',
                            'disabled:bg-burnt-sienna-700',
                        ],
                        variant === 'outline' && [
                            'text-burnt-sienna-500',
                            'border-burnt-sienna-500 border',
                            'hover:bg-burnt-sienna-50 active:bg-burnt-sienna-100 disabled:bg-burnt-sienna-100',
                            isDarkBg &&
                                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
                        ],
                        variant === 'ghost' && [
                            'text-burnt-sienna-500',
                            'shadow-none',
                            'hover:bg-burnt-sienna-50 active:bg-burnt-sienna-100 disabled:bg-burnt-sienna-100',
                            isDarkBg &&
                                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
                        ],
                        variant === 'light' && [
                            'bg-white text-gray-700',
                            'border border-gray-300',
                            'hover:text-dark hover:bg-gray-100',
                            'active:bg-white/80 disabled:bg-gray-200',
                        ],
                        variant === 'dark' && [
                            'bg-gray-900 text-white',
                            'border border-gray-600',
                            'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
                        ],
                        variant === 'success' && [
                            'bg-green-600 text-white',
                            'border border-green-600',
                            'hover:bg-green-700 hover:text-white',
                            'active:bg-green-800',
                            'disabled:bg-green-800',
                            'focus-visible:ring-green-500',
                        ],
                    ],
                    //#endregion  //*======== Variants ===========
                    'disabled:cursor-not-allowed',
                    isLoading &&
                        'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
                    className,
                )}
                {...rest}
            >
                {isLoading && (
                    <div
                        className={mergeTailwindClassName(
                            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                            {
                                'text-white': ['primary', 'dark'].includes(
                                    variant,
                                ),
                                'text-black': ['light'].includes(variant),
                                'text-primary-500': [
                                    'outline',
                                    'ghost',
                                ].includes(variant),
                            },
                        )}
                    >
                        <ImSpinner2 className='animate-spin' />
                    </div>
                )}
                {Icon && (
                    <Icon
                        size='1em'
                        className={mergeTailwindClassName(classNames?.icon)}
                    />
                )}
            </button>
        );
    },
);

export default IconButton;
