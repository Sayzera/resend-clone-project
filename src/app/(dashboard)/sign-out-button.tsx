'use client';

import React from 'react';
import { destroySession } from '@/actions/auth/logout';
import { Button } from '@/components/ui/button';

export default function SignOutButton() {
    const destroySessionMethod = async () => {
        console.log('SignOut button clicked');

        try {
            const response = await destroySession();
            console.log('Response from destroySession:', response);

            if (response && response.success == 200) {
                alert('NICE JOB');
            }
        } catch (error) {
            console.error('Error during destroySession:', error);
        }
    }

    return (
        <div style={{ padding: '1.25rem', textAlign: 'center' }}>
            <p>Please click the below button to sign out.</p>
            <br />
            <Button onClick={destroySessionMethod}>Sign out</Button>
        </div>
    );
}
