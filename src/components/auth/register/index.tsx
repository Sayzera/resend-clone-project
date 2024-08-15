'use client'

import Loader from "@/components/loader";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import ErrorMessage from "./error-message";
import { onAddUser } from "@/actions/user";
import { useToast } from "@/components/ui/use-toast"

export const getRegisterUserFromCookies = (name:string) => {

   let data = Cookies.get(name) 
   if(data) {
      return JSON.parse(data)
   }
   return [];
}

export default function UserRegister() {
   const { toast } = useToast()

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
   const [duplicateEmailErrorMessage, setDuplicateEmailErrorMessage] = useState<string>('');
   const [allInputFields, setAllInputFields] = useState({
      name: '',
      surname: '',
      age: '',
      email: '',
      password: ''
  });

   const birkezDinle = () => {
      setIsLoading(true)
    
      let clearSettimeout = setTimeout(() => {
        setIsLoading(false)
      }, 2000);
 
      return () => clearTimeout(clearSettimeout)
   }

   const resetFields = () => {
      setName('');
      setSurname('');
      setAge('');
      setEmail('');
      setPassword('');
      setSubmitted(false);
   }

   useEffect(birkezDinle, [])

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      setAllInputFields({
         name,
         surname,
         age,
         email,
         password
      });
      // register user  
      addRegisterUser();

      resetFields();
   }

   const addRegisterUser = async () => {
      // cookideki verileri getir
      // let data = getRegisterUserFromCookies('users');

      // if (!Array.isArray(data)) {
      //    data = [];
      // }

      // data.push({ //overwrite etmez ek array objeleri eklenir

      // }),

      // Cookies.set('users', JSON.stringify(data))

     const result = await onAddUser({
        name:name,
        surname:surname,
        age:age,
        email:email,
        password: password
      })
      

      if(result?.status === 200) {
         toast({
          title: "Başarılı",
          description: result.message,
        }) 
      } else {
         toast({
            title: "Hata!",
            description: 'Kullanıcı eklenemdi lütfen daha sonra tekrar deneyiniz!',
          }) 
      }



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
      } else {
         nameSetErrorMessage('')
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
      } else {
         surnameSetErrorMessage('')
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
      const result = /^([a-zA-Z]|[0-9])+\@(gmail|hotmail|)\.com$/.test(email)
      if(!result && email.length > 0) {
         emailSetErrorMessage('Hatali')
      } else {
         emailSetErrorMessage('')
      }
      let data = getRegisterUserFromCookies('users');
      if (Array.isArray(data) && data.some((user: any) => user.email === email)) {
         setDuplicateEmailErrorMessage('This email address is already taken by another user.')
      } else {
         setDuplicateEmailErrorMessage('');
      }
   }, [email])

   // form submission validation
   const isFormValid = () => {
      return (
         !nameErrorMessage &&
         !surnameErrorMessage &&
         !ageErrorMessage &&
         !emailErrorMessage &&
         !duplicateEmailErrorMessage &&
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
                  {<ErrorMessage message={nameErrorMessage} />}
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
               {<ErrorMessage message={surnameErrorMessage} />}
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
                {<ErrorMessage message={ageErrorMessage} />}
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
                {<ErrorMessage message={emailErrorMessage || duplicateEmailErrorMessage} />}
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
               {<ErrorMessage message={passwordErrorMessage} />}
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
               <div>Name: {allInputFields.name}</div>
               <div>Surname: {allInputFields.surname}</div>
               <div>Age: {allInputFields.age}</div>
               <div>Email: {allInputFields.email}</div>
               <div>Password: {'*'.repeat(allInputFields.password.length)}</div>
            </div>
         )}

      </div>
    </Loader>
   );
}
