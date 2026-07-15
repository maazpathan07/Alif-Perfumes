import { getSettings } from "../services/settingsService";
import { createOrder } from "../services/orderService";
import toast from "react-hot-toast";

/* ======================================
   Open WhatsApp Chat
====================================== */
export async function openWhatsApp(message) {
  try {
    const settings = await getSettings();
    const number = settings?.whatsapp || "917874378413";

    if (!number) {
      toast.error("WhatsApp number is not set.");
      return;
    }

    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  } catch (error) {
    console.error(error);
    toast.error("Failed to open WhatsApp.");
  }
}

/* ======================================
   Product Order
====================================== */
export async function handleWhatsAppOrder(product) {
  // Log enquiry to Firestore in background
  try {
    createOrder({
      productId: product.id || "",
      productName: product.name || "Unknown Product",
      price: product.discountPrice || product.price || 0,
      image: product.image || ""
    });
  } catch (error) {
    console.error("Failed to log order enquiry in database:", error);
  }

  let template = `🛍️ Assalamu Alaikum,

I want to order this product.

━━━━━━━━━━━━━━━━━━━━

📦 Product: {productName}
💰 Price: {productPrice}
⭐ Rating: {productRating}

━━━━━━━━━━━━━━━━━━━━

Please share more details.

JazakAllahu Khair 🤍`;

  try {
    const settings = await getSettings();
    if (settings?.whatsappMessageTemplate) {
      template = settings.whatsappMessageTemplate;
    }
  } catch (error) {
    console.error("Failed to fetch settings for custom WhatsApp template:", error);
  }

  const message = template
    .replace("{productName}", product.name || "")
    .replace("{productPrice}", `₹${product.discountPrice || product.price}`)
    .replace("{productRating}", `${product.rating || 0} ⭐`);

  await openWhatsApp(message);
}

/* ======================================
   Contact Message
====================================== */
export async function sendContactMessage({
  businessName,
  name,
  phone,
  message,
}) {
  const text = `🛍️ Assalamu Alaikum,

I would like to contact ${businessName}.

━━━━━━━━━━━━━━━━━━━━

👤 Name:
${name}

📱 Phone:
${phone}

📝 Message:

${message}

━━━━━━━━━━━━━━━━━━━━

JazakAllahu Khair 🤍`;

  await openWhatsApp(text);
}