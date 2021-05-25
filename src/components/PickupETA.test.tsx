import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import locations from '../data/locations';
import driversApiRes from '../data/mock/driversApi';
import PickupETA from './PickupETA';

const TestComponent = <PickupETA pickupETA={5} />;

it('renders without crashing', () => {
  shallow(TestComponent);
});

it('renders correctly', () => {
  const tree = shallow(TestComponent);
  expect(toJson(tree)).toMatchSnapshot();
});
