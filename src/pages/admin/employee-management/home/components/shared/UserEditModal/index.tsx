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

type EditUserRequest = {
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

const UserEditModal: React.FC<Props> = ({ refetch }) => {
    //#region  //*=========== Store ===========
    const {
        selectedUser,
        setSelectedUser,
        isEditModalOpen,
        setIsEditModalOpen,
    } = useEmployeeManagementHomePageStore();
    //#endregion  //*======== Store ===========

    //#region  //*=========== Form ===========
    const method = useForm<EditUserRequest>({
        mode: 'onTouched',
        defaultValues: {
            name: selectedUser?.name,
            email: selectedUser?.email,
            password: '',
            gender: selectedUser?.gender,
            position_id: 1,
        },
    });
    const { handleSubmit } = method;

    const { mutateAsync: addUser, isLoading } = useMutationToast<
        void,
        EditUserRequest
    >(
        useMutation((data) => {
            return api
                .patch(`/master-data/user/${selectedUser?.id}`, data)
                .then(() => {
                    method.reset();
                    refetch();
                    setSelectedUser(null);
                    setIsEditModalOpen(false);
                });
        }),
        {
            success: 'User has been edited',
        },
    );

    const onSubmit = async (data: EditUserRequest) => {
        // eslint-disable-next-line no-console
        console.log(data);
        await addUser(data);
    };

    React.useEffect(() => {
        if (selectedUser) {
            method.setValue('name', selectedUser?.name);
            method.setValue('email', selectedUser?.email);
            method.setValue('gender', selectedUser?.gender);
            method.setValue('position_id', 1);
        }
    }, [selectedUser]);
    //#endregion  //*======== Form ===========

    return (
        <Modal
            open={isEditModalOpen}
            setOpen={() => setIsEditModalOpen(false)}
            title='EDIT EMPLOYEE'
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
                                    onClick={() => setIsEditModalOpen(false)}
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

export default UserEditModal;
