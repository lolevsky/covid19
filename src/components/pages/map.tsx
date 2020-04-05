import React from 'react';

import { firebaseAnalytics } from '../firebase/firebase';
import { covidAPI } from '../../api/covidAPI';
import { countryEntity, createEmptyCountryEntity } from '../../model/country';
import { Modal } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import mapConfig from "../map/mapConfig";

// export const DataReactComponent = ({countryEntity, onClickHandler} : { onClickHandler: any, countryEntity: countryEntity, lat: number , lng: number} ) => {
//   const greatPlaceStyle = {
//     position: 'absolute' as 'absolute',
//     color: 'red',
//     fontSize: countryEntity.cases/3000 > 12 ? countryEntity.cases/3000 + 'px' : '12px'
//   }

//   return  <div style={greatPlaceStyle} onClick={() => onClickHandler()}>
//               <b>{countryEntity.cases}</b>
//           </div>;   
// }

interface Props {
  google: any;
}

interface State {
  isFetchingCountries: boolean,
  countries: Array<countryEntity>,
  showModal: boolean,
  selectedCountryEntity: countryEntity
}

class MapPage extends React.Component<Props, State>{

  handleClose(){
    this.setState({showModal: false, selectedCountryEntity: createEmptyCountryEntity()});
  }
  handleShow(countryEntity: countryEntity){
    this.setState({showModal: true, selectedCountryEntity: countryEntity});
  }
  
  constructor(props: any) {
    super(props);
    this.state = {
        isFetchingCountries: true,
        countries: [],
        showModal: false,
        selectedCountryEntity: createEmptyCountryEntity()
    };
  };

  public componentDidMount() {
    firebaseAnalytics.setCurrentScreen('Map')
    firebaseAnalytics.logEvent('Map - Loaded')

    covidAPI.getAllCountries().then((countries) =>{
      this.setState({countries: countries, isFetchingCountries: false})
    }).catch(err => {
      firebaseAnalytics.logEvent('Map - alert ' + err)
      alert(err)});
  }

  public render() {
    return (
        <div>
          <Map 
            google={this.props.google} 
            zoom={3}
            minZoom={3}
            disableDefaultUI
            initialCenter={{
            lat: 25,
            lng: 0
            }}>
               {this.state.isFetchingCountries ? '' : 
                  this.state.countries.filter((country) => country.cases > 1000).map((country: countryEntity) => 
                  <Marker 
                    title={country.cases+''}
                    name={country.country}
                    position={{lat: country.countryInfo.lat, lng: country.countryInfo.long}}
                    onClick={() => this.handleShow(country)}
                    icon={{
                      url: "/logo64.png",
                      anchor: new google.maps.Point(16,16),
                      scaledSize: new google.maps.Size(32,32)
                    }}
                  />
                  )
            }
            </Map>
          <Modal 
            show={this.state.showModal} 
            onHide={()=>this.handleClose()}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedCountryEntity.country}</Modal.Title>
            </Modal.Header>
            <Modal.Body>                
              <b>{this.state.selectedCountryEntity.cases
              }</b> cases 
              <br/><b>{
              this.state.selectedCountryEntity.recovered
              }</b> recovered
              <br/><b>{
              this.state.selectedCountryEntity.deaths
              }</b> deaths               
            </Modal.Body>
          </Modal>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: mapConfig.apiKey
  })(MapPage);