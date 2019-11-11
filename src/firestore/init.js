 import firebase from 'firebase/app'
 import 'firebase/firestore';
 import 'firebase/auth';
 
 firebase.initializeApp( {
    apiKey: "AIzaSyAtCqJpaRSZ9q_YTEeCgt5dcYdv0hrT7KI",
    authDomain: "new-chat-9f5fe.firebaseapp.com",
    databaseURL: "https://new-chat-9f5fe.firebaseio.com",
    projectId: "new-chat-9f5fe",
    storageBucket: "new-chat-9f5fe.appspot.com",
    messagingSenderId: "658287615158",
    appId: "1:658287615158:web:7e0dfd12c1f0394a"
 });

 export const db = firebase.firestore()

 export default firebase