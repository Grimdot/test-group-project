import { refs } from './refs';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';
import Notiflix from 'notiflix';

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

const auth = getAuth();

export function getCurrentUser(auth) {
  return new Promise((resolve, reject) => {
     const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
     }, reject);
  });
}

export const authentificate = async() => {
  try {
    await signInWithPopup(auth, provider);
    Notiflix.Notify.success('You succesfully logged in')
  } catch (error) {
    console.log(error)
    Notiflix.Notify.failure('Something went wrong')
  }
};

const updateUserData = async(id, type, userId)  => {
  
const db = getDatabase();

  try {
    await update(ref(db, 'users/' + userId), {
    [type]: [id],
  });
  Notiflix.Notify.info (`Film has been added to your ${type} list`)
  } catch (error) {
    console.log(error)
    Notiflix.Notify.failure('Something went wrong')
  }

}

const toggleUserData = async(id, arr, type, userId) => {
let idsArr = []
idsArr = arr[type]

if(idsArr.includes(id)){
  const filteredIds = idsArr.filter(filmId => filmId != id)
  const db = getDatabase();

  try {
    await update(ref(db, 'users/' + userId), {
      [type]: filteredIds,
    });
    Notiflix.Notify.failure(`Film has been removed from your ${type} list`)
  
  } catch (error) {
    console.log(error)
    Notiflix.Notify.failure('Something went wrong')
  }
 }else{

  idsArr.push(id)

  const db = getDatabase();
  await update(ref(db, 'users/' + userId), {
    [type]: idsArr,
  });
  Notiflix.Notify.info (`Film has been added to your ${type} list`)

}
}

const createUserData = async(id, type, userId) => {
    const db = getDatabase();
    
try {
  await set(ref(db, 'users/' + userId), {
    [type]: [id],
  });
  Notiflix.Notify.info (`Film has been added to your ${type} list`)
} catch (error) {
  console.log(error)
  Notiflix.Notify.failure('Something went wrong')
}

}

export const manageUserData = (id, type) => {
  getCurrentUser(auth).then(r => {
    const uid = r.uid

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {      
  if (snapshot.exists() && !snapshot.val()[type]) {
    updateUserData(id, type, uid)
  }
  if(snapshot.exists() && snapshot.val()[type]){
    toggleUserData(id, snapshot.val(), type, uid)
  }
  if(!snapshot.exists()) {
    createUserData(id, type, uid)
  }
}).catch((error) => {
  console.error(error);
});
})
}


export const logOut = async () => {
 await signOut(auth);
 Notiflix.Notify.info("You've been signed out")
};


const getUserData = () => {
  const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}


refs.googleIn.addEventListener('click', authentificate);
refs.googleOut.addEventListener('click', logOut);
