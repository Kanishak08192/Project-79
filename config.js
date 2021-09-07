import * as firebase from 'firebase';
require('@firebase/firestore');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe3hbNlXS6FounVGQIpe0CONJQ1GACBDs",
  authDomain: "barter-system-1dfdf.firebaseapp.com",
  projectId: "barter-system-1dfdf",
  storageBucket: "barter-system-1dfdf.appspot.com",
  messagingSenderId: "569035632813",
  appId: "1:569035632813:web:3ebc76ef51bc99a590d624",
  measurementId: "G-RG5WB36FT4"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();