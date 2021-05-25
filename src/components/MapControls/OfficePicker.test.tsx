import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import locations from '../../data/locations';
import OfficePicker from './OfficePicker';

const TestComponent = (
  <OfficePicker
    currentOffice={locations.singapore}
    setCurrentOffice={() => {}}
    map={{}}
  />
);

it('renders without crashing', () => {
  shallow(TestComponent);
});

it('renders correctly', () => {
  const tree = shallow(TestComponent);
  expect(toJson(tree)).toMatchSnapshot();
});
