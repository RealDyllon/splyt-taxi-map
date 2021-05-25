import { LatLngTuple } from 'leaflet';
import React, { useEffect } from 'react';
import { usePosition } from 'use-position';

import { locationType } from '../data/locations';
import taxi from '../ts/interfaces/taxi';
import getNearestOffice from '../functions/getNearestOffice';

interface Props {
  setTaxis: React.Dispatch<React.SetStateAction<taxi[]>>;
  coords: LatLngTuple;
  taxiCount: number;
  currentOffice: locationType;
  setCurrentOffice: React.Dispatch<
    React.SetStateAction<locationType>
  >;
  map: any;
  setPickupETA: React.Dispatch<React.SetStateAction<number>>;
}

const UpdateData = (props: Props) => {
  const {
    setTaxis,
    coords: officeCoords,
    currentOffice,
    setCurrentOffice,
    map,
    setPickupETA,
  } = props;

  const [officeLatitude, officeLongitude] = officeCoords; // office

  const { latitude, longitude, errorMessage } = usePosition(true);

  const fetchData = async () => {
    await fetch(
      `https://j4zhnbqorj.execute-api.ap-southeast-1.amazonaws.com/default/splyt-interview-api-cors-proxy?latitude=${officeLatitude}&longitude=${officeLongitude}&count=30`
    )
      .then((res) => res.json())
      .then(({ drivers, pickup_eta: eta }) => {
        setTaxis(drivers);

        setPickupETA(eta);
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        window.alert(
          'Unable to refresh ride data. Refer to console for details'
        );
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentOffice]);

  const handleLaunch = async () => {
    if (errorMessage) {
      // eslint-disable-next-line no-alert
      window.alert(
        'Unable to refresh ride data. Refer to console for details'
      );
      // eslint-disable-next-line no-console
      console.error(errorMessage);
    }

    if (latitude && longitude) {
      const newOffice = getNearestOffice({ latitude, longitude });

      setCurrentOffice(newOffice);
      map?.setView(newOffice.coords, 15);
    }
  };

  useEffect(() => {
    handleLaunch();
  }, [latitude, longitude, errorMessage]);

  return null;
};

export default UpdateData;
