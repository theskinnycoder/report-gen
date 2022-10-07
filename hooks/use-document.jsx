import { doc, onSnapshot, setDoc } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { db } from "~/lib/firebase"

export default function useDocument(collectionName, id) {
  const [document, setDocument] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const docRef = doc(db, collectionName, id)
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setDocument({ ...docSnap.data(), id: docSnap.id })
      } else {
        setDocument(null)
      }
    })

    return () => unsub()
  }, [collectionName, id])

  const updateDocument = useCallback(
    async (data) => {
      setLoading(true)
      await setDoc(doc(db, collectionName, id), data)
      setDocument((prev) => ({
        ...prev,
        ...data,
      }))
      setLoading(false)
    },
    [collectionName, id],
  )

  return {
    document,
    updateDocument,
    loading,
  }
}
