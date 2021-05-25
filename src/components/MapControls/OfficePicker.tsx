import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { usePosition } from 'use-position';

import locations, { locationType } from '../../data/locations';
import locationArrowBlack from '../../assets/icons/location-arrow-black.png';
import locationPinBlack from '../../assets/icons/location_icon_black.png';
import getNearestOffice from '../../functions/getNearestOffice';
import { RoundButton } from '../styled';

const OfficePickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 18px;
  left: 12px;
  right: 12px;
  z-index: 999;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const OfficePickerContainer = styled.div`
  margin-right: 66px;
  border-radius: 25px;
  height: 50px;
  background: #fff;
  display: flex;
  flex-direction: row;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 48px;
  user-select: none;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

interface OfficeButtonProps {
  active: boolean;
}

const OfficeButton = styled.div<OfficeButtonProps>`
  border-radius: 25px;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 160px;

  ${(props) =>
    props.active &&
    `
      background: #46BEDB;
      color: #fff;
  `}
`;

const CurrentLocationButton = styled.div`
  margin-right: 16px;
  height: 50px;
  width: 50px;
  background: #ffffff;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 48px;

  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 12px;
    align-self: flex-start;
  }

  &:active {
    background-color: #eee;
  }
`;

export interface OfficePickerProps {
  currentOffice: locationType;
  setCurrentOffice: React.Dispatch<
    React.SetStateAction<locationType>
  >;
  map: any;
}

const OfficePicker = (props: OfficePickerProps) => {
  const { currentOffice, setCurrentOffice, map } = props;

  // eslint-disable-next-line
  const handleOfficeClick = (id: number) => {
    const newOffice: locationType =
      _.values(locations).find((location) => location.id === id) ||
      locations.singapore;
    setCurrentOffice(newOffice);
    map?.setView(newOffice.coords, 15);
  };

  const { latitude, longitude, errorMessage } = usePosition(true);

  const handleCurrentLocationClick = () => {
    if (errorMessage) {
      // eslint-disable-next-line no-alert
      window.alert(
        'Unable to refresh ride data. Refer to console for details'
      );
      // eslint-disable-next-line no-console
      console.error(errorMessage);
    }

    if (latitude && longitude) {
      const newOffice = getNearestOffice({ latitude, longitude });

      setCurrentOffice(newOffice);
      map?.setView(newOffice.coords, 15);
    }
  };

  return (
    <OfficePickerWrapper>
      <CurrentLocationButton onClick={handleCurrentLocationClick}>
        <RoundButton alt="" src={locationArrowBlack} />
      </CurrentLocationButton>
      <OfficePickerContainer>
        {_.values(locations).map((location: locationType) => {
          const active: boolean =
            currentOffice.name === location.name;

          return (
            <OfficeButton
              onClick={() => handleOfficeClick(location.id)}
              active={active}
              key={location.id}
            >
              <RoundButton
                alt=""
                // src={active ? locationArrowBlack : locationPinBlack}
                src={locationPinBlack}
                active={active}
              />
              {location.name}
            </OfficeButton>
          );
        })}
      </OfficePickerContainer>
    </OfficePickerWrapper>
  );
};

export default OfficePicker;
