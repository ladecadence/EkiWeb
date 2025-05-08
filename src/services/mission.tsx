import { ApiMission } from "../models/apimissions";
import { apiMissions, apiServer } from "./api";

export async function getMissions(): Promise<ApiMission[]> {
    // get data
    const res = await fetch(apiServer + apiMissions);
    let data: ApiMission[] = await res.json();

    if (data.length > 0) {
        return data;
    } else {
        return [];
    }
}