import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
    useMutation,
} from '@tanstack/react-query';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useMutationToast from '@/hooks/useMutationToast';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';

import useEmployeeManagementHomePageStore from '@/pages/admin/employee-management/home/providers/store/useEmployeeManagementHomePageStore';
import api from '@/services/axios';

import { User } from '@/types/apis/authentication/type';
import { ApiReturnPaginationType } from '@/types/apis/common/type';

type CreateUserRequest = {
    name: string;
    email: string;
    password: string;
    gender: string;
    is_admin: boolean;
    position_id: number;
};

type Props = {
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => Promise<QueryObserverResult<ApiReturnPaginationType<User[]>, Error>>;
};

const UserCreateModal: React.FC<Props> = ({ refetch }) => {
    //#region  //*=========== Store ===========
    const { isCreateModalOpen, setIsCreateModalOpen } =
        useEmployeeManagementHomePageStore();
    //#endregion  //*======== Store ===========

    //#region  //*=========== Form ===========
    const method = useForm<CreateUserRequest>({
        mode: 'onTouched',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            gender: '',
            position_id: 1,
        },
    });
    const { handleSubmit } = method;

    const { mutateAsync: addUser, isLoading } = useMutationToast<
        void,
        CreateUserRequest
    >(
        useMutation((data) => {
            return api.post('/master-data/user', data).then(() => {
                method.reset();
                refetch();
                setIsCreateModalOpen(false);
            });
        }),
        {
            success: 'User has been created',
        },
    );

    const onSubmit = async (data: CreateUserRequest) => {
        // eslint-disable-next-line no-console
        console.log(data);
        await addUser(data);
    };
    //#endregion  //*======== Form ===========

    return (
        <Modal
            open={isCreateModalOpen}
            setOpen={() => setIsCreateModalOpen(false)}
            title='CREATE EMPLOYEE'
        >
            <FormProvider {...method}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col space-y-3'
                >
                    <Modal.Section>
                        <div className='p-4 space-y-4'>
                            <Input
                                id='name'
                                label='Name'
                                validation={{ required: 'Field is required' }}
                            />
                            <Input
                                id='email'
                                label='Email'
                                validation={{ required: 'Field is required' }}
                            />
                            <Input
                                id='password'
                                label='Password'
                                type='password'
                                validation={{ required: 'Field is required' }}
                            />
                            <Input
                                id='gender'
                                label='Gender'
                                validation={{ required: 'Field is required' }}
                            />
                        </div>
                    </Modal.Section>
                    <Modal.Section>
                        <div className='flex items-center justify-between'>
                            <div>
                                <Button
                                    variant='light'
                                    onClick={() => setIsCreateModalOpen(false)}
                                >
                                    Back
                                </Button>
                            </div>
                            <div className='flex items-center space-x-4'>
                                <Button
                                    variant='primary'
                                    type='submit'
                                    isLoading={isLoading}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Modal.Section>
                </form>
            </FormProvider>
        </Modal>
    );
};

export default UserCreateModal;
