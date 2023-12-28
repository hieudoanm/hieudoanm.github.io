export class AirQuality {
  status: string;
  data: {
    city: string;
    state: string;
    country: string;
    location: {
      type: string;
      coordinates: number[];
    };
    forecasts: Forecast[];
    current: {
      weather: Weather;
      pollution: Pollution;
    };
    history: {
      weather: Weather[];
      pollution: Pollution[];
    };
  };
}

export class Forecast {
  ts: string;
  aqius: number;
  aqicn: number;
  tp: number;
  tp_min: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
}

export class Weather {
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
}

export class Pollution {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
  p2: {
    conc: number;
    aqius: number;
    aqicn: number;
  };
  p1: {
    conc: number;
    aqius: number;
    aqicn: number;
  };
  o3: {
    conc: number;
    aqius: number;
    aqicn: number;
  };
  n2: {
    conc: number;
    aqius: number;
    aqicn: number;
  };
  s2: {
    conc: number;
    aqius: number;
    aqicn: number;
  };
  co: {
    conc: number;
    aqius: number;
    aqicn: number;
  };
}

export class CountriesResponse {
  status: string;
  data: { country: string }[];
}

export class StatesResponse {
  status: string;
  data: { state: string }[];
}

export class CitiesResponse {
  status: string;
  data: { city: string }[];
}
