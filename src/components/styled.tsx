import styled from 'styled-components';

interface RoundButtonProps {
  active?: boolean;
}
// eslint-disable-next-line import/prefer-default-export
export const RoundButton = styled.img<RoundButtonProps>`
  height: 18px;
  width: 18px;
  margin-right: 4px;
  ${(props) =>
    props.active &&
    `
      filter: invert(100%);
  `}
`;
