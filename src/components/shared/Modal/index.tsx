import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import * as React from 'react';

import IconButton from '@/components/shared/IconButton';
import Typography from '@/components/shared/Typography';

import { mergeTailwindClassName } from '@/services/mergeTailwindClassName';

import { ExtractProps } from '@/types/helper';

type ModalProps = {
    className?: string;
    children: React.ReactNode;
    /** Use sm:max-w-xx to adjust max-width */
    modalContainerClassName?: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: React.ReactNode;
    titleClassName?: string;
} & Omit<ExtractProps<typeof Dialog>, 'onClose' | 'unmount'>;

export function ModalRoot({
    className,
    children,
    modalContainerClassName,
    open,
    setOpen,
    title,
    titleClassName,
    ...rest
}: ModalProps) {
    // Set initial focus to the container div instead of automatically focused to the close button
    const containerRef = React.createRef<HTMLDivElement>();

    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog
                as='div'
                className={mergeTailwindClassName(
                    'fixed inset-0 z-[250] overflow-y-auto',
                    className,
                )}
                {...rest}
                onClose={setOpen}
                initialFocus={containerRef}
            >
                <div
                    className='flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'
                    ref={containerRef}
                >
                    <Transition.Child
                        as={React.Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 transition-opacity bg-black bg-opacity-50' />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className='hidden sm:inline-block sm:h-screen sm:align-middle'
                        aria-hidden='true'
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={React.Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div
                            className={mergeTailwindClassName(
                                'align inline-block transform rounded-2xl bg-white dark:bg-dark text-left shadow-xl transition-all sm:align-middle',
                                'sm:w-11/12 sm:max-w-xl',
                                modalContainerClassName,
                            )}
                        >
                            <div className='w-full divide-y divide-typo-divider'>
                                <header className='flex items-center justify-between px-4 py-4 sm:px-6'>
                                    <Typography
                                        as={Dialog.Title}
                                        variant='h2'
                                        className={mergeTailwindClassName(
                                            'pr-2',
                                            titleClassName,
                                        )}
                                    >
                                        {title}
                                    </Typography>
                                    <IconButton
                                        onClick={() => setOpen(false)}
                                        variant='ghost'
                                        icon={X}
                                    />
                                </header>
                                {children}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

/**
 * defaults to p-4 sm:p-6, change it with className if needed
 */
function Section({
    className,
    children,
}: React.ComponentPropsWithoutRef<'div'>) {
    return (
        <div
            className={mergeTailwindClassName(
                'flex w-full flex-col',
                'p-4 sm:p-6',
                className,
            )}
        >
            {children}
        </div>
    );
}

const Modal = Object.assign(ModalRoot, { Section });
export default Modal;
