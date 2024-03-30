import clsx from 'clsx';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import Input from '@/components/shared/Input';
import Typography from '@/components/shared/Typography';

import BaseLayout from '@/layouts/Base';

type LoginRequestType = {
    code: string;
    password: string;
};

const LoginPage: React.FC = () => {
    //#region  //*=========== Form ===========
    const method = useForm<LoginRequestType>({
        mode: 'onTouched',
    });
    const { handleSubmit } = method;

    const onSubmit = async (data: LoginRequestType) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };
    //#endregion  //*======== Form ===========
    return (
        <BaseLayout pageTitle='Login' withoutNavBarAndFooter withoutPaddingTop>
            <section
                className={clsx(
                    'layout relative flex min-h-screen flex-col items-center justify-center space-y-5',
                )}
            >
                <FormProvider {...method}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col space-y-3'
                    >
                        <Card className=''>
                            <div className='space-y-5'>
                                <Typography
                                    variant='s1'
                                    className='text-center'
                                >
                                    Login to Tipsen App
                                </Typography>
                                <Input
                                    id='code'
                                    label='Employee Code'
                                    validation={{
                                        required: 'Employee code is required',
                                    }}
                                />
                                <Input
                                    id='password'
                                    label='Password'
                                    type='password'
                                    validation={{
                                        required: 'Password is required',
                                    }}
                                />
                                <div className='flex items-center w-full'>
                                    <Button
                                        variant='primary'
                                        className='flex items-center justify-center w-full'
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </form>
                </FormProvider>
            </section>
        </BaseLayout>
    );
};

export default LoginPage;
