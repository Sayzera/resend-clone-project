'use server';


type onAddUserProps = {
    name: string;
    surname: string;
    email: string;
    age: number | string;
    password: string;
}
type onEditUserProps = {
    id?: string;
    name?: string;
    surname?: string;
    email?: string;
    age?: number | string;
    password?: string;
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
export const onAddUser = async (data: onAddUserProps) => {
    try {

        /**
         * [C]RUD
         * INSERT INTO table_name (column1, column2, column3, ...)
            VALUES (value1, value2, value3, ...);
         */

        // TODO:  existingUser

        const addUser = await client.user.create({
            data: {
                name: data.name,
                surname: data.surname,
                age: Number(data.age),
                email: data.email,
                password: data.password,
            }
        })


        return {
            status: 200,
            message: 'Kullanıcı başarıyla oluşturuldu.',
            data: addUser
        }

    } catch (e) {
        console.log('[onAddUser]', e)
    }
}

export const onEditUser = async (data: onEditUserProps) => {
    if (!data?.id) return;

    // validation


    /**
     * CR[U]D
     * UPDATE Customers
    SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
    WHERE CustomerID = 1;
     */
    if (!data?.email || !data?.age || !data.name || !data.password || !data.surname) {
        return {
            status: 400,
            message: 'Bad request!',
        }
    }

    try {
        const isUpdated = await client.user.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                surname: data.surname,
                age: Number(data.age),
                email: data.email,
                password: data.password,
            }
        })

        if(!isUpdated) {
            const response = {
                status: 400,
                message: 'Kullanıcı güncellenemedi',
            }

            return response
        }
        if(isUpdated) {
            return  {
                status: 200,
                message: 'Kullanıcı başarıyla gönderildi'
            }
        } 
    
    }catch(error) {
        console.log('[onEditUser]',error)
    }






}


export const onDeleteUser = async (id: string) => {
    if (!id) return

    try {
        // CRU[D]
        // DELETE FROM user WHERE id=id
        const isDeletedUser = await client.user.delete({
            where: {
                id: id
            }
        })

        if (!isDeletedUser) {
            return {
                status: 404,
                message: 'Kullanıcı bulunamadı',
                data: isDeletedUser
            }
        }

        if (isDeletedUser) {
            return {
                status: 200,
                message: 'Kullanıcı başarıyla silindi',
                data: isDeletedUser
            }
        }

    } catch (error) {
        console.log('[onDeleteUser]', error)
    }


}