import { LatLngTuple } from "leaflet";

export interface Position {
    lat: number;
    ns: string;
    lon: number;
    ew: string;
}

export function getPosition(pos: Position): LatLngTuple {
    var position: LatLngTuple = [0, 0];

    position[0] = pos.lat;
    position[1] = pos.lon;
    if (pos.ns == 'S' || pos.ns == 's') {
        position[0] = position[0] * -1;
    }
    if (pos.ew == 'W' || pos.ns == 'w') {
        position[1] = position[1] * -1;
    }
    return position;
}
