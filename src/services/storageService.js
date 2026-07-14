import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "./firebase";

/* ==========================
   Upload Image
========================== */

export function uploadImage(
  file,
  folder = "products",
  onProgress
) {
  return new Promise(
    (resolve, reject) => {

      if (!file) {
        resolve("");
        return;
      }

      const fileName =
        `${Date.now()}-${file.name}`;

      const storageRef = ref(
        storage,
        `${folder}/${fileName}`
      );

      const uploadTask =
        uploadBytesResumable(
          storageRef,
          file
        );

      uploadTask.on(
        "state_changed",

        (snapshot) => {

          const progress =
            Math.round(
              (snapshot.bytesTransferred /
                snapshot.totalBytes) *
                100
            );

          if (onProgress) {
            onProgress(progress);
          }

        },

        (error) => {

          reject(error);

        },

        async () => {

          const url =
            await getDownloadURL(
              uploadTask.snapshot.ref
            );

          resolve(url);

        }
      );

    }
  );
}

/* ==========================
   Delete Image
========================== */

export async function deleteImage(
  imageUrl
) {
  if (!imageUrl) return;

  try {

    const imageRef = ref(
      storage,
      imageUrl
    );

    await deleteObject(imageRef);

  } catch (error) {

    console.error(
      "Delete Image Error:",
      error
    );

  }
}