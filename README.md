Host:
    - To run:
    -- npm install
    -- npm start

    - Deploy:
    -- firebase serve --only hosting
    -- npm run build (must to run for production)
    -- firebase deploy --only hosting

    - Website:
    -- https://localhost:3000
    -- https://covid19-info-data.web.app/

Function:
    - To run (cd functions)
    -- npm install
    -- npm start

    - Deploy
    -- firebase serve --only functions
    -- firebase deploy --only functions

    - URL
    -- http://localhost:5000/covid19-info-data/us-central1/helloWorld
    -- https://us-central1-covid19-info-data.cloudfunctions.net