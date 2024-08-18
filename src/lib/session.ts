
import { SessionOptions } from "iron-session";

export interface SessionData {
    userId?:string
    userName?:string
    img?:string


    isLoggedIn?:boolean
}

export const defaultSession:SessionData  = {
    isLoggedIn:false
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: 'userInfo',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production' ? true : false, 
        // canlı ortamda is çalışsın değilse çalışmasın
        httpOnly: true, // http[s] çalışır
    }
}

