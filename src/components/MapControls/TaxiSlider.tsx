import React from 'react';
import Slider from 'rc-slider';
// import styled from 'styled-components';

// const TaxiSliderWrapper = styled.div`
//   /* position: absolute;
//   top: 0;
//   right: -100;
//   z-index: 999; */
//   width: 300px;
//   height: 400px;
//   /* background: #ccc; */
// `;

export interface TaxiSliderProps {
  setTaxiCount: React.Dispatch<React.SetStateAction<number>>;
  taxiCount: number;
}

const TaxiSlider = (props: TaxiSliderProps) => {
  const { taxiCount } = props;

  const handleSliderChange = () => {
    // todo
  };

  return (
    // <TaxiSliderWrapper>
    <Slider
      min={0}
      max={20}
      vertical
      value={taxiCount}
      onChange={handleSliderChange}
      railStyle={{
        height: 2,
      }}
      handleStyle={{
        height: 28,
        width: 28,
        position: 'relative',
        top: 32,
        left: 32,
        marginLeft: -14,
        marginTop: -14,
        backgroundColor: 'red',
        border: 0,
      }}
      trackStyle={{
        background: 'none',
      }}
    />
    // </TaxiSliderWrapper>
  );
};

export default TaxiSlider;
