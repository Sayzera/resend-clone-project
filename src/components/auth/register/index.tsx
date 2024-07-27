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

   const [isLoading, setIsLoading] = useState<boolean>(false)


   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
   const [ageErrorMessage, ageSetErrorMessage] = useState<string>('');



   useEffect(() => {
     setIsLoading(true)
     let clearSettimeout = setTimeout(() => {
       setIsLoading(false)
     }, 2000);
 
     return () => clearTimeout(clearSettimeout)
   }, [])


   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // setSubmitted(true);

      console.log('click')



      if(password.length > 16 || password.length < 6  ) {
         setPasswordErrorMessage('Minimum 6, maksimum 16 karekter girmelisiniz')
      }

      // email

      // age 

      // surname

      // name 

   }


   // password validation
   useEffect(() => {
      if(password.length > 0) {
         if(password.length < 6) {
            setPasswordErrorMessage('Minimum 6 değer girmelisiniz')
         } else if(password.length > 16) {
            setPasswordErrorMessage('Maksimum 16 karekter girebilirsiniz')
         } else {
            setPasswordErrorMessage('')
         }
      }
 
   },[password])


   // age validataion
   useEffect(() => {
      console.log(Number(age))
      if(age.length >0  && Number(age) <= 16) {
         ageSetErrorMessage('16 yaşından büyük olmalısınız')
      } else {
         ageSetErrorMessage('')
      }
   }, [age])

   // sezerr@gmail.com

   useEffect(() => {
      let result = /^([a-zA-Z]|[0-9])+\@(gmail|hotmail|)\.com$/.test(email)
      if(!result) {
         console.log('resutl', result)
      } else {
         console.log('doğru')
      }
   }, [email])



   // false = '' | false | null | undefined |  0

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
            <button disabled={
               passwordErrorMessage || 
               ageErrorMessage 
               ? true : false 
            }  type="button" onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
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
