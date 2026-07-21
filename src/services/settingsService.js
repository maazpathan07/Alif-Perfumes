import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const settingsRef = doc(db, "settings", "business");

/* ======================================
   Default Settings & Fallback Content
====================================== */
const defaultSettings = {
  /* General */
  businessName: "ALIF PERFUMES",
  tagline: "Premium Arabic Fragrances",
  footerDescription: "Premium Arabic perfumes and Islamic lifestyle products crafted with quality, elegance and trust. Experience luxury fragrances delivered with simplicity.",

  /* Contact */
  whatsapp: "917874378413",
  phone: "917874378413",
  email: "info@alifperfumes.com",
  address: "Surat, Gujarat",
  businessHours: "Mon - Sat | 10 AM - 9 PM",
  googleMaps: "",

  /* Branding & Media */
  logo: "",
  favicon: "",
  heroBanner: "",

  /* Social Links */
  instagram: "",
  facebook: "",
  youtube: "",
  twitter: "",
  linkedin: "",

  /* Website Links */
  website: "",

  /* SEO Settings */
  seoTitle: "Alif Perfumes | Premium Arabic Fragrances",
  seoDescription: "Discover authentic Arabic fragrances, attars, and luxury scents crafted with premium ingredients.",
  seoKeywords: "perfumes, attar, arabic fragrances, buy perfume, luxury fragrances",

  /* WhatsApp Template */
  whatsappMessageTemplate: `🛍️ Assalamu Alaikum,

I want to order this product.

━━━━━━━━━━━━━━━━━━━━

📦 Product: {productName}
💰 Price: {productPrice}
⭐ Rating: {productRating}

━━━━━━━━━━━━━━━━━━━━

Please share more details.

JazakAllahu Khair 🤍`,

  /* Dynamic Hero Content */
  heroTitle: "Luxury Arabic\nPerfumes",
  heroDescription: "Discover authentic Arabic fragrances crafted with premium ingredients. Experience elegance, confidence and long-lasting luxury in every spray.",
  heroImage: "",
  heroStat1Number: "500+",
  heroStat1Label: "Premium Products",
  heroStat2Number: "5000+",
  heroStat2Label: "Happy Customers",
  heroStat3Number: "100%",
  heroStat3Label: "Original Fragrances",

  /* Dynamic Why Choose Us Content */
  wcuTitle: "Why Choose Alif Perfumes?",
  wcuSubtitle: "We offer premium quality fragrances with trusted service.",
  wcuCard1Title: "Premium Quality",
  wcuCard1Desc: "Crafted using raw materials sourced from the best regions in the Arab world.",
  wcuCard2Title: "Long Lasting",
  wcuCard2Desc: "Our fragrances are formulated to stay vibrant and rich all day long.",
  wcuCard3Title: "Authentic Arabic",
  wcuCard3Desc: "Experience traditional scents blended with modern aromatic chemistry.",

  /* Dynamic Section Titles & Subtitles */
  categoriesTitle: "Shop by Category",
  categoriesSubtitle: "Explore our premium fragrance collections.",
  featuredTitle: "Featured Products",
  featuredSubtitle: "Discover our best selling luxury fragrances.",
  testimonialsTitle: "What Our Customers Say",
  testimonialsSubtitle: "Real reviews from our valued customers.",
  ctaTag: "Premium Customer Support",
  ctaTitle: "Need Help Choosing Your Perfect Fragrance?",
  ctaDesc: "Our fragrance experts are ready to help you choose the perfect Arabic perfume. Chat with us directly on WhatsApp for quick assistance.",
  productsHeroTag: "✨ Premium Arabic Collection",
  productsHeroTitle: "Explore Our Fragrances",
  productsHeroDesc: "Discover premium Arabic perfumes, attars, and luxury scents crafted with quality, elegance and trust.",

  /* Dynamic About Page Content */
  aboutStoryTitle: "Our Story",
  aboutStoryText: "Alif Perfumes was founded with a passion to bring pure, premium Arabic fragrances to perfume lovers. We believe that a fragrance is not just a scent, but an identity. Our journey started in Surat, India, with a vision to craft luxury scents that leave a lasting impression while remaining accessible.",
  aboutVision: "To be a globally trusted name in Arabic luxury fragrances, recognized for purity and authenticity.",
  aboutMission: "Delivering pure authentic fragrances while maintaining maximum quality, trust, and customer satisfaction."
};

/* ======================================
   Get Settings
====================================== */
export async function getSettings() {
  try {
    const snapshot = await getDoc(settingsRef);
    if (!snapshot.exists()) {
      return defaultSettings;
    }
    return {
      ...defaultSettings,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("Error reading settings service:", error);
    return defaultSettings;
  }
}

/* ======================================
   Save Settings
====================================== */
export async function saveSettings(data) {
  await setDoc(settingsRef, data, { merge: true });
}

export { defaultSettings };