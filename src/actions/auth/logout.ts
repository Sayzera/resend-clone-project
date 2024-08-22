'use server';

import { defaultSession, SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function destroySession() {
    try {
        const session = await getIronSession<SessionData>(cookies(), sessionOptions);
        //session.isLoggedIn = defaultSession.isLoggedIn;
        //await session.save();
        session.destroy();
        cookies().set('session', '', { expires: new Date(0) });

        if (!session) {
            return {
                success: 200,
                message: 'Kullanici session i basariyla kaldirildi.'
            }
        }
    } catch (error) {
        console.error('Session destroy error', error);
    }
}
