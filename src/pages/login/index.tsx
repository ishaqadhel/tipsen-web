import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import useMutationToast from '@/hooks/useMutationToast';

import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import Input from '@/components/shared/Input';
import Typography from '@/components/shared/Typography';
import withAuth from '@/components/shared/withAuth';

import BaseLayout from '@/layouts/Base';
import useAuthorizationStore from '@/providers/store/useAuthorizationStore';
import api from '@/services/axios';

import { User } from '@/types/apis/authentication/type';
import { ApiReturnType } from '@/types/apis/common/type';

type LoginRequestType = {
    email: string;
    password: string;
};

const LoginPage: React.FC = () => {
    //#region  //*=========== Store ===========
    const { login } = useAuthorizationStore();
    //#endregion  //*======== Store ===========

    //#region  //*=========== Nav ===========
    const navigate = useNavigate();
    //#endregion  //*======== Nav ===========

    //#region  //*=========== Form ===========
    const method = useForm<LoginRequestType>({
        mode: 'onTouched',
    });
    const { handleSubmit } = method;

    const { mutateAsync: postLogin, isLoading } = useMutationToast<
        void,
        LoginRequestType
    >(
        useMutation((data) => {
            const data_send = {
                email: data.email,
                password: data.password,
            };
            return api
                .post('/authentication/login', data_send)
                .then(async (res) => {
                    const token = res.data.data;
                    localStorage.setItem('token', token);

                    const user =
                        await api.get<ApiReturnType<User>>(
                            '/authentication/me',
                        );
                    login({
                        ...user.data.data,
                    });
                    if (user.data.data.is_admin) {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/');
                    }
                });
        }),
        {
            success: 'Berhasil masuk',
        },
    );

    const onSubmit = async (data: LoginRequestType) => {
        // eslint-disable-next-line no-console
        console.log(data);
        await postLogin(data);
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
                                    id='email'
                                    label='Employee Email'
                                    validation={{
                                        required: 'Employee email is required',
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
                                        type='submit'
                                        isLoading={isLoading}
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

export default withAuth(LoginPage, 'auth');
