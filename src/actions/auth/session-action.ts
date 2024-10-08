'use server';

import { defaultSession, SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if(!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn
    }

    return session;
}