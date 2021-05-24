import haversine from 'haversine-distance';
import _ from 'lodash';

import locations from '../data/locations';

interface params {
  latitude: number;
  longitude: number;
}

const getNearestOffice = ({ latitude, longitude }: params) => {
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

  const newOffice =
    locationsArray.find(
      (location) => location.id === locationsArray[indexOfSmallest].id
    ) || locations.singapore;

  return newOffice;
};

export default getNearestOffice;
