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
import InputFile from '@/components/shared/InputFile';
import Modal from '@/components/shared/Modal';

import useHomePageStore from '@/pages/home/providers/store/useHomePageStore';
import api from '@/services/axios';

import { Attendance } from '@/types/apis/attendance/type';
import { ApiReturnType } from '@/types/apis/common/type';

type CreateAttendanceRequestType = {
    notes?: string;
    file: FileList;
};

type Props = {
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => Promise<QueryObserverResult<ApiReturnType<Attendance>, Error>>;
};

const CreateAttendanceModal: React.FC<Props> = ({ refetch }) => {
    //#region  //*=========== Store ===========
    const { isCreateModalOpen, setIsCreateModalOpen } = useHomePageStore();
    //#endregion  //*======== Store ===========

    //#region  //*=========== Form ===========
    const method = useForm<CreateAttendanceRequestType>({
        mode: 'onTouched',
    });
    const { handleSubmit } = method;

    const { mutateAsync: addAttendance, isLoading } = useMutationToast<
        void,
        CreateAttendanceRequestType
    >(
        useMutation((data) => {
            const fileFormData = new FormData();
            fileFormData.append('file', data.file?.[0] ?? '');

            return api
                .post('/file', fileFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    const metaData = {
                        notes: data.notes,
                        proof_of_work_picture_url: res.data.data,
                    };

                    api.post('/attendance', metaData).then(() => {
                        refetch();
                        setIsCreateModalOpen(false);
                    });
                });
        }),
        {
            success: 'User has been created',
        },
    );

    const onSubmit = async (data: CreateAttendanceRequestType) => {
        // eslint-disable-next-line no-console
        console.log(data);
        await addAttendance(data);
    };
    //#endregion  //*======== Form ===========

    return (
        <Modal
            open={isCreateModalOpen}
            setOpen={() => setIsCreateModalOpen(false)}
            title='EMPLOYEE ATTENDANCE'
        >
            <FormProvider {...method}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col space-y-3'
                >
                    <Modal.Section>
                        <div className='p-4 space-y-4'>
                            <Input id='notes' label='Notes (Optional)' />
                            <InputFile
                                id='file'
                                label='Proof of Work'
                                validation={{
                                    required: 'Proof of work is required',
                                }}
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

export default CreateAttendanceModal;
