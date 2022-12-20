import { refs } from './refs';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBakZQ7NSRmE_SAmTsvnOPb_I7LECSfEIo',
  authDomain: 'filmoteka-7f68b.firebaseapp.com',
  databaseURL:
    'https://filmoteka-7f68b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-7f68b',
  storageBucket: 'filmoteka-7f68b.appspot.com',
  messagingSenderId: '577857537349',
  appId: '1:577857537349:web:7474e021424440c5f0aa2c',
  measurementId: 'G-8D9CEGKJYV',
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

let uid = null
const auth = getAuth();

onAuthStateChanged(auth, user => {
  if (user) {
    uid = user.uid
    console.log('Im here', user);
  } else {
    console.log('im not here');

  }
});


export const authentificate = () => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const writeUserData = (id, array)  =>{
  

const tempArr = array.filmId

if(tempArr.includes(id)){
  console.log('its already here')
  return
}
tempArr.push(id)

const db = getDatabase();

  set(ref(db, 'users/' + uid), {
    Queue: tempArr,
  });
}

export const addUserData = (id) => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
    writeUserData(id, snapshot.val())
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}


export const logOut = () => {
  const auth = getAuth();
  signOut(auth);
};



refs.googleIn.addEventListener('click', authentificate);
refs.googleOut.addEventListener('click', logOut);
