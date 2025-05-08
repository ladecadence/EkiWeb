import { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface recenterProps {
    position: LatLngTuple;
}

const RecenterAutomatically = ({ position }: recenterProps) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position);
    }, position);
    return null;
}

export default RecenterAutomatically;