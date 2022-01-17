
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// const firebaseConfig = {
//   apiKey: "AIzaSyC7rgPQmAgGVzbbL_4QCn60z8SqreED8vo",
//   authDomain: "whatsapp-81127.firebaseapp.com",
//   projectId: "whatsapp-81127",
//   storageBucket: "whatsapp-81127.appspot.com",
//   messagingSenderId: "581294583212",
//   appId: "1:581294583212:web:01b81e2a0b892a00a31e09",
//   measurementId: "G-5P37V1MD7L"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBeMkhY4xs8gCQv9vdpKZ42PQtJz1PH49I",
    authDomain: "whatsapp-clone-a4db8.firebaseapp.com",
    projectId: "whatsapp-clone-a4db8",
    storageBucket: "whatsapp-clone-a4db8.appspot.com",
    messagingSenderId: "412958098778",
    appId: "1:412958098778:web:4da9c80dd14f0e39ef1f63",
    measurementId: "G-B90JRK9L6G"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;

