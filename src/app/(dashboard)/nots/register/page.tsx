'use client'

import React, { useState, useEffect } from 'react'
import Loader from "@/components/loader";
import { useToast } from "@/components/ui/use-toast"
import ErrorMessage from '@/components/auth/register/error-message';

type Props = {}

export default function ResgisterPage({ }: Props) {

  const [authorName, setAuthorName] = useState<string>('');
  const [authorNote, setAuthorNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [authorNameErrorMessage, setAuthorNameErrorMessage] = useState<string>('');
  const [authorNoteErrorMessage, setAuthorNoteErrorMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [allInputFields, setAllInputFields] = useState({
    authorName: '',
    authorNote: ''
  });

  const setLoader = () => {
    setLoading(true)

    let clearSettimeout = setTimeout(() => {
      setLoading(false)
    }, 2000);

    return () => clearTimeout(clearSettimeout)
  }

  const resetFields = () => {
    setAuthorName('');
    setAuthorNote('');
    setSubmitted(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setAllInputFields({
      authorName,
      authorNote
    });
    // addRegisterNote();

    resetFields();
  }

  const isFormValid = () => {
    return (
      !authorNameErrorMessage &&
      !authorNoteErrorMessage &&
      authorName.length > 0 &&
      authorNote.length > 0
    );
  };

  useEffect(setLoader, [])

  useEffect(() => {
    if (authorName.length == 0) {
      setAuthorNameErrorMessage('Author name is required.')
    } else {
      setAuthorNameErrorMessage('')
    }
  }, [authorName])

  useEffect(() => {
    if (authorNote.length == 0) {
      setAuthorNoteErrorMessage('Author note is required.')
    } else {
      setAuthorNoteErrorMessage('')
    }
  }, [authorNote])

  return (
    <Loader isLoading={loading}>
      <div>
        <h2 className='justify-center align-middle flex'>Add Notes Page</h2>
        <form onSubmit={handleSubmit}>
          <div className='p-5'>
            <div className='mb-4'>
              <label className='block'>Author:</label>
              <input
                type='text'
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className='border p-2 w-full'
              />
              <div>
                {<ErrorMessage message={authorNameErrorMessage} />}
              </div>
            </div>
            <div className='mb-4'>
              <label className='block'>Note:</label>
              <input
                type='text'
                value={authorNote}
                onChange={(e) => setAuthorNote(e.target.value)}
                className='border p-2 w-full'
              />
              <div>
                {<ErrorMessage message={authorNoteErrorMessage} />}
              </div>
            </div>
            <button disabled={!isFormValid()} type='submit' className="bg-blue-500 text-white p-2 rounded mt-2">Add Note</button>
          </div>
        </form>
      </div>
    </Loader>
  )
}
