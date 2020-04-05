import * as functions from 'firebase-functions';
const fetch = require("node-fetch");

export const helloWorld = functions.https.onRequest((request, resp) => {
    fetch('https://corona.lmao.ninja/countries?sort=country')
    .then((response: { status: number; statusText: string | undefined; }) => {
                            if (response.status >= 200 && response.status < 300) {
                                return response;
                            } else {
                                let error = new Error(response.statusText);
                                throw error;
                            }})
    .then((response: { json: () => any; }) => {
        resp.send(response.json())
    })
    .catch((err: Error) => {
        console.error(err)
        resp.send('My error ' + err)  
    })
});


