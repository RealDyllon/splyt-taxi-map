import React from 'react';
// import Slider from 'rc-slider';
import styled from 'styled-components';
import Slider from 'rc-slider';

const TaxiSliderWrapper = styled.div`
  position: absolute;
  top: 40px;
  bottom: 40px;
  right: 0;
  z-index: 999;
  width: 40px;

  @media (max-width: 768px) {
    bottom: 90px;
  }
`;

export interface TaxiSliderProps {
  setTaxiCount: React.Dispatch<React.SetStateAction<number>>;
  taxiCount: number;
}

const TaxiSlider = (props: TaxiSliderProps) => {
  const { setTaxiCount, taxiCount } = props;

  const handleSliderChange = (value: number) => {
    // todo

    setTaxiCount(value);
  };

  return (
    <TaxiSliderWrapper>
      <Slider
        min={5}
        max={30}
        value={taxiCount}
        onChange={handleSliderChange}
        style={{
          position: 'relative',
        }}
        railStyle={{
          width: 5,
          background: '#aaa',
        }}
        handleStyle={{
          height: 28,
          width: 28,
          marginLeft: -12,
          marginTop: -14,
          backgroundColor: '#fff',
          border: '2px #46bedb solid',
          boxShadow: `rgba(0, 0, 0, 0.55) 0px 3px 15px`,
        }}
        trackStyle={{
          // background: 'none',
          background: '#FFC135',
          width: 5,
        }}
        vertical
      />
    </TaxiSliderWrapper>
  );
};
// };

export default TaxiSlider;
