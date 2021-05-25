import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Icon, IconOptions, LatLngTuple } from 'leaflet';

import mapTaxiYellowIcon from '../assets/icons/taxi-yellow-top-down.png';
import driversApiRes from '../data/mock/driversApi';
import RotatedMarker from './RotatedMarker';


const mapTaxiIcon: Icon<IconOptions> = new Icon({
  iconUrl: mapTaxiYellowIcon,
  iconRetinaUrl: mapTaxiYellowIcon,
  popupAnchor: [-0, -0],
  iconSize: [48, 48],
});

const taxiItem = driversApiRes.drivers[0];
const taxiPosition: LatLngTuple = [
  taxiItem.location.latitude,
  taxiItem.location.longitude,
];

const TestComponent = (
  <RotatedMarker
    position={taxiPosition}
    rotationAngle={taxiItem.location.bearing}
    rotationOrigin="center"
    icon={mapTaxiIcon}
    children={()=>{}}
  />
);

it('renders without crashing', () => {
  shallow(TestComponent);
});

it('renders correctly', () => {
  const tree = shallow(TestComponent);
  expect(toJson(tree)).toMatchSnapshot();
});
