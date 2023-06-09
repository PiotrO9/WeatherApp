export type CityDatas = {
  id: number;
  coord: {
    lon: number;
    lat: number;
  };
  country: string;
  geoname: {
    cl: string;
    code: string;
    parent: number;
  };
  langs: [];
  name: string;
  stat: {
    level: number;
    population: number;
  };
  stations: [];
  zoom: number;
};

export default CityDatas;
