import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import locations from '../data/locations';
import UpdateData from './UpdateData';

const TestComponent = (
  <UpdateData
    setPickupETA={() => {}}
    currentOffice={locations.singapore}
    taxiCount={10}
    coords={locations.singapore.coords}
    setTaxis={() => {}}
    setCurrentOffice={() => {}}
    map={{}}
  />
);

it('renders without crashing', () => {
  shallow(TestComponent);
});

it('returns null', () => {
  const component = shallow(TestComponent);
  expect(component.type()).toEqual(null);
});

it('renders correctly', () => {
  const tree = shallow(TestComponent);
  expect(toJson(tree)).toMatchSnapshot();
});
