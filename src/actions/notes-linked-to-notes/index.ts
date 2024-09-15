'use server';
import { client } from "@/lib/prisma";
import { getSession } from "../auth/session-action";

type onAddNoteLinkedToNoteProps = {
    comment: string;
    noteId: string;
}

export const onGetNotesLinkedToNotes = async (id: string) => {
    const session = getSession();
    if(!session) return;
    if(!id) return;

    try {
        const notesLinkedToNotes = await client.note.findFirst({
            where: {
                id:id,
            },
            include: {
                // notesLinkedToNotes: true
                notesLinkedToNotes: {
                    select: {
                        id:true,
                        comment: true,
                        isTargetAchieved:true,
                        status:true,
                        createdBy:true
                    }
                },
           
            }
        })

        if(!notesLinkedToNotes) {
            return {
                status: 404,
                message: 'Not bulunamadı',
                data: []
            }
        }


        return {
            message: 'Notlar başarıyla getirildi',
            status: 200,
            data: notesLinkedToNotes
        }

    }catch(e) {
        console.log('[onGetNotesLinkedToNotes]', e)
    }

}

export const onAddNoteLinkedToNote = async (data:onAddNoteLinkedToNoteProps) => {
    const session = await getSession();
    if(!session) return;
    if(!data?.comment || !data?.noteId) return;


    try {
        // const noteLinkedToNote = await client.note.create({
        //    data: {
        //       id: data.noteId,
        //     authorName:'x',
        //     authorNote: 'x',
        //     userId:'qweqwe',
        //     notesLinkedToNotes: {
        //         create: {
        //             comment: 'eqwe',
        //             createdBy: 'we',
        //             updatedBy: 'wqeqw'
                    
        //         }
        //     }
        //    },
           
        // })

        const noteLinkedToNote = await client.notesLinkedToNotes.create({
            data: {
                noteId: data.noteId,
                comment:data.comment,
                createdBy:session.userId!,
                updatedBy:session.userId!
            }
        })

        if(!noteLinkedToNote) {
            return {
                status: 400,
                message: 'Not eklenemedi',
                data: []
            }
        }

        return {
            status: 200,
            message: 'Not başarıyla eklendi',
            data: []
        }


    }catch(e) {
        console.log('[onAddNoteLinkedToNote]', e)
    }

  
    
}