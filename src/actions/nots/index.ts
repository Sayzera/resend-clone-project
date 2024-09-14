"use server";

import { existsFile, uploadFile } from "@/lib/fileFunctions";
import { client } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import { getSession } from "../auth/session-action";

type onAddNoteProps = {
  authorName: string;
  authorNote: string;
};

type onEditNoteProps = {
  id?: string;
  authorName?: string;
  authorNote?: string;
  filePath?: string;
};

export const onGetNoteList = async () => {
  try {
    const noteList = await client.note.findMany({
      where: {
        status: true
      },
      include: {
        user: true
        // user: {
        //   select: {
        //     name:true
        //   }
        // }
      }
    });

    // SELECT *
    // FROM table1
    // LEFT JOIN table2 t2
    // ON table1.column_name = table2.column_name;

  

    if (noteList) {
      return {
        status: 200,
        message: "Yazarlar ve notlari basariyla getirildi.",
        data: noteList,
      };
    } else {
      return {
        status: 404,
        message: "Herhangi bir yazar ve notu bulunamadi.",
        data: [],
      };
    }
  } catch (e) {
    console.log("[onGetNoteList]", e);
  }
};

export const onAddNote = async (data: onAddNoteProps, formData: FormData) => {
  const file = formData.get("file") as File;
  const session = await getSession();


  const filePathName = await uploadFile(file, "public/uploads");

  if (filePathName.status !== 200) {
    return filePathName;
  }

  if (!data?.authorName || !data?.authorNote) {
    return {
      status: 400,
      message: "Bad request!",
    };
  }

  try {

    const addNote = await client.note.create({
      data: {
        authorName: data.authorName,
        authorNote: data.authorNote,
        filePath: filePathName?.filePathName || "",
        userId:session.userId!
      },
    });

    revalidatePath("/nots/list"); // SPECIFIC PATH
    // revalidatePath('/') ALL PATHS

    return {
      status: 200,
      message: "Yazar ve notu basariyla eklendi.",
      data: addNote,
    };
  } catch (e) {
    console.log("[onAddNote]", e);
    return {
      status: 500,
      message: "Server tarafinda bir hata olustu.",
    };
  }
};


export const onEditNote = async (data: onEditNoteProps, formData: FormData) => {
  // ----------------- Dosya işlemleri -----------------
  const file = formData.get("file") as File;
  let filePathName; // adi için gerekli database tarafında adını yazıyoruz
  if (file) {
    // eğer resim varsa işlem yap yoksa eski veriyi korumak için

    // Dosya var mı
    const isExistsFile = await existsFile(data.filePath!);

    // varsa sil
    if (isExistsFile) {
      await fs.unlink(data.filePath!);
    }

    // yeni dosya ekle
    filePathName = await uploadFile(file, "public/uploads"); // dosya yükle
    if (filePathName.status !== 200) {
      // herhangi bir hata varsa
      return filePathName; // hatayı döndür
    }
  }
  // ----------------- Dosya işlemleri -----------------


  // return
  if (!data?.id || !data?.authorName || !data?.authorNote) {
    return {
      status: 400,
      message: "Bad request!",
    };
  }

  try {
    const isUpdated = await client.note.update({
      where: {
        id: data.id,
      },
      data: {
        authorName: data.authorName,
        authorNote: data.authorNote,
        ...(file && {
          // eğer dosya varsa
          filePath: filePathName?.filePathName, // objeyi yukarı taşı
        }),
      },
    });

    if (!isUpdated) {
      return {
        status: 400,
        message: "Guncelleme yapilamadi.",
      };
    }

    if (isUpdated) {
      return {
        status: 200,
        message: "Guncelleme basarili.",
      };
    }
  } catch (e) {
    console.log("[onEditNote]", e);
    return {
      status: 500,
      message: "Server tarafinda bir hata olustu.",
    };
  }
};

export const onDeleteNote = async (id: string, filePath: string) => {
  if (!id) return;

  // böyle bir dosya var mı
  const isExistsFile = await existsFile(filePath);

  if (isExistsFile) {
    await fs.unlink(filePath);
  }

  try {
    const isDeleted = await client.note.delete({
      where: {
        id: id,
      },
    });

    if (!isDeleted) {
      return {
        status: 404,
        message: "Not bulunamadi.",
        data: [],
      };
    }

    if (isDeleted) {
      return {
        status: 200,
        message: "Yazar ve notu basariyla silindi.",
        data: isDeleted,
      };
    }
  } catch (e) {
    console.log("[onDeleteNote]", e);
    return {
      status: 500,
      message: "Server tarafinda bir hata olustu.",
    };
  }
};

export const onGetByIdNote = async (id: string) => {
  if (!id) return;

  try {
    const result = await client.note.findUnique({
      where: {
        id: id,
      },
    });

    if (!result) {
      return {
        status: 404,
        message: "Not bulunamadi.",
        data: [],
      };
    }

    return {
      status: 200,
      message: "Not bulundu.",
      data: result,
    };
  } catch (e) {
    console.log("[onGetByIdNote]", e);
  }
};
