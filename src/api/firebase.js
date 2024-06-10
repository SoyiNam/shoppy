import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, set, remove, child } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
const storage = getStorage();
const dbRef = ref(getDatabase());

export async function GoogleLogin() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch(console.error);
}

export async function GoogleLogout() {
  return signOut(auth) //
    .catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

// 네트워크 통신을 하니까
async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function UploadNewProduct(
  productName,
  productPrice,
  productNum,
  productCate,
  url
) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    title: productName,
    price: productPrice,
    quantity: productNum,
    category: productCate,
    image: url,
    id,
  });
}

export function getImageURL(imageFile) {
  const id = uuid();
  const imageRef = sref(storage, `images/${id}`);

  return uploadBytes(imageRef, imageFile) //
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    });
}

export function fetchProducts() {
  return get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// ref에서 child로 변경하니 에러 해결
export async function getCart(uid) {
  return get(child(dbRef, `carts/${uid}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

// export async function getCart(uid) {
//   return get(
//     ref(database, `carts/${uid}`) //
//       .then((snapshot) => {
//         const items = snapshot.val() || {};
//         console.log("items : ", items);
//         return Object.values(items);
//       })
//   );
// }

export async function addOrUpdateToCart(id, product) {
  return set(ref(database, `carts/${id}/${product.id}`), product);
}

export async function removeFromCart(id, productId) {
  return remove(ref(database, `carts/${id}/${productId}`));
}
