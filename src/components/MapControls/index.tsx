import React from 'react';
import OfficePicker, { OfficePickerProps } from './OfficePicker';
import TaxiSlider, { TaxiSliderProps } from './TaxiSlider';

const MapControls = (props: TaxiSliderProps & OfficePickerProps) => {
  // const [taxtCount, setTaxiCount] = useState(5);

  const {
    taxiCount,
    setTaxiCount,
    currentOffice,
    setCurrentOffice,
    map,
  } = props;

  return (
    <>
      <OfficePicker
        currentOffice={currentOffice}
        setCurrentOffice={setCurrentOffice}
        map={map}
      />
      <TaxiSlider taxiCount={taxiCount} setTaxiCount={setTaxiCount} />
    </>
  );
};

export default MapControls;
