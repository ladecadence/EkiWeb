export interface ApiTelemetry {
    ID: number;
    id: string;
    msg: string;
    lat: number;
    ns: string;
    lon: number;
    ew: string;
    alt: number;
    hdg: number;
    spd: number;
    sats: number;
    vbat: number;
    baro: number;
    tin: number;
    tout: number;
    arate: number;
    date: string;
    time: string;
    sep: string;
    datetime: string;
    hpwr: number;
}