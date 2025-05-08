import { ApiImage } from "../models/apiimage";
import { apiDownloadImg, apiLastImg, apiServer } from "./api";

export async function getLastImage(mission: string): Promise<string> {
    // get last image data
    const res = await fetch(apiServer + apiLastImg + mission);
    
    let lastImgData: ApiImage = await res.json();

    // ok, get img
    if (lastImgData.hasOwnProperty("filename")) {
        const res = await fetch(apiServer + apiDownloadImg + lastImgData.filename);
        const imgBlob = await res.blob();
        const url = URL.createObjectURL(imgBlob)
        return url;
    }else {
        return "";
    }

} 