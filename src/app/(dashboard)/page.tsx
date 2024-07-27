'use client'

import { useState } from "react";

export default function Home() {
   const [name, setName] = useState<string>('');
   const [surname, setSurname] = useState<string>('');
   const [age, setAge] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [submitted, setSubmitted] = useState<boolean>(false);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
   }

   return (
      <div className="p-5">
         <p className="justify-center align-middle flex">Account Registration Page</p>
         <form onSubmit={handleSubmit}>
            <div className="mb-4">
               <label className="block">Name:</label>
               <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="border p-2 w-full"
               />
            </div>
            <div className="mb-4">
               <label className="block">Surname:</label>
               <input 
                  type="text" 
                  value={surname} 
                  onChange={(e) => setSurname(e.target.value)} 
                  className="border p-2 w-full"
               />
            </div>
            <div className="mb-4">
               <label className="block">Age:</label>
               <input 
                  type="text" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  className="border p-2 w-full"
               />
            </div>
            <div className="mb-4">
               <label className="block">Email:</label>
               <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="border p-2 w-full"
               />
            </div>
            <div className="mb-4">
               <label className="block">Password:</label>
               <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="border p-2 w-full"
               />
            </div>
            <div />
            <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
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
   );
}
