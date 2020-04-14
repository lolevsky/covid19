# About

Source code of COVID19 info page, All the data fetched from https://github.com/novelcovid/api

Open source librries that used for this project are:
- React https://reactjs.org/
- React bootstrap https://react-bootstrap.github.io/
- Recharts https://recharts.org/            
- Firebase https://firebase.google.com/
- Universal cookie https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie#readme
- Google maps react https://github.com/fullstackreact/google-maps-react#readme

## Need to add:
- src/components/map/mapConfig.ts
    ```javascript
    export default {	
        apiKey: '...'	
    };
- src/components/firebase/firebaseConfig.ts
    ```javascript
    export default {	
        apiKey: "...",	
        authDomain: "...firebaseapp.com",	
        databaseURL: "https://...firebaseio.com",	
        projectId: "...",	
        storageBucket: "....appspot.com",	
        messagingSenderId: "...",	
        appId: "...",	
        measurementId: "..."	
    };
## How to run:
- Host:
    - To run localy:
        - npm install
        - npm start
        - https://localhost:3000
    - Deploy:
        - firebase serve --only hosting
        - npm run build (must to run for production)
        - firebase deploy --only hosting
        - https://covid19-info-data.web.app/
- Function: (Test, not functional)
  - To run (cd functions)
    - npm install
    - npm start
  - Deploy
    - firebase serve --only functions
    - firebase deploy --only functions
  - URL
    - http://localhost:5000/covid19-info-data/us-central1/helloWorld
    - https://us-central1-covid19-info-data.cloudfunctions.net
