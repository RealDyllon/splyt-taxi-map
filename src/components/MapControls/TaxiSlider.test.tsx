import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import locations from '../../data/locations';
import TaxiSlider from './TaxiSlider';

const TestComponent = (
  <TaxiSlider taxiCount={10} setTaxiCount={() => {}} />
);

it('renders without crashing', () => {
  shallow(TestComponent);
});

it('renders correctly', () => {
  const tree = shallow(TestComponent);
  expect(toJson(tree)).toMatchSnapshot();
});
