import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

interface recenterProps {
    position: LatLngTuple;
}

const RecenterAutomatically = ({ position }: recenterProps) => {
    const [zoom, setZoom] = useState(15);
    const map = useMap();

    // manage zoom
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoom(mapEvents.getZoom());
        },
    });

    useEffect(() => {
        var targetPoint = map.project(position, zoom).subtract([0, 50]),
        targetLatLng = map.unproject(targetPoint, zoom);
        map.setView(targetLatLng);
    }, position);
    return null;
}

export default RecenterAutomatically;