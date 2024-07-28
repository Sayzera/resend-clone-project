'use client'

import Loader from "@/components/loader";
import { useEffect, useState } from "react";

export default function UserRegister() {
   const [name, setName] = useState<string>('');
   const [surname, setSurname] = useState<string>('');
   const [age, setAge] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [submitted, setSubmitted] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
   const [ageErrorMessage, ageSetErrorMessage] = useState<string>('');
   const [nameErrorMessage, nameSetErrorMessage] = useState<string>('');
   const [surnameErrorMessage, surnameSetErrorMessage] = useState<string>('');
   const [emailErrorMessage, emailSetErrorMessage] = useState<string>('');

   useEffect(() => {
     setIsLoading(true)
     let clearSettimeout = setTimeout(() => {
       setIsLoading(false)
     }, 2000);
 
     return () => clearTimeout(clearSettimeout)
   }, []) // sor


   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);

      console.log('click')
   }

   // name validation
   useEffect(() => {
      if(name.length > 0) {
         if(name.length < 2) {
            nameSetErrorMessage('Minimum 2 karakter girmelisiniz')
         } else if (name.length > 50) {
            nameSetErrorMessage('Maksimum 50 karakter girebilirsiniz')
         } else {
            nameSetErrorMessage('')
         }
      }
   },[name])

   // surname validation
   useEffect(() => {
      if(surname.length > 0) {
         if(surname.length < 2) {
            surnameSetErrorMessage('Minimum 2 karakter girmelisiniz')
         } else if (surname.length > 50) {
            surnameSetErrorMessage('Maksimum 50 karakter girebilirsiniz')
         } else {
            surnameSetErrorMessage('')
         }
      }
   },[surname])

   // password validation
   useEffect(() => {
      if(password.length > 0) {
         if(password.length < 6) {
            setPasswordErrorMessage('Minimum 6 değer girmelisiniz')
         } else if(password.length > 16) {
            setPasswordErrorMessage('Maksimum 16 karakter girebilirsiniz')
         } else {
            setPasswordErrorMessage('')
         }
      }
   },[password])

   // age validation
   useEffect(() => {
      if(age.length > 0  && Number(age) < 18) {
         ageSetErrorMessage('18 yaşından büyük olmalısınız')
      } else {
         ageSetErrorMessage('')
      }
   }, [age])

   // email validation
   useEffect(() => {
      let result = /^([a-zA-Z]|[0-9])+\@(gmail|hotmail|)\.com$/.test(email)
      if(!result) {
         emailSetErrorMessage('Hatali')
      } else {
         emailSetErrorMessage('')
      }
   }, [email])

   // Form submission validation
   const isFormValid = () => {
      return (
         !nameErrorMessage &&
         !surnameErrorMessage &&
         !ageErrorMessage &&
         !emailErrorMessage &&
         !passwordErrorMessage &&
         name.length > 0 &&
         surname.length > 0 &&
         age.length > 0 &&
         email.length > 0 &&
         password.length > 0
      );
   };

   return (
    <Loader isLoading={isLoading}>
        <div className="p-5">
         <p className="justify-center align-middle flex">Account Registration Page</p>
         <form onSubmit={handleSubmit}>
            <div className="mb-4">
               <label className="block">Name:</label>
               <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  disabled={submitted}
                  className="border p-2 w-full"
               />
               <div>
                  {nameErrorMessage}
               </div>
            </div>
            <div className="mb-4">
               <label className="block">Surname:</label>
               <input 
                  type="text" 
                  value={surname} 
                  disabled={submitted}
                  onChange={(e) => setSurname(e.target.value)} 
                  className="border p-2 w-full"
               />
               <div>
                  {surnameErrorMessage}
               </div>
            </div>
            <div className="mb-4">
               <label className="block">Age:</label>
               <input 
                  type="number" 
                  value={age} 
                  disabled={submitted}
                  onChange={(e) => setAge(e.target.value)} 
                  className="border p-2 w-full"
               />
                <div>
                  {ageErrorMessage}
               </div>
            </div>
            <div className="mb-4">
               <label className="block">Email:</label>
               <input 
                  type="email" 
                  value={email} 
                  disabled={submitted}
                  onChange={(e) => setEmail(e.target.value)} 
                  className="border p-2 w-full"
               />
                <div>
                  {emailErrorMessage}
               </div>
            </div>
            <div className="mb-4">
               <label className="block">Password:</label>
               <input 
                  type="password" 
                  disabled={submitted}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="border p-2 w-full"
               />
               <div>
                  {passwordErrorMessage}
               </div>
            </div>
            <div />
            <button disabled={!isFormValid()} type="submit" className="bg-blue-500 text-white p-2 rounded">
               Register
            </button>
         </form>

         {submitted && (
            <div className="mt-5">
               <h2>Submitted Data:</h2>
               <div>Name: {name}</div>
               <div>Surname: {surname}</div>
               <div>Age: {age}</div>
               <div>Email: {email}</div>
               <div>Password: {'*'.repeat(password.length)}</div>
            </div>
         )}
      </div>
    </Loader>
   );
}
