import marker_eki2 from '../assets/marker-eki2-small.png';
import marker_eki2_shadow from '../assets/marker-eki2-small-shadow.png';

import {Icon} from 'leaflet';

export var balloonIcon = new Icon({
    iconUrl: marker_eki2,
    shadowUrl: marker_eki2_shadow,

    iconSize:     [80, 100], // size of the icon
    shadowSize:   [90, 100], // size of the shadow
    iconAnchor:   [40, 90], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 80],  // the same for the shadow
    popupAnchor:  [0, -100] // point from which the popup should open relative to the iconAnchor
});