'use server';

import { defaultSession, SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function destroySession() {
        const session = await getIronSession<SessionData>(cookies(), sessionOptions);
        //session.isLoggedIn = defaultSession.isLoggedIn;
        //await session.save();
        session.destroy();
        //cookies().set('session', '', { expires: new Date(0) });

        redirect('/users/register');

}
