import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useCallback } from "react"
import { storage } from "../lib/firebase"

export default function useStorage() {
  const uploadImage = useCallback(
    async (feedbackID, stage, type, itemID, file) => {
      const uploadPath = `screenshots/${feedbackID}/${stage}/${type}/${itemID}`
      const uploadRef = ref(storage, uploadPath)
      const { ref: uploadedRef } = await uploadBytes(uploadRef, file)
      const imgUrl = await getDownloadURL(uploadedRef)
      return imgUrl
    },
    [],
  )

  return {
    uploadImage,
  }
}
