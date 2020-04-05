import React from 'react';

import GoogleMapReact from 'google-map-react';

import { firebaseAnalytics } from './firebase/firebase';
import { covidAPI } from '../api/covidAPI';
import { countryEntity, createEmptyCountryEntity } from '../model/country';
import { Modal } from 'react-bootstrap';

export const DataReactComponent = ({countryEntity, onClickHandler} : { onClickHandler: any, countryEntity: countryEntity, lat: number , lng: number} ) => {
  const greatPlaceStyle = {
    position: 'absolute' as 'absolute',
    color: 'red',
    fontSize: countryEntity.cases/3000 > 12 ? countryEntity.cases/3000 + 'px' : '12px'
  }

  return  <div style={greatPlaceStyle} onClick={() => onClickHandler()}>
              <b>{countryEntity.cases}</b>
          </div>;   
}

interface Props {
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
              <DataReactComponent
                lat={country.countryInfo.lat}
                lng={country.countryInfo.long}
                countryEntity={country}
                onClickHandler={()=>this.handleShow(country)}/>
              )
            }
          </GoogleMapReact>
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
  
export default MapPage;