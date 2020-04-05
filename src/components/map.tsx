import React from 'react';

import GoogleMapReact from 'google-map-react';

import { firebaseAnalytics } from './firebase/firebase';
import { covidAPI } from '../api/covidAPI';
import { countryEntity } from '../model/country';
import { Modal, Button } from 'react-bootstrap';

export const DataReactComponent = ({countryEntity, onClickHandler} : { onClickHandler: Function, countryEntity: countryEntity, lat: number , lng: number} ) => {
  
  var textStyle = {
    color: 'red',
    fontSize: countryEntity.cases/3000 > 12 ? countryEntity.cases/3000 + 'px' : '12px'
  };

  return  <p style={textStyle} onClick={() => onClickHandler()}>
                <b>{countryEntity.cases}</b>
              </p>;
          
}

interface Props {
}

interface State {
  isFetchingCountries: boolean,
  countries: Array<countryEntity>,
  showModal: boolean
}

class MapPage extends React.Component<Props, State>{

  handleClose = () => this.setState({showModal: false});
  handleShow = () => this.setState({showModal: true});
  
  constructor(props: any) {
    super(props);
    this.state = {
        isFetchingCountries: true,
        countries: [],
        showModal: false
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
                onClickHandler={()=>this.handleShow}/>
              )
            }
          </GoogleMapReact>
          <Modal show={this.state.showModal} onHide={()=>this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={()=>this.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
}
  
export default MapPage;