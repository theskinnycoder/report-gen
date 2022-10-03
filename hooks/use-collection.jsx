import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../lib/firebase";

export default function useCollection(collectionName) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      let results = [];
      querySnapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      setDocuments(results);
    })();
  }, [collectionName]);

  const addNewDoc = useCallback(
    async (data) => {
      const newDocRef = doc(collection(db, collectionName));
      await setDoc(newDocRef, data);
      return newDocRef.id;
    },
    [collectionName]
  );

  return {
    documents,
    addNewDoc,
  };
}
