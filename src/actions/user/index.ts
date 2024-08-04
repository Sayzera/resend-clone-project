'use server';

import { client } from "@/lib/prisma";


export const onGetUserList = async () => {
    try {
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
