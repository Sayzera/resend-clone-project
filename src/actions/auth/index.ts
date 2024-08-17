'use server'

import { hashPassword, verifyPassword } from '@/lib/bcrypt'
import { client } from '@/lib/prisma'


interface loginDataProps {
    email?: string
    password?: string
}

export const login = async (data: loginDataProps) => {

    try {
        if (!data.email || !data.password) {
            return {
                status: 400,
                message: 'Bad request!'
            }
        }

        const existingEmail = await client.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (!existingEmail) {
            return {
                status: 404,
                message: 'Kullanıcı adı veya şifre hatalı!'
            }
        }
        

        // formdan alınan veriyi hasledim

        // form data   // databasden gelen hashli veri
        const isEqualTo = verifyPassword(data.password, existingEmail.password)
        if (!isEqualTo) {
            return {
                status: 404,
                message: 'Kullanıcı adı veya şifre hatalı!'
            }
        }
    } catch (e) {
        console.log('[login]', e)
    }




}