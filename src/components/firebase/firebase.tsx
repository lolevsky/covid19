import * as firebase from "firebase/app";
import 'firebase/analytics';

import firebaseConfig from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

if (process.env.NODE_ENV !== 'production') {
  firebase.analytics().setAnalyticsCollectionEnabled(false)
}else{
  firebase.analytics().setAnalyticsCollectionEnabled(true)
}

export const firebaseAnalytics = firebase.analytics();
