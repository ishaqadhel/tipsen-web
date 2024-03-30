import * as React from 'react';

import Typography from '@/components/shared/Typography';

import BaseLayout from '@/layouts/Base';

const LoginPage: React.FC = () => {
    return (
        <BaseLayout pageTitle='Login'>
            <Typography variant='h1'>Login</Typography>
        </BaseLayout>
    );
};

export default LoginPage;
