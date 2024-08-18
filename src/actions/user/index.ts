'use server';
import { hashPassword } from "@/lib/bcrypt";
import { client } from "@/lib/prisma";


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


    if(!data?.name || !data?.surname || !data?.email || !data?.age || !data?.password) {
        return {
            status: 400,
            message: 'Bad request!',
        }
    }

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


        const password = hashPassword(data.password);
        
        const addUser = await client.user.create({
            data: {
                name: data.name,
                surname: data.surname,
                age: Number(data.age),
                email: data.email,
                password: password,
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

    let canBeEdited = true;
    const result = /^([a-zA-Z]|[0-9])+\@(gmail|hotmail|)\.com$/.test(data.email || '');

    if (!result) {
        canBeEdited = false
    }

    if (!data?.id) return;

    // validation
    if (!data?.name) {
        canBeEdited = false;
    }
    if (data.name && (data.name.length < 2 || data.name.length > 50)) {
        canBeEdited = false;
    }
    if (!data?.surname) {
        canBeEdited = false;
    }
    if (data.surname && (data.surname.length < 2 || data.surname.length > 50)) {
        canBeEdited = false;
    }
    if (!data?.password) {
        canBeEdited = false;
    }
    if (data.password && (data.password.length < 6 || data.password.length > 16)) {
        canBeEdited = false;
    }
    if (!data?.age) {
        canBeEdited = false;
    }
    let _age = Number(data.age) ?? 0
    if (_age && (_age < 18)) {
        canBeEdited = false;
    }
    if (data.email && (data.email.length < 0 || data.email.length > 200)) {
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

        if (!isUpdated) {
            const response = {
                status: 400,
                message: 'Kullanıcı güncellenemedi',
            }

            return response
        }
        if (isUpdated) {
            return {
                status: 200,
                message: 'Kullanıcı başarıyla editlendi'
            }
        }

    } catch (error) {
        console.log('[onEditUser]', error)
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

export const onGetByIdUser = async (id:string) => {
    if(!id) return;

    try {
        const result = await client.user.findUnique({
            where: {
                // id:id
                id
            },
            // select: {
            //     id:true,
            //     name:true
            // }
        })

        if(!result) {
            return {
                status: 404,
                message: 'Kullanıcı bulunamadı',
                data: []
            }
        }

        return {
            status:200,
            message:'Kullanıcı başarıyla getirildi',
            data: result
        }
    }catch(e) {
        console.log('[onGetByIdUser]', e)
    }
}