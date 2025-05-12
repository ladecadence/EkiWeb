import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { useState, useEffect } from "react";
import { ApiTelemetry } from "../models/apitelemetry";
import { getPosition } from '../models/position';
import { balloonIcon } from './balloonicon';
import RecenterAutomatically from './recentermap';
import AltChart from "./altchart";

interface mapProps {
    telemetry: ApiTelemetry[]
}

function PosMap({ telemetry }: mapProps) {

    const pathOptions = { color: 'purple', fillOpacity: 0.1, opacity: 0.5, weight: 8 };

    const [lastPos, setLastPos] = useState([0, 0] as LatLngTuple);
    const [pathPos, setPathPos] = useState([] as LatLngTuple[]);

    useEffect(() => {
        if (telemetry.length > 0) {
         setLastPos(getPosition(telemetry[telemetry.length - 1]))
         setPathPos(telemetry.map((pos) => { return getPosition(pos) }))
        }
    }, [telemetry])

    return (
        <>
            {lastPos[0] != 0 && lastPos[1] != 0 ?
                <MapContainer center={lastPos} zoom={15} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RecenterAutomatically position={lastPos} />
                    <Marker position={lastPos} icon={balloonIcon}>
                        <Popup>
                            <p><strong>{telemetry[telemetry.length - 1].id}</strong></p>
                            <a href={"http://maps.google.com/maps?z=14&t=m&q=loc:" + telemetry[telemetry.length - 1].lat + telemetry[telemetry.length - 1].ns + "+" + telemetry[telemetry.length - 1].lon + telemetry[telemetry.length - 1].ew}>
                                <p>{telemetry[telemetry.length - 1].lat}{telemetry[telemetry.length - 1].ns}, {telemetry[telemetry.length - 1].lon}{telemetry[telemetry.length - 1].ew}</p>
                            </a>
                            <AltChart telemetry={telemetry}></AltChart>
                        </Popup>
                    </Marker>
                    <Polyline pathOptions={pathOptions} positions={pathPos} />
                </MapContainer>
                : 'loading...'
            }
        </>
    )

}

export default PosMap