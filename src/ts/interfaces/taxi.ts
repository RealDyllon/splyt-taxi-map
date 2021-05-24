interface taxi {
  driver_id: string;
  location: {
    latitude: number;
    longitude: number;
    bearing: number;
  };
}

export default taxi;
