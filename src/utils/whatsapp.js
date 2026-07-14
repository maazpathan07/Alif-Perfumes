import { getSettings } from "../services/settingsService";

/* ======================================
   Open WhatsApp Chat
====================================== */

export async function openWhatsApp(message) {
  try {

    const settings =
      await getSettings();

    const number =
      settings?.whatsapp || "";

    if (!number) {
      toast.error(
        "WhatsApp number is not set."
      );
      return;
    }

    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );

  } catch (error) {

    console.error(error);

    toast.error(
      "Failed to open WhatsApp."
    );

  }
}

/* ======================================
   Product Order
====================================== */

export async function handleWhatsAppOrder(
  product
) {
  const message = `🛍️ Assalamu Alaikum,

I want to order this product.

━━━━━━━━━━━━━━━━━━━━

📦 Product:
${product.name}

💰 Price:
₹${product.price}

⭐ Rating:
${product.rating}

━━━━━━━━━━━━━━━━━━━━

Please share more details.

JazakAllahu Khair 🤍`;

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