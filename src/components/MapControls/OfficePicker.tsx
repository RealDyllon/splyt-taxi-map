import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { usePosition } from 'use-position';

import locations, { locationType } from '../../data/locations';
import locationArrowBlack from '../../assets/icons/location-arrow-black.png';
import locationPinBlack from '../../assets/icons/location_icon_black.png';
import getNearestOffice from '../../functions/getNearestOffice';

const OfficePickerWrapper = styled.div`
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 18px;
  left: 12px;
  right: 12px;

  z-index: 999;
  /* box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;  */
`;

const OfficePickerContainer = styled.div`
  margin-right: 66px;
  border-radius: 25px;
  height: 50px;
  background: #fff;
  display: flex;
  flex-direction: row;
  /* box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 48px; */

  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 48px;

  /* box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  padding: 8px; */
  user-select: none;
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

interface OfficeButtonIconProps {
  active?: boolean;
}

const OfficeButtonIcon = styled.img<OfficeButtonIconProps>`
  height: 18px;
  width: 18px;
  margin-right: 4px;
  ${(props) =>
    props.active &&
    `
      filter: invert(100%);
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
        <OfficeButtonIcon alt="" src={locationArrowBlack} />
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
              <OfficeButtonIcon
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
