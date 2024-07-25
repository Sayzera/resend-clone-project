import Input from '@/components/form/elements/input'
import React from 'react'

type Props = {}

export default function CustomInput({ }: Props) {
    return (
        <div className='p-5'>
            <Input label='First Name' />
            <Input label='Last Name' />
            <Input label='Age' type='number' error={`The age should be higher than 18.`} />
            <Input label='Birthday' type='date' />
            <Input label='Profile Picture' type='file' />
            <Input label='Email' type='email' error='Email must be filled-in.'/>
            <Input label='Password' type='password' />
            <p>Which email platforms do you currently use?</p>
            <Input label='Gmail' type='checkbox' id='checkbox1' name='experienceCheck' value='gmail' />
            <Input label='Outlook' type='checkbox' id='checkbox2' name='experienceCheck' value='outlook' />
            <Input label='Apple Mail' type='checkbox' id='checkbox2' name='experienceCheck' value='apple' />
            <Input label='Other' type='checkbox' id='checkbox1' name='experienceCheck' value='other' />
            <p>Please select your favorite email platform.</p>
            <Input label='Gmail' type='radio' id='radio1' name='emailPreference' value='gmail_preferred' />
            <Input label='Outlook' type='radio' id='radio2' name='emailPreference' value='outlook_preferred' />
            <Input label='Yahoo Mail' type='radio' id='radio3' name='emailPreference' value='yahoo_preferred' />
            <p>Please ask your questions from the text field below.</p>
            <textarea></textarea>
        </div>
    )
}

