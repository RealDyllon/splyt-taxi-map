import { LatLngTuple } from 'leaflet';

export interface locationType {
  id: number;
  name: string;
  coords: LatLngTuple;
}

const singapore: locationType = {
  id: 1,
  name: 'Singapore',
  coords: [1.285194, 103.8522982],
};

const london: locationType = {
  id: 2,
  name: 'London',
  coords: [51.5049375, -0.0964509],
};

const locations = {
  singapore,
  london,
};

export default locations;
