import React from 'react';

import GoogleMapReact from 'google-map-react';

import { firebaseAnalytics } from './firebase/firebase';
import { Container } from 'react-bootstrap';

class MapPage extends React.Component{
    public componentDidMount() {
      firebaseAnalytics.logEvent('map - Loaded')
    }
  
    public render() {
      return (
          <div style={{ height: '94vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyDp_Z7LKwj58lrnzVv0twhso6Q5atFZumM' }}
              defaultCenter={{
                lat: 59.95,
                lng: 30.33
              }}
              defaultZoom={11}
              >
               
            </GoogleMapReact>
          </div>
     );
    }
  }
  
  export default MapPage;