'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"



export default function UseffectAndUseStateExamples() {
    const [name, setName]  = useState<string>('sezer')
    const [nameListener, setNameListener] = useState<string>('a')
    const [nameListener2, setNameListener2] = useState<string>('b')
    let name2 = 'Arda2'


    useEffect(() => {
        console.log('work')
    }, [])


    // trigger
    useEffect(() => {
        if(nameListener !='a') {
            setName('Mahmut')
        }
    } , [nameListener,nameListener2]) 
    
    return (


        // <> Kapsayıcı örneği
        //     <div>
        //         <div></div>
        //         <div></div>
        //     </div>

        //     <div></div>
        // </>


        <>
        <div>
           {name} - {name2}
        </div>

        <Button
            onClick={() =>  {
                setName('Arda')
                name2 = 'Sezer'
            }}
            //    onClick={() => setName('Arda')}
            
        >İsmi Değiştir {name}</Button>

        <Button
        
         onClick={() => {
            setNameListener('b')
         }}
        >
            Name Listener Trigger
        </Button>
        </>

    )
}
