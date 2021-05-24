import React from 'react';
import styled from 'styled-components';

interface Props {
  pickupETA: number;
}

const Wrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Container = styled.div`
  background: #ffffff;
  height: 50px;
  border-radius: 25px;
  padding: 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 48px;
`;

const PickupETA = (props: Props) => {
  const { pickupETA } = props;

  return (
    <Wrapper>
      <Container>
        Ride ETA:&nbsp;<b>{pickupETA} mins</b>
      </Container>
    </Wrapper>
  );
};

export default PickupETA;
