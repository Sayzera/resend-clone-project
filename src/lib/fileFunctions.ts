import fs from 'node:fs/promises'

export const existsFile = async (path:string) => {  
    try {
      await fs.access(path)
      return true
    } catch {
      return false
    }
  }


/**
 * @description Dosya yükleme
 * @param file 
 * @param path 
 */
export const uploadFile = async (file:File, path:string) : Promise< {
  status: number;
  message: string;
  filePathName?: string;
}>  => {

 
    // UTF-8 olarak kodlama
    const encoder = new TextEncoder();
    const encodedFileName = encoder.encode(file.name);
    const utf8FileName = new TextDecoder("utf-8").decode(encodedFileName);

    // ALLOWED FILE EXTENSIONS
    const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "pdf"];
  
    // MAX_FILE_SIZE
    const MAX_FILE_SIZE = 1024 * 1024 * 5; // 2MB
  
    // Dosya var mı
    if (!file) {
      return {
        status: 400,
        message: "Dosya eksik.",
      };
    }
  
    // Dosya uzantısı kontrol
    const fileExtension = file.name.split(".").pop();
  
    if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return {
        status: 400,
        message: "Dosya uzantısı hatalı.",
      };
    }
  
    if (file.size > MAX_FILE_SIZE) {
      return {
        status: 400,
        message: "Dosya boyutu 5MB'dan fazla olamaz.",
      };
    }
  
    // ArrayBuffer Uint8Array e dönüştürme
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
  
    const filePathName = `${path}/${utf8FileName}`;
    
    // Dosyayı kaydet
    await fs.writeFile(filePathName, buffer);


    return {
      status: 200,
      message: filePathName, // Dosya yolu
      filePathName: filePathName
    };
}