import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = getApps().length
  ? getApp()
  : initializeApp({
      apiKey: "AIzaSyCZ5tfFl9AFkaQzyMi-bp5Up3j0sislsNg",
      authDomain: "blip-9b604.firebaseapp.com",
      projectId: "blip-9b604",
      storageBucket: "blip-9b604.appspot.com",
      messagingSenderId: "238179933262",
      appId: "1:238179933262:web:cfd539e917e87d3066f71f",
    });

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
