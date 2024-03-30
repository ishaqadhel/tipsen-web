import * as React from 'react';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import InputFile from '@/components/shared/InputFile';
import Modal from '@/components/shared/Modal';

import useHomePageStore from '@/pages/home/providers/store/useHomePageStore';

const CreateAttendanceModal: React.FC = () => {
    //#region  //*=========== Store ===========
    const { isCreateModalOpen, setIsCreateModalOpen } = useHomePageStore();
    //#endregion  //*======== Store ===========

    return (
        <Modal
            open={isCreateModalOpen}
            setOpen={() => setIsCreateModalOpen(false)}
            title='EMPLOYEE ATTENDANCE'
        >
            <Modal.Section>
                <div className='p-4 space-y-4'>
                    <Input id='notes' label='Notes (Optional)' />
                    <InputFile
                        id='file'
                        label='Proof of Work'
                        validation={{ required: 'Proof of work is required' }}
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
                        <Button variant='primary'>Submit</Button>
                    </div>
                </div>
            </Modal.Section>
        </Modal>
    );
};

export default CreateAttendanceModal;
