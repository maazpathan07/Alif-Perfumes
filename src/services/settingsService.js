import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "./firebase";

const settingsRef = doc(
  db,
  "settings",
  "business"
);

/* ==========================
   Default Settings
========================== */

const defaultSettings = {
  /* General */

  businessName: "",
  tagline: "",
  footerDescription: "",

  /* Contact */

  whatsapp: "",
  phone: "",
  email: "",
  address: "",
  businessHours: "",
  googleMaps: "",

  /* Branding */

  logo: "",
  favicon: "",
  heroBanner: "",

  /* Website */

  website: "",

  /* Social */

  instagram: "",
  facebook: "",
  youtube: "",
  twitter: "",
  linkedin: "",
};

/* ==========================
   Get Settings
========================== */

export async function getSettings() {
  const snapshot = await getDoc(
    settingsRef
  );

  if (!snapshot.exists()) {
    return defaultSettings;
  }

  return {
    ...defaultSettings,
    ...snapshot.data(),
  };
}

/* ==========================
   Save Settings
========================== */

export async function saveSettings(
  data
) {
  await setDoc(
    settingsRef,
    data,
    {
      merge: true,
    }
  );
}

/* ==========================
   Default Export
========================== */

export { defaultSettings };