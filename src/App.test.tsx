// import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

// test('renders learn react link', () => {
//   const tree = renderer.create(<App />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
