import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
    privateKey:config.IMAGEKIT_PRIVATE_KEY,
})


export async function uploadFIle({buffer, fileName, folder = "quicky"}){ 
   
    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder
    })

    console.log(result)
    return result
    
}