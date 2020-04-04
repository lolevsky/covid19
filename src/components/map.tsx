import React from 'react';

import GoogleMapReact from 'google-map-react';

import { firebaseAnalytics } from './firebase/firebase';
import { covidAPI } from '../api/covidAPI';
import { countryEntity } from '../model/country';

export const CircleReactComponent = ({numberCases} : { numberCases: number, lat: number , lng: number} ) => {
  var circleStyle = {
    display:'inline-block',
    backgroundColor: '#8884d8',
    borderRadius: '50%',
    width:numberCases/1000,
    height:numberCases/1000,
  };

  var textStyle = {
    color: 'red',
    fontSize: numberCases/3000 + 'px'
  };

  //<div style={circleStyle}>
  //</div>;
  return  <p style={textStyle}>
                <b>{numberCases}</b>
              </p>;
          
}

interface Props {
}

interface State {
  isFetchingCountries: boolean,
  countries: Array<countryEntity>
}

class MapPage extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);
    this.state = {
        isFetchingCountries: true,
        countries: []
    };
  };

  public componentDidMount() {
    firebaseAnalytics.logEvent('map - Loaded')

    covidAPI.getAllCountries().then((countries) =>{
      this.setState({countries: countries, isFetchingCountries: false})
    }).catch(err => {
      firebaseAnalytics.logEvent('Map page - alert ' + err)
      alert(err)});
  }
  
  public render() {
    return (
        <div style={{ height: '94vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDp_Z7LKwj58lrnzVv0twhso6Q5atFZumM' }}
            defaultCenter={{
              lat: 25,
              lng: 0
            }}
            defaultZoom={0}>
            {this.state.isFetchingCountries ? '' : 
              this.state.countries.filter((country) => country.cases > 1000).map((country: countryEntity) => 
              <CircleReactComponent
                lat={country.countryInfo.lat}
                lng={country.countryInfo.long}
                numberCases={country.cases}/>
              )
            }
          </GoogleMapReact>
        </div>
    );
  }
}
  
export default MapPage;