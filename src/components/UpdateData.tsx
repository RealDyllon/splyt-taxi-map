import { LatLngTuple } from 'leaflet';
import React, { useEffect } from 'react';
import { usePosition } from 'use-position';
import haversine from 'haversine-distance';
import _ from 'lodash';

import locations, { locationType } from '../data/locations';
import taxi from '../ts/interfaces/taxi';

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
        window.alert('Unable to refresh ride data');
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentOffice]);

  const handleLaunch = async () => {
    // read geolocation
  };

  useEffect(() => {
    handleLaunch();

    // console.log(
    //   'location',
    //   JSON.stringify({
    //     hello: 'world',
    //     latitude,
    //     longitude,
    //     errorMessage,
    //   })
    // );

    if (latitude && longitude) {
      const locationsArray = _.values(locations);

      const distancesFromOffices = locationsArray.map((location) =>
        haversine(
          { latitude, longitude },
          { lat: location.coords[0], lng: location.coords[1] }
        )
      );

      const indexOfSmallest = distancesFromOffices.indexOf(
        Math.min.apply(null, distancesFromOffices)
      );

      // console.log('indexOfSmallest', indexOfSmallest);

      const newOffice =
        locationsArray.find(
          (location) =>
            location.id === locationsArray[indexOfSmallest].id
        ) || locations.singapore;

      setCurrentOffice(newOffice);
      map?.setView(newOffice.coords, 15);
    }
  }, [latitude, longitude]);

  return null;
};;

export default UpdateData;
