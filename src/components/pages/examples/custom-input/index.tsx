import Input from '@/components/form/elements/input'
import React, { useState } from 'react'

type Props = {}

export default function CustomInput({ }: Props) {

    const [checkboxData, setCheckboxData] = useState<
        {
            data?: [],
            errorMessage?: string
        }
    >({
        data: [],
        errorMessage: ''
    });


    const onHandleSubmit = (e: React.FormEvent) => {
        e.preventDefault()



    }

    const onHandlecheckboxOnchange = (e: React.FormEvent<HTMLInputElement>) => {
        let data =  e.currentTarget.value

       // herşeyi data içine pushla üzerine ekle
        
       setCheckboxData((prev) => {

            if( prev.data?.includes(data)) {
                return {
                    ...prev,
                    data: prev.data?.filter((item) => item != data )
                }
            }
            
             return {
                ...prev,
                data: [...prev.data, data]
            }
       })
       
    }





    return (
        <div className='p-5'>
            <div>
            </div>
            <form onSubmit={(e) => onHandleSubmit(e)}>
                <Input label='First Name' />
                <Input label='Last Name' />
                <Input label='Age' type='number' error={`The age should be higher than 18.`} />
                <Input label='Birthday' type='date' />
                <Input label='Profile Picture' type='file' />
                <Input label='Email' type='email' error='Email must be filled-in.' />
                <Input label='Password' type='password' />
                <p>Which email platforms do you currently use?</p>


                <Input label='Gmail'
                    onChange={(e) => onHandlecheckboxOnchange(e)}
                    type='checkbox' id='checkbox1' name='experienceCheck' value='gmail' />
                <Input
                    onChange={(e) => onHandlecheckboxOnchange(e)}
                    label='Outlook' type='checkbox' id='checkbox2' name='experienceCheck' value='outlook' />
                <Input
                    onChange={(e) => onHandlecheckboxOnchange(e)}
                    label='Apple Mail' type='checkbox' id='checkbox3' name='experienceCheck' value='apple' />
                <Input
                    onChange={(e) => onHandlecheckboxOnchange(e)}
                    label='Other' type='checkbox' id='checkbox4' name='experienceCheck' value='other' error='hata' />


                <p>Please select your favorite email platform.</p>
                <Input label='Gmail' type='radio' id='radio1' name='emailPreference' value='gmail_preferred' />

                <Input label='Outlook' type='radio' id='radio2' name='emailPreference' value='outlook_preferred' />
                <Input label='Yahoo Mail' type='radio' id='radio3' name='emailPreference' value='yahoo_preferred' />
                <p>Please ask your questions from the text field below.</p>
                <Input label='Gmail' type='textarea'
                    rows={5}
                    id='radio1' name='emailPreference' value='gmail_preferred' />
                <Input type='button' label='Gönder' btnType='submit' />
            </form>

        </div>
    )
}



