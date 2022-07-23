import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACFAYOCEWmNCKJeX3YSTCayi2C_frXANc",
  authDomain: "boardapp-9745f.firebaseapp.com",
  projectId: "boardapp-9745f",
  storageBucket: "boardapp-9745f.appspot.com",
  messagingSenderId: "491153948281",
  appId: "1:491153948281:web:c473fd67f880fbb8279ea8",
  measurementId: "G-ZLDZKNW25K",
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase;
