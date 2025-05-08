import { ApiTelemetry } from "../models/apitelemetry";
import { apiData, apiServer } from "./api";

export async function getTelemetry(mission: string): Promise<ApiTelemetry[]> {
    // get data
    const res = await fetch(apiServer + apiData + mission);
    //let lastImgData = Object.assign(new ApiImage(), res.json())
    let data: ApiTelemetry[] = await res.json();

    if (data.length > 0) {
        return data;
    } else {
        return [];
    }
}