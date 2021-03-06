import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import locations from '../data/locations';
import driversApiRes from '../data/mock/driversApi';
import FullScreenMap from './FullScreenMap';

const TestComponent = (
  <FullScreenMap
    taxis={driversApiRes.drivers}
    currentOffice={locations.singapore}
    setMap={() => {}}
    taxiCount={10}
  />
);

it('renders without crashing', () => {
  shallow(TestComponent);
});

it('renders correctly', () => {
  const tree = shallow(TestComponent);
  expect(toJson(tree)).toMatchSnapshot();
});
