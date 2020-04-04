import * as firebase from "firebase/app";
import 'firebase/analytics';

import firebaseConfig from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebaseAnalytics = firebase.analytics();
