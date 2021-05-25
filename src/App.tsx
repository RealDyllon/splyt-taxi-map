import React, { useState } from 'react';

import './App.css';

import FullScreenMap from './components/FullScreenMap';
import MapControls from './components/MapControls/index';
import UpdateData from './components/UpdateData';
import PickupETA from './components/MapControls/PickupETA';
import locations, { locationType } from './data/locations';
import taxi from './ts/interfaces/taxi';

const App: React.FC = () => {
  const [taxis, setTaxis] = useState<taxi[]>([]); // taxi/driver data
  const [taxiCount, setTaxiCount] = useState<number>(5); // num of visible taxis
  const [pickupETA, setPickupETA] = useState<number>(-1);

  const [map, setMap] = useState(null);

  const [currentOffice, setCurrentOffice] = useState<locationType>(
    locations.singapore // todo: use geolocation api
  );

  const { coords } = currentOffice;

  return (
    <div className="App">
      <FullScreenMap
        taxis={taxis}
        currentOffice={currentOffice}
        setMap={setMap}
        taxiCount={taxiCount}
      />
      <MapControls
        taxiCount={taxiCount}
        setTaxiCount={setTaxiCount}
        currentOffice={currentOffice}
        setCurrentOffice={setCurrentOffice}
        map={map}
      />
      <PickupETA pickupETA={pickupETA} />
      <UpdateData
        setPickupETA={setPickupETA}
        currentOffice={currentOffice}
        taxiCount={taxiCount}
        coords={coords}
        setTaxis={setTaxis}
        setCurrentOffice={setCurrentOffice}
        map={map}
      />
    </div>
  );
};

export default App;
