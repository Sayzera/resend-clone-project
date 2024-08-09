'use server';


type onAddUserProps = {
  name:string;
  surname:string;
  email:string;
  age: number | string;
  password:string;
}

import { client } from "@/lib/prisma";


export const onGetUserList = async () => {
    try {
        // C[R]UD
        // Bir tablonun tüm elemanlarını çekme işlemi
        const userList = await client.user.findMany({});

        if (userList) {
            return {
                success: 200,
                messaage: 'Kullanıcılar başarıyla getirildi',
                data: userList
            }
        } else {
            return {
                success: 404,
                messaage: 'Kullanıcı bulunamadı',
                data: []
            }
        }


    } catch (e) {
        console.log('[onGetUserList]', e)
    }
}

/**
 * @param data 
 * @description Kullanıcı ekleme işlemi yapar
 * @returns
 */
export const onAddUser = async (data:onAddUserProps) => {
    try {

        /**
         * [C]RUD
         * INSERT INTO table_name (column1, column2, column3, ...)
            VALUES (value1, value2, value3, ...);
         */
        const addUser = await client.user.create({
            data: {
                name: data.name,
                surname:data.surname,
                age: Number(data.age),
                email: data.email,
                password:data.password,
            }
        })

        if(addUser) {
            return {
                status: 200,
                message: 'Kullanıcı başarıyla oluşturuldu.',
                data:addUser            
            }
        }
  
    } catch(e) {
        console.log('[onAddUser]', e)
    }
}
