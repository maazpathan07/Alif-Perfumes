import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage, auth } from "./firebase";

/* ==========================
   Compress Image Client-side
========================== */
async function compressImage(file, maxWidth = 1000, maxHeight = 1000, quality = 0.8) {
  if (!file || !file.type.startsWith("image/")) return file;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ==========================
   Upload Image with Instant Fallback
========================== */
export async function uploadImage(
  file,
  folder = "products",
  onProgress
) {
  if (!file) return "";

  // 1. Compress image client-side first (from 3MB -> 120KB)
  const compressedFile = await compressImage(file);

  // 2. Try Firebase Storage upload with a 4-second timeout fallback
  return new Promise(async (resolve) => {
    let resolved = false;

    // Timeout fallback: if CORS or localhost blocks storage XHR, resolve DataURL in 3.5s
    const fallbackTimer = setTimeout(async () => {
      if (!resolved) {
        resolved = true;
        console.warn("Storage upload timed out / CORS blocked. Using instant compressed DataURL fallback.");
        if (onProgress) onProgress(100);
        const dataUrl = await fileToDataUrl(compressedFile);
        resolve(dataUrl);
      }
    }, 3500);

    try {
      if (auth.currentUser) {
        await auth.currentUser.getIdToken(true);
      }

      const fileName = `${Date.now()}-${compressedFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if (onProgress) {
            onProgress(progress);
          }
        },
        async (error) => {
          console.warn("Firebase Storage Error:", error);
          if (!resolved) {
            resolved = true;
            clearTimeout(fallbackTimer);
            if (onProgress) onProgress(100);
            const dataUrl = await fileToDataUrl(compressedFile);
            resolve(dataUrl);
          }
        },
        async () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(fallbackTimer);
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        }
      );
    } catch (e) {
      if (!resolved) {
        resolved = true;
        clearTimeout(fallbackTimer);
        if (onProgress) onProgress(100);
        const dataUrl = await fileToDataUrl(compressedFile);
        resolve(dataUrl);
      }
    }
  });
}

/* ==========================
   Delete Image
========================== */
export async function deleteImage(imageUrl) {
  if (!imageUrl || imageUrl.startsWith("data:")) return;

  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Delete Image Error:", error);
  }
}