'use server'


import { verifyPassword } from '@/lib/bcrypt'
import { client } from '@/lib/prisma'
import { getSession } from './session-action'


interface loginDataProps {
    email?: string
    password?: string
}

export const Login = async (data: loginDataProps) => {

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

        // session oluşturma
        const session = await getSession();

        session.isLoggedIn = true;
        session.userId = existingEmail.id.toString();
        session.userName = existingEmail.name;
        session.role = existingEmail.Role

        await session.save();
        
        return {
            status: 200,
            message: 'Giriş başarılı!'
        }


    } catch (e) {
        console.log('[login]', e)
    }




}