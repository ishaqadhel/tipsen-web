'use client';

import * as React from 'react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
import { HiX } from 'react-icons/hi';

export default function DismissableToast() {
    return (
        <div>
            <Toaster
                reverseOrder={false}
                position='top-center'
                toastOptions={{
                    className: 'font-medium rounded-lg',
                }}
            >
                {(t) => (
                    <ToastBar toast={t}>
                        {({ icon, message }) => (
                            <>
                                {icon}
                                {message}
                                {t.type !== 'loading' && (
                                    <button
                                        className='p-1 transition rounded-full ring-primary-400 hover:bg-light focus:outline-none focus-visible:ring'
                                        onClick={() => toast.dismiss(t.id)}
                                    >
                                        <HiX />
                                    </button>
                                )}
                            </>
                        )}
                    </ToastBar>
                )}
            </Toaster>
        </div>
    );
}
