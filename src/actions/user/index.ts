'use server';


type onAddUserProps = {
    name: string;
    surname: string;
    email: string;
    age: string;
    password: string;
}
type onEditUserProps = {
    id?: string;
    name?: string;
    surname?: string;
    email?: string;
    age?: string;
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
        const existingUser = await client.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (existingUser) {
            return {
                status: 400,
                message: 'Bu email adresi baska bir kullanici tarafindan kullaniliyor.',
            }
        }

        const addUser = await client.user.create({
            data: {
                name: data.name,
                surname: data.surname,
                age: Number(data.age),
                email: data.email,
                password: data.password,
            }
        });

        return {
            status: 200,
            message: 'Kullanıcı başarıyla oluşturuldu.',
            data: addUser
        };

    } catch (e) {
        console.log('[onAddUser]', e);
        return {
            status: 500,
            message: 'Server tarafinda bir hata olustu.',
        };
    }
};


export const onEditUser = async (data: onEditUserProps) => {

    let canBeEdited = false;
    const result = /^([a-zA-Z]|[0-9])+\@(gmail|hotmail|)\.com$/.test(data.email || '');

    if (!data?.id) return;

    // validation

    if (data?.name) {
        if (data.name.length > 2) {
            if (data.name.length < 50) {
                canBeEdited = true;
            } else {
                canBeEdited = false;
            }
        }
        else {
            canBeEdited = false;
        }
    } else {
        canBeEdited = false;
    }

    if (data?.surname) {
        if (data.surname.length > 2) {
            if (data.surname.length < 50) {
                canBeEdited = true;
            } else {
                canBeEdited = false;
            }
        }
        else {
            canBeEdited = false;
        }
    } else {
        canBeEdited = false;
    }

    if (data?.password) {
        if (data.password.length > 6) {
            if (data.password.length < 16) {
                canBeEdited = true;
            } else {
                canBeEdited = false;
            }
        }
        else {
            canBeEdited = false;
        }
    } else {
        canBeEdited = false;
    }

    if (data?.age) {
        if (data.age.length > 0) {
            if (Number(data.age) > 18) {
                canBeEdited = true;
            } else {
                canBeEdited = false;
            }
        }
        else {
            canBeEdited = false;
        }
    } else {
        canBeEdited = false;
    }

    if (data?.email) {
        if (data.email.length > 0) {
            if (result) {
                canBeEdited = true;
            } else {
                canBeEdited = false;
            }
        }
        else {
            canBeEdited = false;
        }
    } else {
        canBeEdited = false;
    }

    /**
     * CR[U]D
     * UPDATE Customers
    SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
    WHERE CustomerID = 1;
     */
    if (!canBeEdited || !data?.email || !data?.age || !data.name || !data.password || !data.surname) {
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
                message: 'Kullanıcı başarıyla editlendi'
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