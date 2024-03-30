import * as React from 'react';
import { RegisterOptions } from 'react-hook-form';

import Image from '@/components/shared/Image';
import Input from '@/components/shared/Input';

type Props = {
    /** Input label */
    label: string | null;
    /**
     * id to be initialized with React Hook Form,
     * must be the same with the pre-defined types.
     */
    id: string;
    /** Input placeholder */
    placeholder?: string;
    /** Small text below input, useful for additional information */
    helperText?: string;
    /** Disables the input and shows defaultValue (can be set from React Hook Form) */
    readOnly?: boolean;
    /** Disable error style (not disabling error validation) */
    hideError?: boolean;
    /** Manual validation using RHF, it is encouraged to use yup resolver instead */
    validation?: RegisterOptions;
};

const InputFile: React.FC<Props> = ({
    label,
    id,
    placeholder,
    helperText,
    readOnly,
    hideError,
    validation,
}) => {
    //#region  //*=========== State ===========
    const [file, setFile] = React.useState<string | null>(null);
    //#endregion  //*======== State ===========
    return (
        <div>
            <Input
                type='file'
                id={id}
                placeholder={placeholder}
                helperText={helperText}
                readOnly={readOnly}
                hideError={hideError}
                validation={validation}
                label={label}
                onChange={(e) => {
                    if (e.target.files) {
                        setFile(URL.createObjectURL(e.target.files[0]));
                    }
                }}
            />
            {file && (
                <Image
                    className='w-full my-2'
                    imgClassName='object-contain'
                    src={file}
                    alt='content'
                    width={2000}
                    height={2000}
                />
            )}
        </div>
    );
};

export default InputFile;
