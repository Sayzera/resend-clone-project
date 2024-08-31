'use server'

import { client } from "@/lib/prisma";

type onAddNoteProps = {
    authorName: string;
    authorNote: string;
}

type onEditNoteProps = {
    id?: string;
    authorName?: string;
    authorNote?: string;
}

export const onGetNoteList = async () => {
    try {
        const noteList = await client.note.findMany({});

        if (noteList) {
            return {
                status: 200,
                message: 'Yazarlar ve notlari basariyla getirildi.',
                data: noteList,
            }
        } else {
            return {
                status: 404,
                message: 'Herhangi bir yazar ve notu bulunamadi.',
                data: [],
            }
        }
    } catch (e) {
        console.log('[onGetNoteList]', e);
    }
}

export const onAddNote = async (data: onAddNoteProps) => {
    if (!data?.authorName || !data?.authorNote) {
        return {
            status: 400,
            message: 'Bad request!',
        }
    }

    try {
        const addNote = await client.note.create({
            data: {
                authorName: data.authorName,
                authorNote: data.authorNote
            }
        });
        
        return {
            status: 200,
            message: 'Yazar ve notu basariyla eklendi.',
            data: addNote,
        }
    } catch (e) {
        console.log('[onAddNote]', e);
        return {
            status: 500,
            message: 'Server tarafinda bir hata olustu.'
        }
    }    
}

export const onEditNote = async (data: onEditNoteProps) => {

    if (!data?.id || !data?.authorName || !data?.authorNote) {
        return {
            status: 400,
            message: 'Bad request!',
        }
    }

    try {
        const isUpdated = await client.note.update({
            where: {
                id: data.id
            },
            data: {
                authorName: data.authorName,
                authorNote: data.authorNote,
            }
        })

        if (!isUpdated) {
            return {
                status: 400,
                message: 'Guncelleme yapilamadi.'
            }
        }

        if(isUpdated) {
            return {
                status: 200,
                message: 'Guncelleme basarili.'
            }
        }

    } catch (e) {
        console.log('[onEditNote]', e);
        return {
            status: 500,
            message: 'Server tarafinda bir hata olustu.'
        }
    }
}

export const onDeleteNote = async (id: string) => {
    if (!id) return;

    try {
        const isDeleted = await client.note.delete({
            where: {
                id: id
            }
        })

        if (!isDeleted) {
            return {
                status: 404,
                message: 'Not bulunamadi.',
                data: []
            }
        }

        if (isDeleted) {
            return {
                status: 200,
                message: 'Yazar ve notu basariyla silindi.',
                data: isDeleted
            }
        }
    } catch (e) {
        console.log('[onDeleteNote]', e);
        return {
            status: 500,
            message: 'Server tarafinda bir hata olustu.'
        }
    }
}

export const onGetByIdNote = async (id: string) => {
    if (!id) return;

    try {
        const result = await client.note.findUnique({
            where: {
                id: id
            }
        })

        if (!result) {
            return {
                status: 404,
                message: 'Not bulunamadi.',
                data: []
            }
        }

        return {
            status: 200,
            message: 'Not bulundu.',
            data: result
        }
    } catch (e) {
        console.log('[onGetByIdNote]', e);
    }
}
