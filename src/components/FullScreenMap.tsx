import React from 'react';
import { Icon, IconOptions, LatLngTuple } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  // Popup,
} from 'react-leaflet';

import { locationType } from '../data/locations';
import mapPinYellowIcon from '../assets/icons/location-icon-red.png';
import mapTaxiYellowIcon from '../assets/icons/taxi-yellow-top-down.png';
import taxi from '../ts/interfaces/taxi';
import RotatedMarker from './RotatedMarker';

const zoom: number = 15;

const mapPinIcon: Icon<IconOptions> = new Icon({
  iconUrl: mapPinYellowIcon,
  iconRetinaUrl: mapPinYellowIcon,
  popupAnchor: [-0, -0],
  iconSize: [42, 56],
});

const mapTaxiIcon: Icon<IconOptions> = new Icon({
  iconUrl: mapTaxiYellowIcon,
  iconRetinaUrl: mapTaxiYellowIcon,
  popupAnchor: [-0, -0],
  iconSize: [48, 48],
});

interface Props {
  taxis: taxi[];
  currentOffice: locationType;
  setMap: any; // todo
  taxiCount: number;
}

const FullScreenMap: React.FC<Props> = (props: Props) => {
  const { taxis, currentOffice, setMap, taxiCount } = props;

  const position: LatLngTuple = currentOffice.coords; // todo: get browser gps coords for this in app.js

  const mapboxEndpoint = `https://api.mapbox.com/styles/v1/realdyllon/ckp2sesuf6p4i18oa3isf15z7/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

  return (
    <MapContainer
      id="leafletMap"
      className="main"
      center={position}
      zoom={zoom}
      scrollWheelZoom
      zoomControl
      whenCreated={setMap}
    >
      <TileLayer
        keepBuffer={25}
        url={mapboxEndpoint}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />

      <Marker position={position} icon={mapPinIcon}>
        {/* <Popup className="leafletOfficePopup">
          Splyt&apos;s {currentOffice.name} office
        </Popup> */}
      </Marker>

      {/* taxis go here */}
      {taxis.slice(0, taxiCount).map((taxiItem) => {
        const taxiPosition: LatLngTuple = [
          taxiItem.location.latitude,
          taxiItem.location.longitude,
        ];

        return (
          <RotatedMarker
            key={taxiItem.driver_id}
            position={taxiPosition}
            rotationAngle={taxiItem.location.bearing}
            rotationOrigin="center"
            icon={mapTaxiIcon}
          >
            {/* <Popup className="leafletTaxiPopup">taxi</Popup> */}
          </RotatedMarker>
        );
      })}
    </MapContainer>
  );
};

export default FullScreenMap;
